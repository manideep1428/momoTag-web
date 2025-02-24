'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface Post {
  id: string;
  content: string;
  created_at: string;
}

export default function CommonPanel() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchApprovedPosts();
  }, []);

  const fetchApprovedPosts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch posts',
        variant: 'destructive',
      });
    } else {
      setPosts(data || []);
    }

    setIsLoading(false);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Community Posts</h1>
      <div className="space-y-4">
        {isLoading ? (
          Array(3)
            .fill(null)
            .map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-3/4" />
                </CardContent>
              </Card>
            ))
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">
                  Posted on {new Date(post.created_at).toLocaleDateString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{post.content}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-muted-foreground">No approved posts yet.</p>
        )}
      </div>
    </div>
  );
}
