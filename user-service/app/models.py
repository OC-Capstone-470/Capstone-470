# user-service/app/models.py
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

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
