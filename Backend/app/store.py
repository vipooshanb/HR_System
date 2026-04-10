from copy import deepcopy
from threading import Lock
from uuid import uuid4

from app.seed_data import CANDIDATES, POSITIONS

_store_lock = Lock()
_positions = deepcopy(POSITIONS)
_candidates = deepcopy(CANDIDATES)


def get_position_records():
    with _store_lock:
        return deepcopy(_positions)


def create_position_record(payload):
    with _store_lock:
        record = {'id': f'pos-{uuid4().hex[:8]}', **payload}
        _positions.insert(0, record)
        return deepcopy(record)


def update_position_record(position_id, payload):
    with _store_lock:
        for index, position in enumerate(_positions):
            if position['id'] != position_id:
                continue

            previous_name = position['name']
            updated_position = {**position, **payload}
            _positions[index] = updated_position

            if updated_position['name'] != previous_name:
                for candidate in _candidates:
                    applied_position = candidate.get('appliedPosition') or candidate.get('role')
                    if applied_position == previous_name:
                        candidate['role'] = updated_position['name']
                        candidate['appliedPosition'] = updated_position['name']

            return deepcopy(updated_position)

    return None


def delete_position_record(position_id):
    with _store_lock:
        deleted_position = None

        for index, position in enumerate(_positions):
          if position['id'] == position_id:
            deleted_position = _positions.pop(index)
            break

        if deleted_position is None:
            return False

        fallback_name = _positions[0]['name'] if _positions else 'General Role'
        for candidate in _candidates:
            applied_position = candidate.get('appliedPosition') or candidate.get('role')
            if applied_position == deleted_position['name']:
                candidate['role'] = fallback_name
                candidate['appliedPosition'] = fallback_name

        return True


def get_candidate_records():
    with _store_lock:
        return deepcopy(_candidates)


def get_candidate_record(candidate_id):
    with _store_lock:
        for candidate in _candidates:
            if candidate['id'] == candidate_id:
                return deepcopy(candidate)

    return None


def create_candidate_record(payload):
    with _store_lock:
        record = {
            'id': payload.get('id') or f'cand-{uuid4().hex[:8]}',
            **payload,
        }
        record['role'] = record.get('role') or record.get('appliedPosition') or 'Unassigned'
        record['appliedPosition'] = record.get('appliedPosition') or record['role']
        _candidates.insert(0, record)
        return deepcopy(record)


def update_candidate_record(candidate_id, payload):
    with _store_lock:
        for index, candidate in enumerate(_candidates):
            if candidate['id'] != candidate_id:
                continue

            updated_candidate = {**candidate, **payload}
            updated_candidate['role'] = updated_candidate.get('role') or updated_candidate.get('appliedPosition') or 'Unassigned'
            updated_candidate['appliedPosition'] = updated_candidate.get('appliedPosition') or updated_candidate['role']
            _candidates[index] = updated_candidate
            return deepcopy(updated_candidate)

    return None


def update_candidate_stage_record(candidate_id, stage):
    with _store_lock:
        for index, candidate in enumerate(_candidates):
            if candidate['id'] != candidate_id:
                continue

            updated_candidate = {**candidate, 'stage': stage}
            _candidates[index] = updated_candidate
            return deepcopy(updated_candidate)

    return None


def delete_candidate_record(candidate_id):
    with _store_lock:
        for index, candidate in enumerate(_candidates):
            if candidate['id'] == candidate_id:
                _candidates.pop(index)
                return True

    return False
