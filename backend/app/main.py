from datetime import datetime

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from app.api.routes.movies import movie_api_router
from app.api.routes.users import user_api_router
from app.api.routes.auth import auth_api_router
from app.db.database import init_db

app = FastAPI()

app.include_router(auth_api_router)
app.include_router(movie_api_router)
app.include_router(user_api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://frontend:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Healthcheck(BaseModel):
    status: str
    time: int


@app.on_event("startup")
async def start_db():
    await init_db()


@app.get("/healthcheck", response_model=Healthcheck, tags=["health"])
def healthcheck():
    now = datetime.utcnow()
    return Healthcheck(status="healthy", time=int(datetime.timestamp(now)))


if __name__ == "__main__":
    uvicorn.run(app=app, port=8000)
