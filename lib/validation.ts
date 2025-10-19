import { z } from 'zod';

export const volunteerSchema = z.object({
  name: z.string().min(2, 'പേര് കുറഞ്ഞത് 2 അക്ഷരങ്ങൾ ഉണ്ടായിരിക്കണം'),
  address: z.string().min(5, 'വിലാസം കൂടുതൽ വിശദമായി നൽകുക'),
  darsInstitution: z.string().min(2, 'ദാർസ്/സ്ഥാപനത്തിന്റെ പേര് നൽകുക'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    errorMap: () => ({ message: 'സാധുവായ രക്തഗ്രൂപ്പ് തിരഞ്ഞെടുക്കുക' }),
  }),
  phoneNumber: z.string()
    .min(10, 'സാധുവായ ഫോൺ നമ്പർ നൽകുക')
    .regex(/^[0-9]{10}$/, 'ഫോൺ നമ്പർ 10 അക്കങ്ങൾ ആയിരിക്കണം'),
  whatsappNumber: z.string()
    .min(10, 'സാധുവായ WhatsApp നമ്പർ നൽകുക')
    .regex(/^[0-9]{10}$/, 'WhatsApp നമ്പർ 10 അക്കങ്ങൾ ആയിരിക്കണം'),
  skssfMembershipNumber: z.string().min(1, 'SKSSF മെമ്പർഷിപ്പ് നമ്പർ നൽകുക'),
  previousExperience: z.string().optional(),
});

export type VolunteerFormData = z.infer<typeof volunteerSchema>;
