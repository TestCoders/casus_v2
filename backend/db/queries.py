from beanie.odm.operators.find.evaluation import RegEx

from db.documents import MovieDocument


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

    