export type HomeFeature = {
  id: string
  icon: 'blocks' | 'folder-code' | 'rocket'
  title: string
  description: string
}

export type HomeContent = {
  title: string
  description: string
  badge: string
  aboutLabel: string
  contactLabel: string
  stack: string
  previewTitle: string
  previewLines: string[]
  command: string
  featuresTitle: string
  features: HomeFeature[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isFeature(value: unknown): value is HomeFeature {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.description === 'string' &&
    (value.icon === 'blocks' ||
      value.icon === 'folder-code' ||
      value.icon === 'rocket')
  )
}

// TypeScript cannot validate network responses at runtime. Check the JSON shape
// before rendering it so an invalid response shows the error UI instead of crashing.
function isHomeContent(value: unknown): value is HomeContent {
  if (!isRecord(value)) return false

  const textFields = [
    'title',
    'description',
    'badge',
    'aboutLabel',
    'contactLabel',
    'stack',
    'previewTitle',
    'command',
    'featuresTitle',
  ] as const

  return (
    textFields.every((field) => typeof value[field] === 'string') &&
    Array.isArray(value.previewLines) &&
    value.previewLines.every((line: unknown) => typeof line === 'string') &&
    Array.isArray(value.features) &&
    value.features.every(isFeature)
  )
}

export async function fetchHomeContent(
  signal: AbortSignal,
): Promise<HomeContent> {
  // Vite serves public/data/home.json at /data/home.json, not /public/data/...
  // Replace this URL with your API endpoint; keep the response shape below,
  // or update HomeContent and its validator to match the API.
  const response = await fetch(`${import.meta.env.BASE_URL}data/home.json`, {
    signal,
  })

  // fetch() only rejects network failures, not HTTP errors such as 404 or 500.
  if (!response.ok) {
    throw new Error(`Home content request failed (HTTP ${response.status}).`)
  }

  const data: unknown = await response.json()
  if (!isHomeContent(data)) {
    throw new Error('Home content has an unexpected format.')
  }

  return data
}
