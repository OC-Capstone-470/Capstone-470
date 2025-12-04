# user-service/app/dependencies.py
from sqlalchemy.orm import Session
from .database import SessionLocal  # we'll create this

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
