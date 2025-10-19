import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Volunteer from '@/models/Volunteer';
import { volunteerSchema } from '@/lib/validation';
import { isAuthenticated } from '@/lib/auth';

// Update volunteer
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = volunteerSchema.parse(body);

    await dbConnect();

    const volunteer = await Volunteer.findByIdAndUpdate(
      params.id,
      validatedData,
      { new: true, runValidators: true }
    );

    if (!volunteer) {
      return NextResponse.json(
        { success: false, message: 'Volunteer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Volunteer updated successfully',
      data: volunteer,
    });
  } catch (error: any) {
    console.error('Update error:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid data',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update volunteer',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Delete volunteer
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const volunteer = await Volunteer.findByIdAndDelete(params.id);

    if (!volunteer) {
      return NextResponse.json(
        { success: false, message: 'Volunteer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Volunteer deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete volunteer',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
