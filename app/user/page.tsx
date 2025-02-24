'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export default function UserPanel() {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    let token = window.localStorage.getItem('user_token');
    if(token !== undefined) {
      setUserToken(token);
    }
  }, []);

  const userLogin = async () => {
    const token = 1 ;
    window.localStorage.setItem('user_token', token.toString());
    setUserToken(token.toString());
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      if (!userToken) {
        toast({ title: 'Error', description: 'User not logged in!', variant: 'destructive' });
        return;
      }
  
      const { error } = await supabase.from('posts').insert([{ content, user_id: userToken }]);
       if (error) throw error;
      toast({ title: 'Success', description:'Post added successfully' });
      setContent('');
    } catch (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto py-10">
          {!userToken && (
        <div className="flex justify-end m-4">
          <Button onClick={userLogin}>Login as User</Button>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Create a New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Write your post here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px]"
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting || !content.trim()}>
                {isSubmitting ? 'Submitting...' : 'Submit Post'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
