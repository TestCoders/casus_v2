import pymongo
from beanie import Document, Indexed


class MovieDocument(Document):
    backdrop_path: str
    genres: list[str]
    imdb: str
    description: str
    image: str
    release_date: str
    year: int
    runtime: int
    status: str
    tagline: str
    title: str
    type: str
    trailer: str

    class Settings:
        name = 'movies'
        indexes = [
            [
                ("title", pymongo.TEXT),
                ("imdb", pymongo.TEXT)
            ]
        ]

    class Config:
        json_schema_extra = {
            "example": {
                "backdrop_path": "https://image.tmdb.org/t/p/w1280/2DKpjWI0j6eRhF3lPUE4lc7wqP0.jpg",
                "genres": [
                    "Science Fiction",
                    "Adventure",
                    "Family"
                ],
                "imdb": "tt0406375",
                "description": "After their father is called into work, two young boys, Walter and Danny, are left in the care of their teenage sister, Lisa, and told they must stay inside. Walter and Danny, who anticipate a boring day, are shocked when they begin playing Zathura, a space-themed board game, which they realize has mystical powers when their house is shot into space. With the help of an astronaut, the boys attempt to return home.",
                "poster_path": "https://image.tmdb.org/t/p/w500/g0HLEZfqJp5dRxMzkgZwW9puP7N.jpg",
                "release_date": "2005-11-06",
                "year": 2005,
                "runtime": 101,
                "status": "Released",
                "tagline": "Adventure Is Waiting",
                "title": "Zathura: A Space Adventure",
                "type": "movie",
                "trailer": "",
            }
        }


class UserDocument(Document):
    username: Indexed(str, unique=True)
    admin: bool
    disabled: bool = False
    favorites: dict[str, bool]
    hashed_password: str

    class Settings:
        name = "users"
