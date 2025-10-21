import RegistrationForm from '@/components/RegistrationForm';
import { Calendar, Users, AlertCircle, Sparkles, Award, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12 relative">
          <div className="flex items-center justify-center mb-2 sm:mb-3">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 mr-2 sm:mr-3 animate-pulse" />
            <Award className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300" />
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 ml-2 sm:ml-3 animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-2 sm:mb-3 tracking-tight leading-tight">
            സമസ്ത നൂറാം വാർഷികം
          </h1>
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="h-0.5 sm:h-1 w-12 sm:w-16 bg-yellow-300 rounded-full"></div>
            <div className="h-0.5 sm:h-1 w-6 sm:w-8 bg-yellow-400 rounded-full"></div>
          </div>
          <p className="text-center text-emerald-50 text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-wide px-2">
            വളണ്ടിയർ സേവന രജിസ്ട്രേഷൻ
          </p>
          <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2">
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold border border-white/20">
              നൂറുൽ ഉലമ ആഭിമുഖ്യത്തിൽ
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12 relative">
        <div className="max-w-4xl mx-auto">
          {/* Registration Closed Banner */}
          <div className="mb-6 sm:mb-8 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-4 sm:p-6 md:p-8 text-white transform transition-transform duration-300">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex-shrink-0">
                <AlertCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 leading-tight">
                  രജിസ്ട്രേഷൻ സമയം അവസാനിച്ചു
                </h2>
                <p className="text-red-50 text-sm sm:text-base md:text-lg leading-relaxed">
                  വളണ്ടിയർ സേവന രജിസ്ട്രേഷൻ സമയം 20-10-25 തിങ്കൾ മഗ്രിബിന് മുമ്പായി അവസാനിച്ചു. ഇനി പുതിയ രജിസ്ട്രേഷനുകൾ സ്വീകരിക്കുന്നതല്ല.
                </p>
              </div>
            </div>
          </div>

          {/* Important Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Deadline Card */}
            <div className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-amber-100">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3 text-white">
                  <div className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-lg flex-shrink-0">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold">അവസാന തീയതി</h3>
                </div>
              </div>
              <div className="p-4 sm:p-5 md:p-6">
                <p className="text-2xl sm:text-3xl font-bold text-amber-900 mb-1 sm:mb-2">
                  20-10-25
                </p>
                <p className="text-amber-700 text-base sm:text-lg font-semibold">
                  തിങ്കൾ മഗ്രിബിന് മുമ്പായി
                </p>
                <div className="mt-3 sm:mt-4 flex items-center gap-2 text-amber-600">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">സമയത്തിന് അപേക്ഷിക്കുക</span>
                </div>
              </div>
            </div>

            {/* Important Notes Card */}
            <div className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-blue-100">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3 text-white">
                  <div className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-lg flex-shrink-0">
                    <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold">ശ്രദ്ധിക്കേണ്ടത്</h3>
                </div>
              </div>
              <div className="p-4 sm:p-5 md:p-6">
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm sm:text-base leading-snug">സമ്മേളന നഗരിയിൽ നിർദേശിക്കുന്ന മുഴുവൻ ചുമതലകൾ ഉൾക്കൊള്ളാൻ കഴിയുന്നവർ</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm sm:text-base leading-snug">നഗരിയിൽ മുഴുവൻ ദിവസം സജ്ജമാകാൻ കഴിയുന്നവർ മാത്രം</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm sm:text-base leading-snug">മുകളിൽ പറഞ്ഞ വ്യവസ്ഥകൾ അംഗീകരിക്കുന്നവർ മാത്രം സബ്മിറ്റ് ചെയ്യുക</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Registration Form Card - Disabled */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-300 opacity-60">
            <div className="bg-gradient-to-r from-gray-400 to-gray-500 p-6">
              <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <AlertCircle className="w-7 h-7" />
                </div>
                രജിസ്ട്രേഷൻ ഫോം
              </h3>
              <p className="text-gray-100 mt-2">രജിസ്ട്രേഷൻ സമയം അവസാനിച്ചു</p>
            </div>
            <div className="p-6 md:p-8 bg-gradient-to-b from-gray-50 to-white">
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 md:p-8 text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-red-700 mb-3">
                  രജിസ്ട്രേഷൻ അവസാനിച്ചു
                </h4>
                <p className="text-red-600 text-lg leading-relaxed">
                  അവസാന തീയതി കഴിഞ്ഞതിനാൽ ഇനി പുതിയ രജിസ്ട്രേഷനുകൾ സ്വീകരിക്കുന്നതല്ല.
                </p>
                <p className="text-red-600 text-base mt-4">
                  കൂടുതൽ വിവരങ്ങൾക്ക് നൂറുൽ ഉലമയെ ബന്ധപ്പെടുക.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-4 py-1 bg-white rounded-full shadow-lg border border-gray-200">
              <Award className="w-5 h-5 text-emerald-600" />
              <p className="text-gray-700 font-semibold text-sm">നൂറുൽ ഉലമ | സമസ്ത നൂറാം വാർഷികം</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
