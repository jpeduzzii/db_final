from sqlmodel import Field, SQLModel


class StarWarsCharacter(SQLModel, table=True):
    __tablename__ = "characters"

    id: int | None = Field(default=None, primary_key=True)
    name: str
    alignment: str | None = None
    era: str | None = None
    faction: str | None = None
    affiliation: str | None = None
    blade_color: str | None = None
    species: str | None = None
    homeworld: str | None = None
