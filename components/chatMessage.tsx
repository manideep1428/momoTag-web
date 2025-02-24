interface Message {
  id: number
  role: "user" | "assistant"
  content: string
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] rounded-lg p-4 ${isUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  )
}


