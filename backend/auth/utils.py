from datetime import datetime, timedelta
from typing import Union

from jose import jwt

from auth.config import password_context, SECRET_KEY, ALGORITHM
from db.documents import UserDocument
from db.queries import get_user


def verify_password(password: str, hashed_password: str) -> bool:
    """Verify if provided password matches hashed password"""
    return password_context.verify(password, hashed_password)


def get_password_hash(password: str) -> str:
    """Get hash of password"""
    return password_context.hash(password)


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    payload = data.copy()

    if expires_delta:
        expiry = datetime.utcnow() + expires_delta
    else:
        expiry = datetime.utcnow() + timedelta(minutes=10)

    payload.update({"exp": expiry})
    encoded_jwt = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt


async def authenticate_user(username: str, password: str) -> Union[False, UserDocument]:
    if (user := await get_user(username)) is None:
        return False

    if not verify_password(password, user.hashed_password):
        return False

    return user


def decode_jwt(token: str) -> dict:
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
