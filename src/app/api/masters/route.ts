import { NextResponse } from 'next/server';
import { supabase } from '@/app/components/supabaseClient';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('masters')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch masters' },
      { status: 500 }
    );
  }
}