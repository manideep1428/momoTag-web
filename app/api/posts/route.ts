import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { content, user_id } = await req.json();

    // Insert into Supabase
    const { error } = await supabase.from('posts').insert([{ content, user_id }]);

    if (error) throw error;

    return NextResponse.json({ message: 'Post added successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
