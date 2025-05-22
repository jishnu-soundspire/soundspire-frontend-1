
# Welcome to the Spotify integration branch 

Each folder in this monorepo houses a service or application currently under active development. 

---

## 📁 Project Structure

* [`soundspire-frontend`](soundspire-frontend/)
  **Next.js frontend**
  Handles the main UI, Google OAuth, and user interactions.

* [`spotifyAPI-Nextjs`](spotifyAPI-Nextjs/)
  **Next.js microservice**
  Integrates with Spotify API using NextAuth + Spotify OAuth.
  Currently **fetch-only**, does not store data.

* [`spotifyAPI-Python`](spotifyAPI-Python/)
  **Python FastAPI microservice** *(experimental)*
  Integrates with Spotify API and **saves data to the database**.
  This data can be accessed by the frontend.

---

## ⚙️ Setup & Environment

Make sure to check the `.env.sample` file and configure your environment variables accordingly.

Run the applications locally using the following addresses:

* **Frontend (Next.js):** `http://127.0.0.1:3000`
* **Python API (FastAPI):** `http://127.0.0.1:5000`

---

## 🔐 Spotify App Configuration

Add the following **callback URLs** to your Spotify Developer Dashboard:

```plaintext
http://127.0.0.1:3000/api/auth/callback/spotify
http://127.0.0.1:5000/callback
http://192.168.174.244:3000/api/auth/callback/spotify
```

---

## 👤 User Management

Make sure to **add authorized users** in your Spotify developer app under **User Management**.
Only added users will be able to log in during development.

