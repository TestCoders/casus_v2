from typing import Annotated

from fastapi import Depends, status, HTTPException, Request
from jose import JWTError

from app.auth.config import oauth2_scheme
from app.auth.models import TokenData, User
from app.auth.utils import decode_jwt
from app.db.queries import get_user


async def get_current_user(
        request: Request,
        token: Annotated[str, Depends(oauth2_scheme)] | None = None,
):
    auth_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        if (_token := request.cookies.get("__imtdb_jwt", token)) is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="no validation credentials provided",
                headers={"WWW-Authenticate": "Bearer"},
            )
        payload = decode_jwt(_token)
        if (username := payload.get("sub")) is None:
            raise auth_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise auth_exception

    if (user := await get_user(username=token_data.username)) is None:
        raise auth_exception
    return user


async def get_current_active_user(
        current_user: Annotated[User, Depends(get_current_user)]
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="inactive user")

    return current_user
