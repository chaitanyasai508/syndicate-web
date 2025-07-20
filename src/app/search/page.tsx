"use client"

import { useEffect, useRef } from "react"
import { SearchBox } from "@/components/search/search-box"
import { Message } from "@/components/search/message"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useAiChat } from "@/hooks/use-ai-chat"
import Layout from "@/components/layout"

interface ChatMessage {
  content: string
  isUser: boolean
}

const sampleQuestions = [
  "How do I syndicate my project",
  "How do I syndicate my project?",
  "what are the benefits of syndication?",
]

export default function SearchPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { sendMessage, messages, isLoading, error } = useAiChat()
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (error) {
      console.error(error)
    }
  }, [error])

  return (
    <Layout>
      <div className="flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
            height: messages.length ? 'auto' : '100%'
          }}
          className={cn(
            "flex flex-col items-center w-full",
            messages.length ? "p-4 border-b" : "flex-1 justify-center p-8"
          )}
        >
          <div className="text-center space-y-2  mx-auto">
            <h1 className="text-2xl font-bold">Syndicate Up - AI Assistant</h1>
            <p className="text-muted-foreground">
              Ask anything and get AI-powered answers to your questions
            </p>
          </div>

          {!messages.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full  space-y-2 mt-6 flex flex-row justify-center gap-2"
            >
              {sampleQuestions?.map(question => (
                <button
                  key={question}
                  onClick={() => sendMessage(question)}
                  className=" px-4 py-3 text-sm text-left rounded-lg
                  border-2 border-border bg-accent
                  transition-colors text-muted-foreground hover:text-foreground"
                >
                  {question}
              </button>
              ))}

            </motion.div>
          )}
        </motion.div>
        {messages.length > 0 && (
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="popLayout" initial={false}>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                    height: {
                      duration: 0.6
                    },
                    opacity: {
                      duration: 0.5,
                      delay: 0.1
                    }
                  }}
                >
                  <Message
                    content={message.content}
                    isUser={message.isUser}
                    loading={message.loading}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        )}
        <div className="border-t p-4">
          <SearchBox
            onSubmit={ (query) => {
              sendMessage(query)
            }}
            isLoading={isLoading}
            className="max-w-5xl mx-auto"
          />
        </div>
      </div>
    </Layout>
  )
}