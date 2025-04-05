import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true // Only if you're calling directly from client
})

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

