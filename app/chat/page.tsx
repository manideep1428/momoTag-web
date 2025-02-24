"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUp, Loader2, Send } from "lucide-react"
import { MessageSkeleton } from "@/components/ChatSkeleton"
import { ChatMessage } from "@/components/chatMessage"
import axios from "axios"
import { toast } from "@/hooks/use-toast"

export default function Chat() {
  const [files, setFiles] = useState<File[]>([])
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Dummy messages
  const messages = [
    {
      id: 2,
      role: "assistant",
      content: "Paste you File content in Input. I will analyze them and give Sales Recommendations",
    },
  ]

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault()
    if (!message.trim() && files.length === 0) return

    setIsLoading(true)
    const formData = new FormData()
    formData.append("message", message)
    files.forEach((file) => formData.append("files", file))

    try {""
      const res =  await axios.post("https://momotag-ai.onrender.com/sales-recommendations", formData)
      console.log("Response:", res.data)
      setMessage(res.data)
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: `${(error as any).message}`,
        variant : "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).slice(0, 2) 
      setFiles(selectedFiles)
    }
  }

  return (
    <div className="container">
      <Card>
        <CardHeader>
          <CardTitle>Sales Expert</CardTitle>
          <h6>This Backend in FASTAPI and Deployed in Render.
            So, first response is very slow,cause it has to cold start the backend  </h6>
        </CardHeader>

        <CardContent className="h-[400px] overflow-y-auto space-y-4">
          {isLoading ? (
            <>
              <MessageSkeleton />
              <MessageSkeleton />
            </>
          ) : (
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
          )}
        </CardContent>

        <CardFooter>
          <form className="w-full flex items-center space-x-2" onSubmit={handleSubmit}>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="cursor-pointer"
              onClick={() => fileInputRef.current?.click()} // This ensures the file dialog opens
            >
              <FileUp className="h-4 w-4" />
            </Button>

            <Textarea
              placeholder="Type your message..."
              className="min-h-[60px] resize-none flex-grow"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button type="submit" size="icon" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>

          {files.length > 0 && (
            <div className="mt-2 text-sm text-gray-500">
              {files.map((file, index) => (
                <div key={index}>{file.name}</div>
              ))}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
