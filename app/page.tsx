import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-10">Community Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/user">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>User Panel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Create and view your posts</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/admin">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>SuperAdmin Panel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Review and manage posts</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/posts">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Common Panel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">View approved community posts</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}