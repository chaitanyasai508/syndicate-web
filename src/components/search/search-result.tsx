"use client"

import { motion } from "framer-motion"
import { MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchResultProps {
  content: string
  sources?: Array<{
    title: string
    url: string
  }>
}

export function SearchResult({ content, sources = [] }: SearchResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 space-y-4"
    >
      <div className="bg-card rounded-lg p-4 shadow-sm">
        <div className="prose dark:prose-invert max-w-none">
          <p>{content}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ThumbsDown className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {sources.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Sources</h3>
          <div className="grid gap-2">
            {sources.map((source, index) => (
              <a
                key={index}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {source.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}