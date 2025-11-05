# user-service/main.py
from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import requests

app = FastAPI(title="User Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://redcross_user:redcross_pass@localhost:5432/redcross")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Profile(Base):
    __tablename__ = "Profile"
    id = Column(Integer, primary_key=True)
    email = Column(String(75), unique=True, index=True)
    FName = Column(String(50))
    LName = Column(String(50))
    role = Column(String(12), nullable=False)
    status = Column(String(25))
    phone = Column(String(12), nullable=False)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_current_user(authorization: str = Header(...), db = Depends(get_db)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(401, "Invalid token")
    token = authorization.split(" ")[1]
    
    resp = requests.get("http://auth-service:8000/validate", headers={"Authorization": f"Bearer {token}"})
    if resp.status_code != 200:
        raise HTTPException(401, "Invalid token")
    email = resp.json()["email"]

    user = db.query(Profile).filter(Profile.email == email).first()
    if not user:
        user = Profile(email=email, FName="", LName="", role="volunteer", status="active", phone="0000000000")
        db.add(user)
        db.commit()
        db.refresh(user)
    return user

@app.get("/users/me")
async def me(user: Profile = Depends(get_current_user)):
    return {
        "id": user.id,
        "email": user.email,
        "name": f"{user.FName} {user.LName}".strip(),
        "role": user.role,
        "status": user.status
    }