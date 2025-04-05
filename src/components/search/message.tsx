import { User2, Bot, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { MarkdownRender } from "../MarkdownRender"

interface MessageProps {
  content: string
  isUser: boolean
  loading?: boolean
}

export function Message({ content, isUser, loading }: MessageProps) {
  return (
    <div className={cn(
      "px-4 py-6",
    )}>
      <div className={cn(
        "max-w-5xl mx-auto flex items-start gap-2",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}>
          {isUser ? <User2 className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </div>
        <div className={cn(
          "rounded-2xl px-4 py-2 max-w-[90%]",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-card text-card-foreground border border-border"
        )}>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          ) : (
            <MarkdownRender content={content} />
          )}
        </div>
      </div>
    </div>
  )
}