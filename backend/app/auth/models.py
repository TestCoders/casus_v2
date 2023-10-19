from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    access_token_expires: int
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class CreateUser(BaseModel):
    username: str
    password: str


class User(BaseModel):
    username: str
    admin: bool = False
    favorites: dict[str, bool]
    disabled: bool = False


class DBUser(User):
    hashed_password: str
