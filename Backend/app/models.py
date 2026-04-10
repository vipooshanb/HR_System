from pydantic import BaseModel, Field


class PositionBase(BaseModel):
    name: str
    requirements: list[str] = Field(default_factory=list)
    niceToHave: list[str] = Field(default_factory=list)
    deadline: str
    aboutWork: str
    locationType: str


class PositionCreate(PositionBase):
    pass


class PositionUpdate(BaseModel):
    name: str | None = None
    requirements: list[str] | None = None
    niceToHave: list[str] | None = None
    deadline: str | None = None
    aboutWork: str | None = None
    locationType: str | None = None


class PositionRead(PositionBase):
    id: str


class CandidateBase(BaseModel):
    name: str
    role: str
    appliedPosition: str | None = None
    stage: str
    applicationDate: str
    overallScore: float = 0
    referred: bool = False
    assessmentAdded: bool = False
    email: str
    phone: str
    location: str
    notes: str


class CandidateCreate(CandidateBase):
    id: str | None = None


class CandidateUpdate(BaseModel):
    name: str | None = None
    role: str | None = None
    appliedPosition: str | None = None
    stage: str | None = None
    applicationDate: str | None = None
    overallScore: float | None = None
    referred: bool | None = None
    assessmentAdded: bool | None = None
    email: str | None = None
    phone: str | None = None
    location: str | None = None
    notes: str | None = None


class CandidateStageUpdate(BaseModel):
    stage: str


class CandidateRead(CandidateBase):
    id: str
