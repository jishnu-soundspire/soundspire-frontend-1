import os
from flask import Flask, request, redirect, session, url_for
from spotipy.oauth2 import SpotifyOAuth
from dotenv import load_dotenv
import spotipy
from flask_cors import CORS
from flask import Flask, request, redirect, session, url_for, render_template  # added render_template


load_dotenv()  # Load secrets from .env

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:3000", "https://localhost:3000"])
app.secret_key = os.urandom(24)
app.config['SESSION_COOKIE_NAME'] = 'spotify-login-session'

# Expanded scopes to get playlists and top artists
sp_oauth = SpotifyOAuth(
    client_id=os.getenv("SPOTIPY_CLIENT_ID"),
    client_secret=os.getenv("SPOTIPY_CLIENT_SECRET"),
    redirect_uri=os.getenv("SPOTIPY_REDIRECT_URI"),
    scope="user-read-private user-read-email playlist-read-private user-top-read"
)

@app.route('/')
def login():
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

@app.route('/callback')
def callback():
    session.clear()
    code = request.args.get('code')
    if not code:
        return "Error: No code provided in callback, senpai. Try again~", 400
    
    token_info = sp_oauth.get_access_token(code, check_cache=False)
    session['token_info'] = token_info
    return redirect(url_for('profile'))


@app.route('/profile')
def profile():
    token_info = session.get('token_info', None)
    if not token_info:
        return redirect('/')

    if sp_oauth.is_token_expired(token_info):
        token_info = sp_oauth.refresh_access_token(token_info['refresh_token'])
        session['token_info'] = token_info

    sp = spotipy.Spotify(auth=token_info['access_token'])

    user_data = sp.current_user()

    playlists_data = sp.current_user_playlists(limit=20)
    playlists = [{
        "name": item['name'],
        "id": item['id'],
        "tracks_total": item['tracks']['total'],
        "url": item['external_urls']['spotify']
    } for item in playlists_data['items']]

    top_artists_data = sp.current_user_top_artists(limit=10, time_range='medium_term')
    top_artists = [{
        "name": artist['name'],
        "genres": artist['genres'],
        "followers": artist['followers']['total'],
        "url": artist['external_urls']['spotify']
    } for artist in top_artists_data['items']]

    return render_template("index.html", user=user_data, playlists=playlists, top_artists=top_artists)


 
if __name__ == '__main__':
    app.run(debug=True, port=5000)
