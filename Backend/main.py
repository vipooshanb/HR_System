from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.models import (
    CandidateCreate,
    CandidateRead,
    CandidateStageUpdate,
    CandidateUpdate,
    PositionCreate,
    PositionRead,
    PositionUpdate,
)
from app.database import get_db, engine, Base
from app.repository import PositionRepository, CandidateRepository

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title='HR Management Backend', version='1.0.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=False,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/api/health')
def health_check():
    return {'status': 'ok'}


@app.get('/api/positions', response_model=list[PositionRead])
def list_positions(db: Session = Depends(get_db)):
    positions = PositionRepository.get_all(db)
    return [
        {
            "id": str(p.id),
            "name": p.name,
            "requirements": p.requirements.split(",") if p.requirements else [],
            "niceToHave": p.niceToHave.split(",") if p.niceToHave else [],
            "deadline": p.deadline,
            "aboutWork": p.aboutWork,
            "locationType": p.locationType,
        }
        for p in positions
    ]


@app.post('/api/positions', response_model=PositionRead, status_code=status.HTTP_201_CREATED)
def add_position(payload: PositionCreate, db: Session = Depends(get_db)):
    position = PositionRepository.create(
        db,
        name=payload.name,
        requirements=payload.requirements,
        niceToHave=payload.niceToHave,
        deadline=payload.deadline,
        aboutWork=payload.aboutWork,
        locationType=payload.locationType,
    )
    return {
        "id": str(position.id),
        "name": position.name,
        "requirements": payload.requirements,
        "niceToHave": payload.niceToHave,
        "deadline": position.deadline,
        "aboutWork": position.aboutWork,
        "locationType": position.locationType,
    }


@app.put('/api/positions/{position_id}', response_model=PositionRead)
def edit_position(position_id: str, payload: PositionUpdate, db: Session = Depends(get_db)):
    update_data = payload.model_dump(exclude_unset=True)
    position = PositionRepository.update(db, int(position_id), **update_data)
    if position is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Position not found')
    return {
        "id": str(position.id),
        "name": position.name,
        "requirements": position.requirements.split(",") if position.requirements else [],
        "niceToHave": position.niceToHave.split(",") if position.niceToHave else [],
        "deadline": position.deadline,
        "aboutWork": position.aboutWork,
        "locationType": position.locationType,
    }


@app.delete('/api/positions/{position_id}', status_code=status.HTTP_204_NO_CONTENT)
def remove_position(position_id: str, db: Session = Depends(get_db)):
    deleted = PositionRepository.delete(db, int(position_id))
    if deleted is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Position not found')


@app.get('/api/candidates', response_model=list[CandidateRead])
def list_candidates(db: Session = Depends(get_db)):
    candidates = CandidateRepository.get_all(db)
    return [c.to_dict() for c in candidates]


@app.get('/api/candidates/{candidate_id}', response_model=CandidateRead)
def read_candidate(candidate_id: str, db: Session = Depends(get_db)):
    candidate = CandidateRepository.get_by_id(db, int(candidate_id))
    if candidate is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Candidate not found')
    return candidate.to_dict()


@app.post('/api/candidates', response_model=CandidateRead, status_code=status.HTTP_201_CREATED)
def add_candidate(payload: CandidateCreate, db: Session = Depends(get_db)):
    candidate = CandidateRepository.create(
        db,
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        role=payload.role,
        appliedPosition=payload.appliedPosition,
        stage=payload.stage,
        applicationDate=payload.applicationDate,
        overallScore=payload.overallScore,
        referred=payload.referred,
        assessmentAdded=payload.assessmentAdded,
        location=payload.location,
        notes=payload.notes,
    )
    return candidate.to_dict()


@app.put('/api/candidates/{candidate_id}', response_model=CandidateRead)
def edit_candidate(candidate_id: str, payload: CandidateUpdate, db: Session = Depends(get_db)):
    update_data = {k: v for k, v in payload.model_dump(exclude_unset=True).items() if v is not None}
    candidate = CandidateRepository.update(db, int(candidate_id), **update_data)
    if candidate is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Candidate not found')
    return candidate.to_dict()


@app.patch('/api/candidates/{candidate_id}/stage', response_model=CandidateRead)
def change_candidate_stage(candidate_id: str, payload: CandidateStageUpdate, db: Session = Depends(get_db)):
    candidate = CandidateRepository.update_stage(db, int(candidate_id), payload.stage)
    if candidate is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Candidate not found')
    return candidate.to_dict()


@app.delete('/api/candidates/{candidate_id}', status_code=status.HTTP_204_NO_CONTENT)
def remove_candidate(candidate_id: str, db: Session = Depends(get_db)):
    deleted = CandidateRepository.delete(db, int(candidate_id))
    if deleted is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Candidate not found')
