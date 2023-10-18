import os


from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from db.documents import MovieDocument


async def init_db():
    """
    Initialises the Mongo database with an Async motor client
    :return:
    """
    dsn = os.getenv("MONGO_URL", "mongodb://localhost:27017")

    client = AsyncIOMotorClient(dsn)
    await init_beanie(database=client.video, document_models=[MovieDocument])
