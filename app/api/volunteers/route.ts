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
    
    // Check for existing records with the same phone, WhatsApp, or membership number
    const existingVolunteer = await Volunteer.findOne({
      $or: [
        { phoneNumber: validatedData.phoneNumber },
        { whatsappNumber: validatedData.whatsappNumber },
        { skssfMembershipNumber: validatedData.skssfMembershipNumber },
      ],
    });

    if (existingVolunteer) {
      // Determine which field is duplicate
      const duplicateFields = [];
      if (existingVolunteer.phoneNumber === validatedData.phoneNumber) {
        duplicateFields.push('ഫോൺ നമ്പർ');
      }
      if (existingVolunteer.whatsappNumber === validatedData.whatsappNumber) {
        duplicateFields.push('WhatsApp നമ്പർ');
      }
      if (existingVolunteer.skssfMembershipNumber === validatedData.skssfMembershipNumber) {
        duplicateFields.push('SKSSF മെമ്പർഷിപ്പ് നമ്പർ');
      }

      return NextResponse.json(
        {
          success: false,
          message: `ഈ ${duplicateFields.join(', ')} ഇതിനകം രജിസ്റ്റർ ചെയ്തിട്ടുണ്ട്`,
          duplicateFields: duplicateFields,
          existingName: existingVolunteer.name,
        },
        { status: 409 }
      );
    }
    
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
    
    // Handle duplicate key errors (MongoDB unique constraint)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0];
      let fieldName = 'വിവരങ്ങൾ';
      
      if (field === 'phoneNumber') fieldName = 'ഫോൺ നമ്പർ';
      else if (field === 'whatsappNumber') fieldName = 'WhatsApp നമ്പർ';
      else if (field === 'skssfMembershipNumber') fieldName = 'SKSSF മെമ്പർഷിപ്പ് നമ്പർ';
      
      return NextResponse.json(
        {
          success: false,
          message: `ഈ ${fieldName} ഇതിനകം രജിസ്റ്റർ ചെയ്തിട്ടുണ്ട്`,
          duplicateField: fieldName,
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

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Get pagination parameters from query string
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const skip = (page - 1) * limit;
    
    // Get total count for pagination
    const total = await Volunteer.countDocuments();
    
    // Fetch paginated volunteers
    const volunteers = await Volunteer.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');
    
    return NextResponse.json({
      success: true,
      data: volunteers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + volunteers.length < total,
      },
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
