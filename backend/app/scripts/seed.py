import asyncio
import json
import os
from typing import List

from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, RootModel

from app.db.documents import MovieDocument, UserDocument


class MovieFixtures(RootModel):
    root: list[MovieDocument]


def get_data(filename: str) -> list[MovieDocument]:
    dirname = os.path.dirname(__file__)
    full_path = os.path.join(dirname, "fixtures", filename)

    with open(full_path) as f:
        data = json.load(f)
        validated = MovieFixtures.model_validate_json(json.dumps(data))

    return validated.root


async def init():
    client = AsyncIOMotorClient(os.getenv("MONGO_DSN"))
    await init_beanie(client.casus, document_models=[MovieDocument, UserDocument])


async def run():
    await init()
    await drop_existing_movies()
    await load_movies()


async def drop_existing_movies() -> None:
    await MovieDocument.delete_all()


async def load_movies():
    movies = get_data("movies.json")
    await MovieDocument.insert_many(movies)


if __name__ == "__main__":
    asyncio.run(run())
