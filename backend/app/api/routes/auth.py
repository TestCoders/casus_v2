from datetime import timedelta, datetime, timezone
from typing import Annotated
from zoneinfo import ZoneInfo

from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm

from app.auth.config import ACCESS_TOKEN_EXPIRE_MINUTES
from app.auth.models import Token
from app.auth.utils import authenticate_user, create_access_token

auth_api_router = APIRouter(prefix="/api/auth", tags=["auth"])


@auth_api_router.post("/token", response_model=Token)
async def login_for_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], response: Response):
    if not (user := await authenticate_user(form_data.username, form_data.password)):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )

    now = datetime.now(timezone.utc)

    response.set_cookie(
        key="__imtdb_jwt",
        value=access_token,
        httponly=True,
        expires=now + access_token_expires
    )
    return {"access_token": access_token, "access_token_expires": int((now + access_token_expires).timestamp()), "token_type": "bearer"}


@auth_api_router.post("/sign-out")
async def sign_out(response: Response):
    response.set_cookie(
        key="__imtdb_jwt",
        value="",
        httponly=True,
        expires=datetime.now(timezone.utc)
    )
    response.status_code = 204
