from typing import Annotated

from fastapi import APIRouter, Depends

from app.api.utils import get_current_active_user
from app.auth.models import User, CreateUser
from app.db.queries import add_to_favorites, remove_from_favorites, create_user as db_create_user

user_api_router = APIRouter(prefix="/api/users", tags=["users"])


@user_api_router.post("/create")
async def create_user(user: CreateUser):
    return await db_create_user(user.username, user.password)


@user_api_router.get("/current")
async def read_current_user(current_user: Annotated[User, Depends(get_current_active_user)]):
    return current_user


@user_api_router.get("/current/favorites")
async def read_current_user_favorites(current_user: Annotated[User, Depends(get_current_active_user)]) -> list[str]:
    favorites = []

    for key, value in current_user.favorites.items():
        if value:
            favorites.append(key)

    return favorites


@user_api_router.put("/current/favorites/{movie_id}")
async def add_movie_to_favorites(current_user: Annotated[User, Depends(get_current_active_user)], movie_id: str):
    # NOTE: it is possible to add none existing movies to favorites
    await add_to_favorites(current_user.username, movie_id)

    return {"success": True}


@user_api_router.delete("/current/favorites/{movie_id}")
async def remove_movie_from_favorites(current_user: Annotated[User, Depends(get_current_active_user)], movie_id: str):
    # NOTE: it is possible to 'remove' none existing movies from favorites
    await remove_from_favorites(current_user.username, movie_id)

    return {"success": True}