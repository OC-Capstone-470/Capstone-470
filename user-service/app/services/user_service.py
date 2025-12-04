# user-service/app/services/user_service.py
from sqlalchemy.orm import Session
from ..models import Profile

def get_or_create_user(db: Session, email: str):
    user = db.query(Profile).filter(Profile.email == email).first()
    if not user:
        user = Profile(
            email=email,
            FName="",
            LName="",
            role="volunteer",
            status="active",
            phone="0000000000"
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    return user
