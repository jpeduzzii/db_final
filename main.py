from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from sqlmodel import Session, create_engine, select

from models import StarWarsCharacter

app = FastAPI()

engine = create_engine(
    "sqlite:///star_wars_simple.db",
    echo=False,
    connect_args={"check_same_thread": False},
)

app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
def index():
    return FileResponse("static/index.html")


@app.get("/characters")
def get_characters():
    with Session(engine) as session:
        statement = select(StarWarsCharacter)
        items = session.exec(statement).all()
        return items
