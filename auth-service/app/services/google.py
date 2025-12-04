# auth-service/app/services/google.py
import requests
from fastapi import HTTPException
import os

def exchange_code_for_tokens(code: str):
    payload = {
        "code": code,
        "client_id": os.getenv("GOOGLE_CLIENT_ID"),
        "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
        "redirect_uri": "http://localhost:3000",
        "grant_type": "authorization_code"
    }
    resp = requests.post("https://oauth2.googleapis.com/token", data=payload)
    token_data = resp.json()
    if "error" in token_data:
        raise HTTPException(400, f"Google error: {token_data.get('error_description', 'Unknown')}")
    if "id_token" not in token_data or "access_token" not in token_data:
        raise HTTPException(400, "No tokens returned from Google")
    return token_data
