import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/server/config/mongoose'
import ContactUs from '@/server/models/contactUs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Connect to database
    await connectToDB()

    // Create new contact entry
    const contactEntry = new ContactUs({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      message: message.trim(),
      isRead: false
    })

    await contactEntry.save()

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        data: {
          id: contactEntry._id,
          name: contactEntry.name,
          email: contactEntry.email
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to submit contact form. Please try again later.' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  )
}
