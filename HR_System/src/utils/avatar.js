const VARIANT_COUNT = 5

export function getCandidateInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean)

  if (!parts.length) {
    return 'NA'
  }

  if (parts.length === 1) {
    const first = parts[0].charAt(0)
    const second = parts[0].charAt(1) || first
    return `${first}${second}`.toUpperCase()
  }

  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase()
}

export function getAvatarVariant(id = '') {
  let hash = 0
  for (let index = 0; index < id.length; index += 1) {
    hash = (hash << 5) - hash + id.charCodeAt(index)
    hash |= 0
  }

  const variantIndex = Math.abs(hash) % VARIANT_COUNT
  return `avatar--variant-${variantIndex + 1}`
}
