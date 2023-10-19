from fastapi import APIRouter

from app.db import queries

movie_api_router = APIRouter(prefix="/api/movies", tags=["movies"])


@movie_api_router.get(
    "/",
    response_description="Get information about all movies"
)
async def get_movies(search: str | None = None):
    if search is not None:
        movies = await queries.search_movies(search)
    else:
        movies = await queries.get_movies()

    if not movies:
        return []

    return movies


@movie_api_router.get(
    "/{movie_id}"
)
async def get_movie(movie_id: str):
    return await queries.get_movie_by_id(movie_id)
    