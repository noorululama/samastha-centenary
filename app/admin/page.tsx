'use client';

import { useState, useEffect } from 'react';
import { Users, RefreshCw, Calendar, Phone, Droplet } from 'lucide-react';

interface Volunteer {
  _id: string;
  name: string;
  address: string;
  darsInstitution: string;
  bloodGroup: string;
  phoneNumber: string;
  whatsappNumber: string;
  skssfMembershipNumber: string;
  previousExperience: string;
  createdAt: string;
}

export default function AdminPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchVolunteers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/volunteers');
      const data = await response.json();
      
      if (data.success) {
        setVolunteers(data.data);
      } else {
        setError('Failed to load volunteers');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-emerald-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-emerald-100 mt-1">Volunteer Registration Management</p>
            </div>
            <button
              onClick={fetchVolunteers}
              disabled={loading}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-800 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-emerald-600" />
            <div>
              <p className="text-sm text-gray-600">Total Registrations</p>
              <p className="text-3xl font-bold text-gray-800">{volunteers.length}</p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Volunteers Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">Registered Volunteers</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
            </div>
          ) : volunteers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No volunteers registered yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registered
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {volunteers.map((volunteer, index) => (
                    <tr key={volunteer._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{volunteer.name}</div>
                        <div className="text-sm text-gray-500">{volunteer.address}</div>
                        <div className="text-sm text-gray-500">{volunteer.darsInstitution}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-900 mb-1">
                          <Phone className="w-4 h-4 text-gray-400" />
                          {volunteer.phoneNumber}
                        </div>
                        <div className="text-sm text-gray-500">WA: {volunteer.whatsappNumber}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-900 mb-1">
                          <Droplet className="w-4 h-4 text-red-500" />
                          {volunteer.bloodGroup}
                        </div>
                        <div className="text-sm text-gray-500">SKSSF: {volunteer.skssfMembershipNumber}</div>
                        {volunteer.previousExperience && (
                          <div className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Experience:</span> {volunteer.previousExperience}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {formatDate(volunteer.createdAt)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
