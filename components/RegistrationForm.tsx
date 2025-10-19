'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { volunteerSchema, type VolunteerFormData } from '@/lib/validation';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
  });

  const onSubmit = async (data: VolunteerFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/volunteers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'രജിസ്ട്രേഷൻ പരാജയപ്പെട്ടു');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('നെറ്റ്‌വർക്ക് പിശക്. വീണ്ടും ശ്രമിക്കുക.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          പേര് <span className="text-red-500">*</span>
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
          placeholder="നിങ്ങളുടെ പൂർണ്ണമായ പേര്"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          വിലാസം <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('address')}
          id="address"
          rows={3}
          className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none resize-none"
          placeholder="പൂർണ്ണ വിലാസം"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      {/* Dars/Institution */}
      <div>
        <label htmlFor="darsInstitution" className="block text-sm font-medium text-gray-700 mb-2">
          ദാർസ് / സ്ഥാപനം <span className="text-red-500">*</span>
        </label>
        <input
          {...register('darsInstitution')}
          type="text"
          id="darsInstitution"
          className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
          placeholder="ദാർസ് അല്ലെങ്കിൽ സ്ഥാപനത്തിന്റെ പേര്"
        />
        {errors.darsInstitution && (
          <p className="mt-1 text-sm text-red-600">{errors.darsInstitution.message}</p>
        )}
      </div>

      {/* Blood Group */}
      <div>
        <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-2">
          രക്തഗ്രൂപ്പ് <span className="text-red-500">*</span>
        </label>
        <select
          {...register('bloodGroup')}
          id="bloodGroup"
          className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none bg-white"
        >
          <option value="">തിരഞ്ഞെടുക്കുക</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        {errors.bloodGroup && (
          <p className="mt-1 text-sm text-red-600">{errors.bloodGroup.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
          ഫോൺ നമ്പർ <span className="text-red-500">*</span>
        </label>
        <input
          {...register('phoneNumber')}
          type="tel"
          id="phoneNumber"
          className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
          placeholder="10 അക്ക ഫോൺ നമ്പർ"
          maxLength={10}
        />
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
        )}
      </div>

      {/* WhatsApp Number */}
      <div>
        <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-2">
          WhatsApp നമ്പർ <span className="text-red-500">*</span>
        </label>
        <input
          {...register('whatsappNumber')}
          type="tel"
          id="whatsappNumber"
          className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
          placeholder="10 അക്ക WhatsApp നമ്പർ"
          maxLength={10}
        />
        {errors.whatsappNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.whatsappNumber.message}</p>
        )}
      </div>

      {/* SKSSF Membership Number */}
      <div>
        <label htmlFor="skssfMembershipNumber" className="block text-sm font-medium text-gray-700 mb-2">
          SKSSF മെമ്പർഷിപ്പ് നമ്പർ <span className="text-red-500">*</span>
        </label>
        <input
          {...register('skssfMembershipNumber')}
          type="text"
          id="skssfMembershipNumber"
          className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
          placeholder="മെമ്പർഷിപ്പ് നമ്പർ"
        />
        {errors.skssfMembershipNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.skssfMembershipNumber.message}</p>
        )}
      </div>

      {/* Previous Experience */}
      <div>
        <label htmlFor="previousExperience" className="block text-sm font-medium text-gray-700 mb-2">
          മുൻകാല സമ്മേളനങ്ങളിൽ സേവനം
        </label>
        <textarea
          {...register('previousExperience')}
          id="previousExperience"
          rows={3}
          className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none resize-none"
          placeholder="മുൻകാല സമ്മേളനങ്ങളിൽ സേവനം ചെയ്തിട്ടുണ്ടെങ്കിൽ ഏതൊക്കെ സമ്മേളനങ്ങളിൽ എന്ന് പരാമർശിക്കുക"
        />
        {errors.previousExperience && (
          <p className="mt-1 text-sm text-red-600">{errors.previousExperience.message}</p>
        )}
      </div>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <p className="text-emerald-800 font-medium">രജിസ്ട്രേഷൻ വിജയകരമായി പൂർത്തിയായി!</p>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-800 font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            സബ്മിറ്റ് ചെയ്യുന്നു...
          </>
        ) : (
          'സബ്മിറ്റ് ചെയ്യുക'
        )}
      </button>
    </form>
  );
}
