from pathlib import Path

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.models import (
    CandidateCreate,
    CandidateRead,
    CandidateStageUpdate,
    CandidateUpdate,
    PositionCreate,
    PositionRead,
    PositionUpdate,
)
from app.store import (
    create_candidate_record,
    create_position_record,
    delete_candidate_record,
    delete_position_record,
    get_candidate_record,
    get_candidate_records,
    get_position_records,
    update_candidate_record,
    update_candidate_stage_record,
    update_position_record,
)

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
def list_positions():
    return get_position_records()


@app.post('/api/positions', response_model=PositionRead, status_code=status.HTTP_201_CREATED)
def add_position(payload: PositionCreate):
    return create_position_record(payload.model_dump())


@app.put('/api/positions/{position_id}', response_model=PositionRead)
def edit_position(position_id: str, payload: PositionUpdate):
    updated_position = update_position_record(position_id, payload.model_dump(exclude_unset=True))
    if updated_position is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Position not found')
    return updated_position


@app.delete('/api/positions/{position_id}', status_code=status.HTTP_204_NO_CONTENT)
def remove_position(position_id: str):
    deleted = delete_position_record(position_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Position not found')


@app.get('/api/candidates', response_model=list[CandidateRead])
def list_candidates():
    return get_candidate_records()


@app.get('/api/candidates/{candidate_id}', response_model=CandidateRead)
def read_candidate(candidate_id: str):
    candidate = get_candidate_record(candidate_id)
    if candidate is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Candidate not found')
    return candidate


@app.post('/api/candidates', response_model=CandidateRead, status_code=status.HTTP_201_CREATED)
def add_candidate(payload: CandidateCreate):
    return create_candidate_record(payload.model_dump())


@app.put('/api/candidates/{candidate_id}', response_model=CandidateRead)
def edit_candidate(candidate_id: str, payload: CandidateUpdate):
    candidate = update_candidate_record(candidate_id, payload.model_dump(exclude_unset=True))
    if candidate is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Candidate not found')
    return candidate


@app.patch('/api/candidates/{candidate_id}/stage', response_model=CandidateRead)
def change_candidate_stage(candidate_id: str, payload: CandidateStageUpdate):
    candidate = update_candidate_stage_record(candidate_id, payload.stage)
    if candidate is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Candidate not found')
    return candidate


@app.delete('/api/candidates/{candidate_id}', status_code=status.HTTP_204_NO_CONTENT)
def remove_candidate(candidate_id: str):
    deleted = delete_candidate_record(candidate_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Candidate not found')


static_dir = Path(__file__).resolve().parent / 'static'
if static_dir.exists():
    app.mount('/', StaticFiles(directory=static_dir, html=True), name='frontend')
