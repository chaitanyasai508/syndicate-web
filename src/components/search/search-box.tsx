"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Loader2, SendHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

interface SearchBoxProps {
  onSubmit: (message: string) => void
  isLoading: boolean
  className?: string
}

interface Message {
  content: string;
  isUser: boolean;
}

export function SearchBox({ onSubmit, isLoading }: SearchBoxProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim() || isLoading) return
    onSubmit(query)
    setQuery("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-start">
          <Sparkles className="absolute left-3 h-5 w-5 text-gray-500 top-5" />
          <Textarea
            rows={1}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Message Syndicate AI..."
            className="pl-10 pr-20 resize-none py-4 bg-muted/80 text-base min-h-[60px]"
            onKeyDown={handleKeyDown}
            autoComplete="off"
            disabled={isLoading}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={isLoading ? "loading" : "send"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-2 bottom-2"
            >
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !query.trim()}
                className="h-10 w-10"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <SendHorizontal className="h-4 w-4" />
                )}
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </form>
    </motion.div>
  )
}