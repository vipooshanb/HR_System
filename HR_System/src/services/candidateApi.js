import { dummyCandidates } from '../data/dummyCandidates'

const clone = (value) => JSON.parse(JSON.stringify(value))

const wait = (time = 180) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, time)
  })

export async function getCandidates() {
  await wait()
  return clone(dummyCandidates)
}

export async function getCandidateById(id) {
  await wait(120)
  return clone(dummyCandidates.find((candidate) => candidate.id === id) || null)
}

export async function createCandidate(candidate) {
  await wait(120)
  return {
    ...clone(candidate),
    id: crypto.randomUUID(),
  }
}

export async function updateCandidate(id, updates) {
  await wait(120)
  return {
    id,
    ...clone(updates),
  }
}

export async function deleteCandidate(id) {
  await wait(120)
  return { id, deleted: true }
}

export async function updateCandidateStage(id, stage) {
  await wait(120)
  return { id, stage }
}
