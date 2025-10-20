'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  RefreshCw, 
  Calendar, 
  Phone, 
  Droplet, 
  Download, 
  LogOut, 
  Search,
  Filter,
  Eye,
  FileText,
  BarChart3,
  X,
  TrendingUp,
  Edit,
  Trash2,
  Save,
  XCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';

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

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

interface Stats {
  total: number;
  today: number;
  thisWeek: number;
  bloodGroups: Record<string, number>;
}

export default function DashboardPage() {
  const router = useRouter();
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Volunteer>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
    hasMore: false,
  });
  const [stats, setStats] = useState<Stats>({
    total: 0,
    today: 0,
    thisWeek: 0,
    bloodGroups: {}
  });

  const fetchVolunteers = async (page: number = currentPage, limit: number = itemsPerPage) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/volunteers?page=${page}&limit=${limit}`);
      const data = await response.json();
      
      if (data.success) {
        setVolunteers(data.data);
        setFilteredVolunteers(data.data);
        setPagination(data.pagination);
        
        // Fetch all volunteers for stats (you may want to add a separate stats endpoint)
        const allResponse = await fetch('/api/volunteers?page=1&limit=10000');
        const allData = await allResponse.json();
        if (allData.success) {
          calculateStats(allData.data);
        }
      } else {
        setError('Failed to load volunteers');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: Volunteer[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const todayCount = data.filter(v => new Date(v.createdAt) >= today).length;
    const weekCount = data.filter(v => new Date(v.createdAt) >= weekAgo).length;

    const bloodGroups: Record<string, number> = {};
    data.forEach(v => {
      bloodGroups[v.bloodGroup] = (bloodGroups[v.bloodGroup] || 0) + 1;
    });

    setStats({
      total: data.length,
      today: todayCount,
      thisWeek: weekCount,
      bloodGroups
    });
  };

  useEffect(() => {
    fetchVolunteers(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    let filtered = volunteers;

    if (searchTerm) {
      filtered = filtered.filter(v =>
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.phoneNumber.includes(searchTerm) ||
        v.skssfMembershipNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (bloodGroupFilter) {
      filtered = filtered.filter(v => v.bloodGroup === bloodGroupFilter);
    }

    setFilteredVolunteers(filtered);
  }, [searchTerm, bloodGroupFilter, volunteers]);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await fetch('/api/volunteers/export');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `volunteers-${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert('Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleEdit = (volunteer: Volunteer) => {
    setEditingVolunteer(volunteer);
    setFormData({ ...volunteer });
  };

  const handleSave = async () => {
    if (!editingVolunteer || !formData) return;

    setIsSaving(true);
    try {
      const response = await fetch(`/api/volunteers/${editingVolunteer._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Update local state
        setVolunteers(volunteers.map(v => 
          v._id === editingVolunteer._id ? result.data : v
        ));
        setEditingVolunteer(null);
        setFormData({});
        alert('Volunteer updated successfully!');
      } else {
        alert(result.message || 'Failed to update volunteer');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!deleteConfirm) {
      setDeleteConfirm(id);
      return;
    }

    if (deleteConfirm !== id) return;

    try {
      const response = await fetch(`/api/volunteers/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        setVolunteers(volunteers.filter(v => v._id !== id));
        setDeleteConfirm(null);
        alert('Volunteer deleted successfully!');
      } else {
        alert(result.message || 'Failed to delete volunteer');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingVolunteer(null);
    setFormData({});
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleItemsPerPageChange = (newLimit: number) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-emerald-100 mt-1">സമസ്ത നൂറാം വാർഷികം - Volunteer Management</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => fetchVolunteers(currentPage, itemsPerPage)}
                disabled={loading}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards - Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm mb-1">Total Registrations</p>
                <p className="text-4xl font-bold">{stats.total}</p>
                <p className="text-emerald-100 text-xs mt-1">All time</p>
              </div>
              <Users className="w-16 h-16 text-white opacity-30" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm mb-1">Today's Registrations</p>
                <p className="text-4xl font-bold">{stats.today}</p>
                <p className="text-blue-100 text-xs mt-1">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
              </div>
              <TrendingUp className="w-16 h-16 text-white opacity-30" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm mb-1">This Week</p>
                <p className="text-4xl font-bold">{stats.thisWeek}</p>
                <p className="text-purple-100 text-xs mt-1">Last 7 days</p>
              </div>
              <Calendar className="w-16 h-16 text-white opacity-30" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm mb-1">Active Blood Groups</p>
                <p className="text-4xl font-bold">{Object.keys(stats.bloodGroups).length}</p>
                <p className="text-orange-100 text-xs mt-1">out of 8 types</p>
              </div>
              <BarChart3 className="w-16 h-16 text-white opacity-30" />
            </div>
          </div>
        </div>

        {/* Blood Group Distribution Cards */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Droplet className="w-5 h-5 text-red-500" />
            Blood Group Distribution
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {bloodGroups.map((bg) => {
              const count = stats.bloodGroups[bg] || 0;
              const percentage = stats.total > 0 ? ((count / stats.total) * 100).toFixed(1) : '0';
              return (
                <div
                  key={bg}
                  className="bg-white rounded-lg shadow-md p-4 border-t-4 border-red-500 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setBloodGroupFilter(bloodGroupFilter === bg ? '' : bg)}
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Droplet className="w-5 h-5 text-red-500 mr-1" />
                      <span className="text-xl font-bold text-gray-800">{bg}</span>
                    </div>
                    <p className="text-2xl font-bold text-red-600">{count}</p>
                    <p className="text-xs text-gray-500 mt-1">{percentage}%</p>
                  </div>
                  {bloodGroupFilter === bg && (
                    <div className="mt-2 text-center">
                      <span className="inline-block px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                        Filtered
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, phone, or SKSSF number..."
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Blood Group Filter */}
            <div className="w-full md:w-48">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={bloodGroupFilter}
                  onChange={(e) => setBloodGroupFilter(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white appearance-none"
                >
                  <option value="">All Blood Groups</option>
                  {bloodGroups.map(bg => (
                    <option key={bg} value={bg}>{bg} ({stats.bloodGroups[bg] || 0})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Export Button */}
            <button
              onClick={handleExport}
              disabled={isExporting || volunteers.length === 0}
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
            >
              {isExporting ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Export CSV
                </>
              )}
            </button>
          </div>

          {/* Active Filters */}
          {(searchTerm || bloodGroupFilter) && (
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                  Search: {searchTerm}
                  <button onClick={() => setSearchTerm('')} className="hover:text-emerald-900">
                    <X className="w-4 h-4" />
                  </button>
                </span>
              )}
              {bloodGroupFilter && (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Blood: {bloodGroupFilter}
                  <button onClick={() => setBloodGroupFilter('')} className="hover:text-blue-900">
                    <X className="w-4 h-4" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Volunteers Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Registered Volunteers
              </h2>
              <span className="text-sm text-gray-600">
                Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, pagination.total)} of {pagination.total}
              </span>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
            </div>
          ) : filteredVolunteers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {volunteers.length === 0 ? 'No volunteers registered yet' : 'No volunteers match your filters'}
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
                      Name & Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registered
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVolunteers.map((volunteer, index) => (
                    <tr key={volunteer._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {((currentPage - 1) * itemsPerPage) + index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{volunteer.name}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{volunteer.address}</div>
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
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                            {volunteer.bloodGroup}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">SKSSF: {volunteer.skssfMembershipNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <div>
                            {formatDate(volunteer.createdAt)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedVolunteer(volunteer)}
                            className="text-emerald-600 hover:text-emerald-900 flex items-center gap-1 px-2 py-1 rounded hover:bg-emerald-50 transition-colors"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(volunteer)}
                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                            title="Edit volunteer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(volunteer._id)}
                            className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                              deleteConfirm === volunteer._id
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'text-red-600 hover:text-red-900 hover:bg-red-50'
                            }`}
                            title={deleteConfirm === volunteer._id ? 'Click again to confirm' : 'Delete volunteer'}
                          >
                            <Trash2 className="w-4 h-4" />
                            {deleteConfirm === volunteer._id && <span className="text-xs">Confirm?</span>}
                          </button>
                          {deleteConfirm === volunteer._id && (
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="text-gray-600 hover:text-gray-900 flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-50 transition-colors"
                              title="Cancel delete"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Pagination Controls */}
          {!loading && filteredVolunteers.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Items per page selector */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Show:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                    className="text-black px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white text-sm"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span className="text-sm text-gray-600">per page</span>
                </div>

                {/* Page info and navigation */}
                <div className="flex items-center gap-2">
                  {/* Page info */}
                  <span className="text-sm text-gray-600 mr-2">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>

                  {/* First page button */}
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="text-black p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="First page"
                  >
                    <ChevronsLeft className="text-black w-4 h-4" />
                  </button>

                  {/* Previous page button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="text-black p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Previous page"
                  >
                    <ChevronLeft className="text-black w-4 h-4" />
                  </button>

                  {/* Page numbers */}
                  <div className="text-black hidden sm:flex items-center gap-1">
                    {(() => {
                      const pages = [];
                      const maxVisiblePages = 5;
                      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                      let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);
                      
                      if (endPage - startPage < maxVisiblePages - 1) {
                        startPage = Math.max(1, endPage - maxVisiblePages + 1);
                      }

                      for (let i = startPage; i <= endPage; i++) {
                        pages.push(
                          <button
                            key={i}
                            onClick={() => handlePageChange(i)}
                            className={`px-3 py-1.5 rounded-lg border transition-colors ${
                              i === currentPage
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'border-gray-300 hover:bg-gray-100'
                            }`}
                          >
                            {i}
                          </button>
                        );
                      }
                      return pages;
                    })()}
                  </div>

                  {/* Next page button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages}
                    className="text-black p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Last page button */}
                  <button
                    onClick={() => handlePageChange(pagination.totalPages)}
                    disabled={currentPage === pagination.totalPages}
                    className="text-black p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Last page"
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedVolunteer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedVolunteer(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-2xl font-bold">Volunteer Details</h3>
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Name</label>
                  <p className="text-lg text-gray-900">{selectedVolunteer.name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-gray-600">Blood Group</label>
                  <p className="text-lg">
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                      {selectedVolunteer.bloodGroup}
                    </span>
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-600">Address</label>
                  <p className="text-gray-900">{selectedVolunteer.address}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Dars/Institution</label>
                  <p className="text-gray-900">{selectedVolunteer.darsInstitution}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">SKSSF Membership</label>
                  <p className="text-gray-900">{selectedVolunteer.skssfMembershipNumber}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Phone Number</label>
                  <p className="text-gray-900">{selectedVolunteer.phoneNumber}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">WhatsApp Number</label>
                  <p className="text-gray-900">{selectedVolunteer.whatsappNumber}</p>
                </div>

                {selectedVolunteer.previousExperience && (
                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-gray-600">Previous Experience</label>
                    <p className="text-gray-900">{selectedVolunteer.previousExperience}</p>
                  </div>
                )}

                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-600">Registered On</label>
                  <p className="text-gray-900">{formatDate(selectedVolunteer.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingVolunteer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={(e) => {
          if (e.target === e.currentTarget) {
            if (confirm('Are you sure you want to cancel editing? Changes will be lost.')) {
              handleCancelEdit();
            }
          }
        }}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-2xl font-bold">Edit Volunteer</h3>
              <button
                onClick={handleCancelEdit}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                disabled={isSaving}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                  <textarea
                    value={formData.address || ''}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    rows={3}
                    required
                  />
                </div>

                {/* Dars/Institution */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Dars/Institution *</label>
                  <input
                    type="text"
                    value={formData.darsInstitution || ''}
                    onChange={(e) => setFormData({ ...formData, darsInstitution: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                {/* Blood Group */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Group *</label>
                  <select
                    value={formData.bloodGroup || ''}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                    required
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phoneNumber || ''}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    maxLength={10}
                    required
                  />
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number *</label>
                  <input
                    type="tel"
                    value={formData.whatsappNumber || ''}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    maxLength={10}
                    required
                  />
                </div>

                {/* SKSSF Membership */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">SKSSF Membership Number *</label>
                  <input
                    type="text"
                    value={formData.skssfMembershipNumber || ''}
                    onChange={(e) => setFormData({ ...formData, skssfMembershipNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                {/* Previous Experience */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Previous Experience</label>
                  <textarea
                    value={formData.previousExperience || ''}
                    onChange={(e) => setFormData({ ...formData, previousExperience: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    rows={3}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 font-semibold text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
