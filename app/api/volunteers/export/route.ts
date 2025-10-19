import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Volunteer from '@/models/Volunteer';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
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
    
    const volunteers = await Volunteer.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    // Convert to CSV format
    const headers = [
      'Name',
      'Address',
      'Dars/Institution',
      'Blood Group',
      'Phone Number',
      'WhatsApp Number',
      'SKSSF Membership',
      'Previous Experience',
      'Registered Date'
    ];

    const csvRows = [];
    csvRows.push(headers.join(','));

    volunteers.forEach((volunteer) => {
      const row = [
        `"${volunteer.name}"`,
        `"${volunteer.address.replace(/"/g, '""')}"`,
        `"${volunteer.darsInstitution}"`,
        volunteer.bloodGroup,
        volunteer.phoneNumber,
        volunteer.whatsappNumber,
        volunteer.skssfMembershipNumber,
        `"${(volunteer.previousExperience || '').replace(/"/g, '""')}"`,
        new Date(volunteer.createdAt).toLocaleString('en-IN')
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="volunteers-${Date.now()}.csv"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to export data',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
