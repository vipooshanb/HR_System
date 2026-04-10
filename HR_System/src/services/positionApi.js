import { request } from './apiClient'

export function getPositions() {
  return request('/positions')
}

export function createPosition(position) {
  return request('/positions', {
    method: 'POST',
    body: JSON.stringify(position),
  })
}

export function updatePosition(id, updates) {
  return request(`/positions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  })
}

export function deletePosition(id) {
  return request(`/positions/${id}`, {
    method: 'DELETE',
  })
}