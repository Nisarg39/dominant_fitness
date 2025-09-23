import { NextResponse } from 'next/server';
import { createContactUs } from '@/server/actions/userActions';

export async function POST(request) {
  try {
    const formData = await request.json();
    const result = await createContactUs(formData);
    
    if (result.success) {
      return NextResponse.json({ success: true, message: result.success });
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
