import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IVolunteer extends Document {
  name: string;
  address: string;
  darsInstitution: string;
  bloodGroup: string;
  phoneNumber: string;
  whatsappNumber: string;
  skssfMembershipNumber: string;
  previousExperience: string;
  createdAt: Date;
  updatedAt: Date;
}

const VolunteerSchema = new Schema<IVolunteer>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    darsInstitution: {
      type: String,
      required: [true, 'Dars/Institution is required'],
      trim: true,
    },
    bloodGroup: {
      type: String,
      required: [true, 'Blood group is required'],
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    whatsappNumber: {
      type: String,
      required: [true, 'WhatsApp number is required'],
      trim: true,
    },
    skssfMembershipNumber: {
      type: String,
      required: [true, 'SKSSF membership number is required'],
      trim: true,
    },
    previousExperience: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create unique indexes to prevent duplicates
VolunteerSchema.index({ phoneNumber: 1 }, { unique: true, sparse: true });
VolunteerSchema.index({ whatsappNumber: 1 }, { unique: true, sparse: true });
VolunteerSchema.index({ skssfMembershipNumber: 1 }, { unique: true, sparse: true });

// Create index for faster queries
VolunteerSchema.index({ createdAt: -1 });

export default models.Volunteer || model<IVolunteer>('Volunteer', VolunteerSchema);
