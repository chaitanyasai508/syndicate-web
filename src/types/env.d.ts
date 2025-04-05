declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string
      NEXT_PUBLIC_OPENAI_API_KEY: string
      NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

export {}