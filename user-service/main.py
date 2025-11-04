# user-service/main.py
from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI(title="User Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock DB
USERS_DB = {
    "tofuspark@gmail.com": {
        "id": 1,
        "email": "tofuspark@gmail.com",
        "name": "Alex Anthony",
        "role": "volunteer",
        "status": "active"
    }
}

async def get_current_user(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(401, "Invalid token")
    token = authorization.split(" ")[1]
    
    # Call auth-service
    resp = requests.get("http://localhost:8001/validate", headers={"Authorization": f"Bearer {token}"})
    if resp.status_code != 200:
        raise HTTPException(401, "Invalid token")
    email = resp.json()["email"]

    user = USERS_DB.get(email)
    if not user:
        # Auto-create
        user = {
            "id": len(USERS_DB) + 1,
            "email": email,
            "name": email.split("@")[0],
            "role": "volunteer",
            "status": "active"
        }
        USERS_DB[email] = user
    return user

@app.get("/users/me")
async def me(user: dict = Depends(get_current_user)):
    return user