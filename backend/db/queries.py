from beanie.odm.operators.find.evaluation import RegEx

from db.documents import MovieDocument, UserDocument


async def get_movie_by_id(movie_id: str) -> MovieDocument | None:
    """
    Retrieve a single movie from the database by id. Returns None
    if no movie was found
    """
    return await MovieDocument.find_one(MovieDocument.imdb == movie_id)


async def get_movies(limit: int = 100) -> list[MovieDocument]:
    """
    Retrieve all movies from the database, limited by the limit parameter
    """
    return await MovieDocument.find().limit(limit).to_list()


async def search_movies(query: str) -> list[MovieDocument]:
    """
    Retrieve all movies that match the search query
    """
    pattern = f"{query}*"

    results = MovieDocument.find(RegEx(MovieDocument.title, pattern, options="i"))
    return await results.to_list()


async def create_movie(movie: MovieDocument) -> MovieDocument:
    """
    Insert a record into the database, returns the inserted movie
    """
    return await MovieDocument.insert()


async def get_user(username: str) -> UserDocument:
    """Get a user by username"""
    return await UserDocument.find_one(UserDocument.username == username)


async def create_user(username: str, password: str) -> UserDocument:
    from auth.utils import get_password_hash

    document = UserDocument(
        username=username,
        admin=False,
        favorites={},
        hashed_password=get_password_hash(password)
    )

    return await document.insert()


async def add_to_favorites(username: str, movie_id: str):
    user = await get_user(username)
    user.favorites[movie_id] = True
    return await user.save()


async def remove_from_favorites(username: str, movie_id: str):
    user = await get_user(username)

    try:
        del user.favorites[movie_id]
    except KeyError:
        pass

    return await user.save()
