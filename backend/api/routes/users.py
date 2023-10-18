from typing import Annotated

from fastapi import APIRouter, Depends

from api.utils import get_current_active_user
from auth.models import User, CreateUser
from db.queries import add_to_favorites, remove_from_favorites, create_user as db_create_user

user_api_router = APIRouter(prefix="/api/users", tags=["users"])


@user_api_router.post("/users/create")
async def create_user(user: CreateUser):
    return await db_create_user(user.username, user.password)


@user_api_router.get("/users/current")
async def read_current_user(current_user: Annotated[User, Depends(get_current_active_user)]):
    return current_user


@user_api_router.get("/users/current/favorites")
async def read_current_user_favorites(current_user: Annotated[User, Depends(get_current_active_user)]) -> list[str]:
    favorites = []

    for key, value in current_user.favorites.items():
        if value:
            favorites.append(key)

    return favorites


@user_api_router.put("/users/current/favorites/{movie_id}")
async def add_movie_to_favorites(current_user: Annotated[User, Depends(get_current_active_user)], movie_id: str):
    # NOTE: it is possible to add none existing movies to favorites
    await add_to_favorites(current_user.username, movie_id)

    return {"success": True}


@user_api_router.delete("/users/current/favorites/{movie_id}")
async def remove_movie_from_favorites(current_user: Annotated[User, Depends(get_current_active_user)], movie_id: str):
    # NOTE: it is possible to 'remove' none existing movies from favorites
    await remove_from_favorites(current_user.username, movie_id)

    return {"success": True}