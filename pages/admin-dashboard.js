// pages/admin-dashboard.js
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import {
  FiMenu, FiGrid, FiUsers, FiFileText, FiUser, FiLogOut, FiChevronDown, FiSave,
  FiChevronRight, FiBook, FiAward, FiHome, FiCalendar, FiClock, FiSettings,
  FiBell, FiSearch, FiBarChart, FiTrendingUp, FiUserCheck, FiPlus, FiEdit, FiTrash2,FiUserPlus ,
  FiRefreshCw 
} from "react-icons/fi";
import HigherEdForm from '../components/Higher-ed/higher-ed-form';
import BasicEdForm from '../components/Basic-ed/BasicEdForm';
import SeniorHighSchoolForm from '../components/Senior-high/SeniorHighForm';
import AppointmentDetailsModal from '../components/AppoinmentDetailsModal';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPdsDropdownOpen, setIsPdsDropdownOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availabilityHours, setAvailabilityHours] = useState({
    start: "08:00",
    end: "17:00"
  });
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({});

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName') || 'Dr. Maria';
    const storedLastName = localStorage.getItem('lastName') || 'Santos';
    setFirstName(storedFirstName);
    setLastName(storedLastName);
  }, []);


  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', { method: 'POST' });
      if (res.ok) {
        localStorage.removeItem('usertype');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('userId');
        router.push('/loginpage');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/loginpage');
    }
  };

const [stats, setStats] = useState({
  totalStudents: { value: 0, change: "+0%" },
  pendingForms: { value: 0, change: "+0%" },
  completedSessions: { value: 0, change: "+0%" },
  thisMonth: { value: 0, change: "+0%" }
});

  const fullname = `${firstName} ${lastName}`;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`bg-white shadow-xl transition-all duration-300 ${isSidebarOpen ? "w-72" : "w-20"} h-screen sticky top-0 flex flex-col border-r border-gray-100`}>
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <div className="flex items-center space-x-3">
                <img 
                  src="/images/guidancelogo.png" 
                  alt="Guidance Logo"
                  className="w-10 h-10 rounded-xl object-contain"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Guidance</h1>
                  <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
              </div>
            )}
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FiMenu size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem icon={FiGrid} label="Dashboard" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={FiUsers} label="Manage Users" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={FiCalendar} label="Appointments" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          <div>
            <div 
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 ${activeTab.startsWith("PDS") ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm" : "hover:bg-gray-50"}`}
              onClick={() => setIsPdsDropdownOpen(!isPdsDropdownOpen)}
            >
              <div className="flex items-center space-x-3">
                <FiUser size={20} className="flex-shrink-0 text-gray-700" />
                {isSidebarOpen && <span className="font-medium text-gray-700">Personal Data Sheet</span>}
              </div>
              {isSidebarOpen && (
                <div className={`transition-transform duration-200 ${isPdsDropdownOpen ? "rotate-180" : ""}`}>
                  <FiChevronDown size={16} />
                </div>
              )}
            </div>
            
            {isSidebarOpen && isPdsDropdownOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l-2 border-gray-100 pl-4">
                <SidebarSubItem icon={FiAward} label="Higher Education" activeTab={activeTab} setActiveTab={() => setActiveTab("PDS - Higher Education")}/>
                <SidebarSubItem icon={FiBook} label="Senior High School" activeTab={activeTab} setActiveTab={() => setActiveTab("PDS - Senior High School")}/>
                <SidebarSubItem 
                  icon={FiHome} 
                  label="Basic Education" 
                  activeTab={activeTab} 
                  setActiveTab={() => setActiveTab("PDS - Basic Education")}
                />
              </div>
            )}
          </div>
          
          <SidebarItem 
            icon={FiBarChart} 
            label="Reports" 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isSidebarOpen={isSidebarOpen} 
          />
          
          <SidebarItem 
            icon={FiFileText} 
            label="Logs" 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isSidebarOpen={isSidebarOpen} 
          />

          <SidebarItem 
            icon={FiLogOut} 
            label="Logout" 
            activeTab={activeTab} 
            setActiveTab={handleLogout} 
            isSidebarOpen={isSidebarOpen} 
          />
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm border-b border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{activeTab}</h2>
              <p className="text-gray-500 mt-1">Welcome back, {lastName}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <FiBell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <div 
                className="relative" 
                onMouseEnter={() => setIsDropdownOpen(true)} 
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className="flex items-center space-x-2">
                  {isSidebarOpen && <span className="font-medium text-gray-700">{fullname}</span>}
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-xs">
                      {fullname.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                    <div className="py-2">
                      <button 
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2" 
                        onClick={handleLogout}
                      >
                        <FiLogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          {activeTab === "Dashboard" && <Dashboard stats={stats} onStatsUpdate={setStats} />}
          {activeTab === 'Appointments' && <Appointments />}
          {activeTab === "Manage Users" && <ManageUsers />}
          {activeTab === "Reports" && <Reports />}
          {activeTab === "Logs" && <Logs />}
          {activeTab.startsWith("PDS") && (
            <PersonalDataSheet type={activeTab.replace("PDS - ", "")} />
          )}
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, activeTab, setActiveTab, isSidebarOpen }) {
  const isActive = activeTab === label;
  return (
    <button
      className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
        isActive 
          ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm" 
          : "hover:bg-gray-50 text-gray-700"
      }`}
      onClick={() => setActiveTab(label)}
    >
      <Icon size={20} className="flex-shrink-0" />
      {isSidebarOpen && <span className="font-medium">{label}</span>}
    </button>
  );
}

function SidebarSubItem({ icon: Icon, label, activeTab, setActiveTab }) {
  const isActive = activeTab.includes(label);
  return (
    <button
      className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 text-sm ${
        isActive 
          ? "bg-blue-50 text-blue-600" 
          : "hover:bg-gray-50 text-gray-600"
      }`}
      onClick={setActiveTab}
    >
      <Icon size={16} className="flex-shrink-0" />
      <span>{label}</span>
    </button>
  );
}

