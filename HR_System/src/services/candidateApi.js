import { request } from './apiClient'

export function getCandidates() {
  return request('/candidates')
}

export function getCandidateById(id) {
  return request(`/candidates/${id}`)
}

export function createCandidate(candidate) {
  return request('/candidates', {
    method: 'POST',
    body: JSON.stringify(candidate),
  })
}

export function updateCandidate(id, updates) {
  return request(`/candidates/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  })
}

export function deleteCandidate(id) {
  return request(`/candidates/${id}`, {
    method: 'DELETE',
  })
}

export function updateCandidateStage(id, stage) {
  return request(`/candidates/${id}/stage`, {
    method: 'PATCH',
    body: JSON.stringify({ stage }),
  })
}
