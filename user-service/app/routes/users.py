# user-service/app/routes/users.py
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from ..dependencies import get_db
from ..services.user_service import get_or_create_user
from ..schemas.user import UserResponse

router = APIRouter()

async def get_current_user_email(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(401, "Invalid token")
    token = authorization.split(" ")[1]
    # Forward to auth-service
    import requests
    resp = requests.get("http://auth-service:8000/validate", headers={"Authorization": f"Bearer {token}"})
    if resp.status_code != 200:
        raise HTTPException(401, "Invalid token")
    return resp.json()["email"]

@router.get("/me", response_model=UserResponse)
async def me(email: str = Depends(get_current_user_email), db: Session = Depends(get_db)):
    user = get_or_create_user(db, email)
    return {
        "id": user.id,
        "email": user.email,
        "name": f"{user.FName} {user.LName}".strip() or "User",
        "role": user.role,
        "status": user.status
    }