function Dashboard({ stats, onStatsUpdate }) {
  const [realStats, setRealStats] = useState(stats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/dashboard-stats', {
        headers: {
          'x-usertype': localStorage.getItem('usertype') || '',
          'x-user-id': localStorage.getItem('userId') || '',
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        setRealStats(data);
        if (onStatsUpdate) onStatsUpdate(data);
      } else {
        setError('Failed to fetch dashboard data');
      }
    } catch (error) {
      setError('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        <span className={`text-sm font-medium ${
          change.includes('+') ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </span>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-1">
          {isLoading ? '...' : value.toLocaleString()}
        </h3>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-sm">!</span>
            </div>
            <p className="text-red-700">{error}</p>
          </div>
          <button
            onClick={fetchDashboardStats}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={realStats.totalStudents?.value || 0}
          change={realStats.totalStudents?.change || "+0%"}
          icon={FiUsers}
          color="bg-blue-500"
        />
        <StatCard
          title="Pending Forms"
          value={realStats.pendingForms?.value || 0}
          change={realStats.pendingForms?.change || "+0%"}
          icon={FiFileText}
          color="bg-orange-500"
        />
        <StatCard
          title="Completed Sessions"
          value={realStats.completedSessions?.value || 0}
          change={realStats.completedSessions?.change || "+0%"}
          icon={FiUserCheck}
          color="bg-green-500"
        />
        <StatCard
          title="This Month"
          value={realStats.thisMonth?.value || 0}
          change={realStats.thisMonth?.change || "+0%"}
          icon={FiTrendingUp}
          color="bg-purple-500"
        />
      </div>
    </div>
  );
}

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [appointments, statusFilter, dateFilter, searchQuery]);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/advocate/appointments/view');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('Failed to fetch appointments. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const filterAppointments = () => {
    let filtered = appointments;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    if (dateFilter) {
      filtered = filtered.filter(app => app.date === dateFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app => 
        app.name?.toLowerCase().includes(query) ||
        (app.email && app.email.toLowerCase().includes(query)) ||
        app.purpose?.toLowerCase().includes(query) ||
        (app.grade_section && app.grade_section.toLowerCase().includes(query))
      );
    }

    setFilteredAppointments(filtered);
  };

  const updateAppointmentStatus = async (appointmentId, newStatus, counselorNotes = null, counselorName = null) => {
    try {
      const response = await fetch('/api/advocate/appointments/manage', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          appointmentId, 
          status: newStatus,
          counselor_notes: counselorNotes,
          counselor: counselorName
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchAppointments();
      if (showDetailsModal) {
        setShowDetailsModal(false);
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
      setError('Failed to update appointment. Please try again.');
    }
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-700 bg-green-50';
      case 'pending': return 'text-amber-700 bg-amber-50';
      case 'cancelled': return 'text-red-700 bg-red-50';
      case 'completed': return 'text-blue-700 bg-blue-50';
      default: return 'text-gray-700 bg-gray-50';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <span className="text-gray-600 text-sm">Loading appointments...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <div className="text-red-500 text-3xl mb-4">⚠️</div>
            <h4 className="text-lg font-medium text-gray-800 mb-2">Error Loading Appointments</h4>
            <p className="text-gray-600 text-sm mb-4">{error}</p>
            <button
              onClick={fetchAppointments}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Appointments</h2>
            <p className="text-sm text-gray-500 mt-1">
              {appointments.length} total • {appointments.filter(app => app.status === 'pending').length} pending
            </p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search appointments..."
                className="w-full sm:w-64 pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>

            {/* Date Filter */}
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-300 text-4xl mb-4">📅</div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              {appointments.length === 0 ? 'No appointments yet' : 'No appointments found'}
            </h3>
            <p className="text-gray-500 text-sm">
              {appointments.length === 0
                ? 'Student appointments will appear here once scheduled.'
                : 'Try adjusting your search or filters.'
              }
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{appointment.name}</div>
                      <div className="text-xs text-gray-500">{appointment.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="text-sm text-gray-900">{formatDate(appointment.date)}</div>
                      <div className="text-xs text-gray-500">{appointment.time}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">{appointment.purpose}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">{appointment.grade_section}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(appointment)}
                        className="text-xs px-3 py-1 text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        View
                      </button>

                      {appointment.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                            className="text-xs px-3 py-1 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                            className="text-xs px-3 py-1 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {appointment.status === 'confirmed' && (
                        <button
                          onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                          className="text-xs px-3 py-1 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      {filteredAppointments.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              Showing {filteredAppointments.length} of {appointments.length} appointments
            </span>
            <button
              onClick={fetchAppointments}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <FiRefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      )}

      {/* Appointment Details Modal */}
      {showDetailsModal && selectedAppointment && (
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          onClose={() => setShowDetailsModal(false)}
          onStatusUpdate={updateAppointmentStatus}
        />
      )}
    </div>
  );
}


function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    usertype: 'student',
    firstName: '',
    lastName: '',
    status: 'active',
  });

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, roleFilter, statusFilter, searchQuery]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/admin/users', {
        headers: { 
          'x-usertype': localStorage.getItem('usertype') || '',
          'x-user-id': localStorage.getItem('userId') || '',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.usertype === roleFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(user => 
        user.first_name?.toLowerCase().includes(query) ||
        user.last_name?.toLowerCase().includes(query) ||
        user.username?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query)
      );
    }

    setFilteredUsers(filtered);
  };

  const validateForm = () => {
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
      setError('Username must be 3-20 characters (letters, numbers, underscores)');
      return false;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }
    if (formData.password && formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (!/^[a-zA-Z\s-]{1,100}$/.test(formData.firstName)) {
      setError('First name must be 1-100 characters (letters, spaces, or hyphens)');
      return false;
    }
    if (!/^[a-zA-Z\s-]{1,100}$/.test(formData.lastName)) {
      setError('Last name must be 1-100 characters (letters, spaces, or hyphens)');
      return false;
    }
    if (!['admin', 'student', 'guidance_advocate'].includes(formData.usertype)) {
      setError('Invalid user type');
      return false;
    }
    if (!['active', 'inactive'].includes(formData.status)) {
      setError('Invalid status');
      return false;
    }
    setError('');
    return true;
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setError('');

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-usertype': localStorage.getItem('usertype') || '',
          'x-user-id': localStorage.getItem('userId') || '',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setUsers([...users, data.user]);
      setShowCreateModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Failed to create user. Please try again.');
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setError('');

    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-usertype': localStorage.getItem('usertype') || '',
          'x-user-id': localStorage.getItem('userId') || '',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setUsers(users.map(user => (user.id === selectedUser.id ? data.user : user)));
      setShowEditModal(false);
      setSelectedUser(null);
      resetForm();
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user. Please try again.');
    }
  };

  const handleDeleteUser = async (id) => {
    const currentUserId = localStorage.getItem('userId');
    if (id === parseInt(currentUserId)) {
      setError('Cannot delete your own account');
      return;
    }
    if (!confirm('Are you sure you want to delete this user?')) return;
    setError('');

    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { 
          'x-usertype': localStorage.getItem('usertype') || '',
          'x-user-id': localStorage.getItem('userId') || '',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user. Please try again.');
    }
  };

  const openCreateModal = () => {
    resetForm();
    setShowCreateModal(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: '',
      usertype: user.usertype,
      firstName: user.first_name,
      lastName: user.last_name,
      status: user.status,
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      usertype: 'student',
      firstName: '',
      lastName: '',
      status: 'active',
    });
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-700 bg-green-50';
      case 'inactive': return 'text-red-700 bg-red-50';
      default: return 'text-gray-700 bg-gray-50';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'text-purple-700 bg-purple-50';
      case 'guidance_advocate': return 'text-blue-700 bg-blue-50';
      case 'student': return 'text-amber-700 bg-amber-50';
      default: return 'text-gray-700 bg-gray-50';
    }
  };

  const formatRole = (role) => {
    switch (role) {
      case 'guidance_advocate': return 'Guidance Advocate';
      default: return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <span className="text-gray-600 text-sm">Loading users...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <div className="text-red-500 text-3xl mb-4">⚠️</div>
            <h4 className="text-lg font-medium text-gray-800 mb-2">Error Loading Users</h4>
            <p className="text-gray-600 text-sm mb-4">{error}</p>
            <button
              onClick={fetchUsers}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
            <p className="text-sm text-gray-500 mt-1">
              {users.length} total • {users.filter(user => user.status === 'active').length} active
            </p>
          </div>
          
          {/* Filters and Add Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="w-full sm:w-64 pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="guidance_advocate">Guidance Advocate</option>
              <option value="student">Student</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            {/* Add User Button */}
            <button
              onClick={openCreateModal}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FiUserPlus className="w-4 h-4" />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-300 text-4xl mb-4">👥</div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              {users.length === 0 ? 'No users yet' : 'No users found'}
            </h3>
            <p className="text-gray-500 text-sm">
              {users.length === 0
                ? 'Users will appear here once created.'
                : 'Try adjusting your search or filters.'
              }
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.first_name} {user.last_name}
                      </div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">{user.username}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.usertype)}`}>
                      {formatRole(user.usertype)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="text-xs px-3 py-1 text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-xs px-3 py-1 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      {filteredUsers.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              Showing {filteredUsers.length} of {users.length} users
            </span>
            <button
              onClick={fetchUsers}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <FiRefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900">Add New User</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                      name="usertype"
                      value={formData.usertype}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                      <option value="guidance_advocate">Guidance Advocate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900">Edit User</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleEditUser} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password <span className="text-xs text-gray-500">(leave blank to keep unchanged)</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="New password"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                      name="usertype"
                      value={formData.usertype}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                      <option value="guidance_advocate">Guidance Advocate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Reports() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Reports</h3>
      <p className="text-gray-600">Reporting functionality will be implemented here.</p>
    </div>
  );
}

function Logs() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Logs</h3>
      <p className="text-gray-600">System logs will be displayed here.</p>
    </div>
  );
}

function PersonalDataSheet({ type }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Personal Data Sheet - {type}</h3>
      </div>

      {type === "Basic Education" && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <BasicEdForm />
        </div>
      )}

      {type === "Senior High School" && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <SeniorHighSchoolForm />
        </div>
      )}

      {type === "Higher Education" && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <HigherEdForm />
        </div>
      )}
    </div>
  );
}
