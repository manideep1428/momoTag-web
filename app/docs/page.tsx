'use client'

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function ProjectTabs() {
  const [tab, setTab] = useState("web");

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="web">Web Dev</TabsTrigger>
          <TabsTrigger value="ai">AI</TabsTrigger>
        </TabsList>
        
        <TabsContent value="web">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Web Development</h2>
              <p>I used Next.js, Supabase for frontend and database for rapid development.</p>
              <p>I used Tailwind and Shadcn UI.</p>
              <p>There are three sections:</p>
              <ul className="list-disc ml-5">
                <li><strong>Common Panel:</strong> Displays approved posts from the admin for everyone.</li>
                <li><strong>User Panel:</strong> A page where the community can post and send submissions to the admin.</li>
                <li><strong>Admin Panel:</strong> Allows the admin to approve or reject posts submitted by users.</li>
              </ul>
              <p>A login button is placed on top of the Admin and User panels to simulate real login, generating a random token stored in local storage.</p>
              <p>I didn’t prioritize styles for the sake of fast development.</p>
              <p>Using Supabase allowed me to quickly set up authentication and database management, making the development process more efficient.</p>
              <p>The system ensures smooth moderation by allowing the admin to filter content before public display, promoting a safe and structured environment.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">AI</h2>
              <p>I used FastAPI and Groq LLama 90B along with Next.js for the frontend.</p>
              <p>I Deployed in render my backend  FastAPI .</p>
              <p>Groq LLama 90B .</p>
              <p>The AI is optimized for handling large-scale queries with minimal latency, ensuring a smooth user experience.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
