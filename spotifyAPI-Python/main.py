import os
from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from dotenv import load_dotenv
from pymongo import MongoClient
from spotipy.oauth2 import SpotifyOAuth
import spotipy

load_dotenv()

# MongoDB setup
mongo_client = MongoClient(os.getenv("MONGO_URI"))
db = mongo_client[os.getenv("MONGO_DB_NAME")]
users_collection = db.spotify_users

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SessionMiddleware, secret_key=os.urandom(24))

sp_oauth = SpotifyOAuth(
    client_id=os.getenv("SPOTIPY_CLIENT_ID"),
    client_secret=os.getenv("SPOTIPY_CLIENT_SECRET"),
    redirect_uri=os.getenv("SPOTIPY_REDIRECT_URI"),
    scope="user-read-private user-read-email playlist-read-private user-top-read"
)

@app.get("/")
async def login():
    return RedirectResponse(sp_oauth.get_authorize_url())

@app.get("/callback")
async def callback(request: Request):
    request.session.clear()
    code = request.query_params.get("code")
    if not code:
        return JSONResponse(content={"error": "No code provided"}, status_code=400)

    token_info = sp_oauth.get_access_token(code, check_cache=False)
    request.session["token_info"] = token_info
    return RedirectResponse(url="/store")

@app.get("/store")
async def store_data(request: Request):
    token_info = request.session.get("token_info")
    if not token_info:
        return RedirectResponse(url="/")

    if sp_oauth.is_token_expired(token_info):
        token_info = sp_oauth.refresh_access_token(token_info["refresh_token"])
        request.session["token_info"] = token_info

    sp = spotipy.Spotify(auth=token_info["access_token"])
    user_data = sp.current_user()
    playlists = sp.current_user_playlists(limit=20)["items"]
    top_artists = sp.current_user_top_artists(limit=10, time_range='medium_term')["items"]

    document = {
        "email": user_data["email"],
        "user": {
            "display_name": user_data["display_name"],
            "id": user_data["id"],
            "country": user_data["country"],
            "followers": user_data["followers"]["total"],
            "profile_url": user_data["external_urls"]["spotify"]
        },
        "playlists": [{
            "name": p["name"],
            "id": p["id"],
            "tracks_total": p["tracks"]["total"],
            "url": p["external_urls"]["spotify"]
        } for p in playlists],
        "top_artists": [{
            "name": a["name"],
            "genres": a["genres"],
            "followers": a["followers"]["total"],
            "url": a["external_urls"]["spotify"]
        } for a in top_artists]
    }

    users_collection.update_one(
        {"email": user_data["email"]},
        {"$set": document},
        upsert=True
    )

    return RedirectResponse(url=f"/profile?email={user_data['email']}")

@app.get("/profile")
async def profile(email: str):
    user_data = users_collection.find_one({"email": email}, {"_id": 0})
    if not user_data:
        return JSONResponse(content={"error": "User not found"}, status_code=404)
    return user_data