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
        <div className="container mx-auto px-4 py-8 md:py-12 relative">
          <div className="flex items-center justify-center mb-3">
            <Sparkles className="w-8 h-8 text-yellow-300 mr-3 animate-pulse" />
            <Award className="w-10 h-10 text-yellow-300" />
            <Sparkles className="w-8 h-8 text-yellow-300 ml-3 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-3 tracking-tight">
            സമസ്ത നൂറാം വാർഷികം
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-1 w-16 bg-yellow-300 rounded-full"></div>
            <div className="h-1 w-8 bg-yellow-400 rounded-full"></div>
          </div>
          <p className="text-center text-emerald-50 text-xl md:text-2xl font-medium tracking-wide">
            വളണ്ടിയർ സേവന രജിസ്ട്രേഷൻ
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/20">
              നൂറുൽ ഉലമ ആഭിമുഖ്യത്തിൽ
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12 relative">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Banner */}
          <div className="mb-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-2xl p-8 text-white transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Users className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  വളണ്ടിയർ സേവനത്തിന് അപേക്ഷ ക്ഷണിക്കുന്നു
                </h2>
                <p className="text-emerald-50 text-lg leading-relaxed">
                  നൂറുൽ ഉലമയുടെ ആഭിമുഖ്യത്തിൽ സമസ്ത നൂറാം വാർഷികത്തിന് വളണ്ടിയർ സേവനം നൽകാൻ താൽപര്യമുള്ളവർ സെലക്ഷനു അപേക്ഷിക്കുക.
                </p>
              </div>
            </div>
          </div>

          {/* Important Information Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Deadline Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-amber-100">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4">
                <div className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">അവസാന തീയതി</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-3xl font-bold text-amber-900 mb-2">
                  20-10-25
                </p>
                <p className="text-amber-700 text-lg font-semibold">
                  തിങ്കൾ മഗ്രിബിന് മുമ്പായി
                </p>
                <div className="mt-4 flex items-center gap-2 text-amber-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">സമയത്തിന് അപേക്ഷിക്കുക</span>
                </div>
              </div>
            </div>

            {/* Important Notes Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-blue-100">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4">
                <div className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">ശ്രദ്ധിക്കേണ്ടത്</h3>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">സമ്മേളന നഗരിയിൽ നിർദേശിക്കുന്ന മുഴുവൻ ചുമതലകൾ ഉൾക്കൊള്ളാൻ കഴിയുന്നവർ</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">നഗരിയിൽ മുഴുവൻ ദിവസം സജ്ജമാകാൻ കഴിയുന്നവർ മാത്രം</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">മുകളിൽ പറഞ്ഞ വ്യവസ്ഥകൾ അംഗീകരിക്കുന്നവർ മാത്രം സബ്മിറ്റ് ചെയ്യുക</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Registration Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-6">
              <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <Users className="w-7 h-7" />
                </div>
                രജിസ്ട്രേഷൻ ഫോം
              </h3>
              <p className="text-teal-50 mt-2">എല്ലാ വിവരങ്ങളും ശ്രദ്ധാപൂർവ്വം പൂരിപ്പിക്കുക</p>
            </div>
            <div className="p-6 md:p-8 bg-gradient-to-b from-gray-50 to-white">
              <RegistrationForm />
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
