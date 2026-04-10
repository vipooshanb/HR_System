from sqlalchemy.orm import Session
from app.models import Position, Candidate
import json


class PositionRepository:
    @staticmethod
    def get_all(db: Session):
        return db.query(Position).all()

    @staticmethod
    def get_by_id(db: Session, position_id: int):
        return db.query(Position).filter(Position.id == position_id).first()

    @staticmethod
    def create(db: Session, name: str, requirements: list, niceToHave: list, 
               deadline: str, aboutWork: str, locationType: str):
        position = Position(
            name=name,
            requirements=",".join(requirements),
            niceToHave=",".join(niceToHave),
            deadline=deadline,
            aboutWork=aboutWork,
            locationType=locationType
        )
        db.add(position)
        db.commit()
        db.refresh(position)
        return position

    @staticmethod
    def update(db: Session, position_id: int, **kwargs):
        position = db.query(Position).filter(Position.id == position_id).first()
        if position:
            for key, value in kwargs.items():
                if key in ["requirements", "niceToHave"] and isinstance(value, list):
                    setattr(position, key, ",".join(value))
                else:
                    setattr(position, key, value)
            db.commit()
            db.refresh(position)
        return position

    @staticmethod
    def delete(db: Session, position_id: int):
        position = db.query(Position).filter(Position.id == position_id).first()
        if position:
            db.delete(position)
            db.commit()
        return position


class CandidateRepository:
    @staticmethod
    def get_all(db: Session):
        return db.query(Candidate).all()

    @staticmethod
    def get_by_id(db: Session, candidate_id: int):
        return db.query(Candidate).filter(Candidate.id == candidate_id).first()

    @staticmethod
    def create(db: Session, **kwargs):
        candidate = Candidate(**kwargs)
        db.add(candidate)
        db.commit()
        db.refresh(candidate)
        return candidate

    @staticmethod
    def update(db: Session, candidate_id: int, **kwargs):
        candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
        if candidate:
            for key, value in kwargs.items():
                setattr(candidate, key, value)
            db.commit()
            db.refresh(candidate)
        return candidate

    @staticmethod
    def delete(db: Session, candidate_id: int):
        candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
        if candidate:
            db.delete(candidate)
            db.commit()
        return candidate

    @staticmethod
    def update_stage(db: Session, candidate_id: int, stage: str):
        candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
        if candidate:
            candidate.stage = stage
            db.commit()
            db.refresh(candidate)
        return candidate
