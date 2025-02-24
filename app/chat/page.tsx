"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Send } from "lucide-react"
import { MessageSkeleton } from "@/components/ChatSkeleton"
import { ChatMessage } from "@/components/chatMessage"
import axios from "axios"
import { toast } from "@/hooks/use-toast"

export default function Chat() {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Paste your file content or type a message. I will analyze and give Sales Recommendations.",
    },
  ])

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;
  
    setIsLoading(true);
  
    try {
      const res = await axios.post("https://momotag-ai.onrender.com/sales-recommendations", { prompt: message });
  
      // Extract recommendations from response
      const recommendations = res.data.sales_recommendations.join("\n");
  
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, role: "user", content: message },
        { id: prev.length + 2, role: "assistant", content: recommendations },
      ]);
  
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: `${(error as any).message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container">
      <Card>
        <CardHeader>
          <CardTitle>Sales Expert</CardTitle>
          <h6>This Backend is in FASTAPI and Deployed on Render. 
            The first response may be slow due to cold start EVEN 50s as per Render.</h6>
        </CardHeader>

        <CardContent className="h-[400px] overflow-y-auto space-y-4">
          {isLoading ? (
            <>
              <MessageSkeleton />
              <MessageSkeleton />
            </>
          ) : (
            //@ts-ignore
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
          )}
        </CardContent>

        <CardFooter>
          <form className="w-full flex items-center space-x-2" onSubmit={handleSubmit}>
            <Textarea
              placeholder="Type your message..."
              className="min-h-[60px] max-h-[200px] resize-y flex-grow"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button type="submit" size="icon" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
