"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: string;
  content: string;
  approved: boolean;
  created_at: string;
}

export default function AdminPanel() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [adminLoginToken, setAdminLoginToken] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
    getToken();
  }, []);

  const getToken = () => {
    const token = window.localStorage.getItem("admin_token");
    setAdminLoginToken(token);
  };

  const AdminLogin = () => {
    const token = Math.floor(Math.random() * 10).toString();
    window.localStorage.setItem("admin_token", token);
    setAdminLoginToken(token);
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch posts",
        variant: "destructive",
      });
      return;
    }

    setPosts(data || []);
  };

  const handleApproval = async (postId: string, approved: boolean) => {
    if (!adminLoginToken) {
      toast({
        title: "Please Login",
        description: "Click on the Login button",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from("posts")
      .update({ approved })
      .eq("id", postId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update post status",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: `Post ${approved ? "approved" : "rejected"} successfully`,
    });

    fetchPosts();
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">SuperAdmin Panel</h1>

      {!adminLoginToken && (
        <div className="flex justify-end m-4">
          <Button onClick={AdminLogin}>Login as Admin</Button>
        </div>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                Posted on {new Date(post.created_at).toLocaleDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{post.content}</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleApproval(post.id, true)}
                  disabled={post.approved}
                  variant={post.approved ? "outline" : "default"}
                >
                  {post.approved ? "Approved" : "Approve"}
                </Button>
                <Button
                  onClick={() => handleApproval(post.id, false)}
                  disabled={!post.approved}
                  variant="destructive"
                >
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
