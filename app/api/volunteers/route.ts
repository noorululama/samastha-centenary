import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Volunteer from '@/models/Volunteer';
import { volunteerSchema } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = volunteerSchema.parse(body);
    
    // Connect to the database
    await dbConnect();
    
    // Create a new volunteer record
    const volunteer = await Volunteer.create(validatedData);
    
    return NextResponse.json(
      {
        success: true,
        message: 'രജിസ്ട്രേഷൻ വിജയകരമായി പൂർത്തിയായി!',
        data: volunteer,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Handle validation errors
    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          message: 'സാധുവല്ലാത്ത ഡാറ്റ',
          errors: error.errors,
        },
        { status: 400 }
      );
    }
    
    // Handle duplicate key errors (MongoDB)
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: 'ഈ വിവരങ്ങൾ ഇതിനകം രജിസ്റ്റർ ചെയ്തിട്ടുണ്ട്',
        },
        { status: 409 }
      );
    }
    
    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        message: 'രജിസ്ട്രേഷൻ പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    
    const volunteers = await Volunteer.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .select('-__v');
    
    return NextResponse.json({
      success: true,
      count: volunteers.length,
      data: volunteers,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch volunteers',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
