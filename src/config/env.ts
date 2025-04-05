export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  openaiApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
} as const

// Validate environment variables
Object.entries(env).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`)
  }
})