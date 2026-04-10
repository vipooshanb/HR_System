from pydantic import BaseModel, Field
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


# ==================== SQLAlchemy ORM Models ====================

class Position(Base):
    __tablename__ = "positions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    requirements = Column(String, default="")  # JSON string
    niceToHave = Column(String, default="")  # JSON string
    deadline = Column(String, default="")
    aboutWork = Column(String, default="")
    locationType = Column(String, default="")
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship
    candidates = relationship("Candidate", back_populates="position", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "requirements": self.requirements.split(",") if self.requirements else [],
            "niceToHave": self.niceToHave.split(",") if self.niceToHave else [],
            "deadline": self.deadline,
            "aboutWork": self.aboutWork,
            "locationType": self.locationType,
        }


class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String, default="")
    role = Column(String, default="")
    appliedPosition = Column(String, default="")
    position_id = Column(Integer, ForeignKey("positions.id"), index=True, nullable=True)
    stage = Column(String, default="Applying Period")
    applicationDate = Column(String, default="")
    overallScore = Column(Float, default=0.0)
    referred = Column(Boolean, default=False)
    assessmentAdded = Column(Boolean, default=False)
    location = Column(String, default="")
    notes = Column(String, default="")
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship
    position = relationship("Position", back_populates="candidates")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "role": self.role,
            "appliedPosition": self.appliedPosition,
            "positionId": self.position_id,
            "stage": self.stage,
            "applicationDate": self.applicationDate,
            "overallScore": self.overallScore,
            "referred": self.referred,
            "assessmentAdded": self.assessmentAdded,
            "location": self.location,
            "notes": self.notes,
        }


# ==================== Pydantic Schemas (for API validation) ====================

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
