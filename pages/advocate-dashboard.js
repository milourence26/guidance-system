import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Search,Users, X, BookOpen, 
  Calendar, 
  Clock, 
  TrendingUp,
  RefreshCw,GraduationCap } from 'lucide-react';
import {
  FiMenu, FiGrid, FiUsers, FiFileText, FiLogOut, FiChevronDown, FiBell, FiUserCheck, FiTrendingUp,
  FiSearch, FiX, FiCalendar, FiBarChart, FiFilter,FiClock ,FiBook, FiUser,FiEye,FiCheck,FiXCircle,FiRefreshCw,FiCheckCircle
} from 'react-icons/fi';
import StudentPDSViewModal from '../components/StudentPDSViewModal';
import AppointmentDetailsModal from '../components/AppoinmentDetailsModal';

export default function GuidanceAdvocateDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPdsDropdownOpen, setIsPdsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showPdsModal, setShowPdsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName') || 'Advocate';
    const storedLastName = localStorage.getItem('lastName') || 'User';
    setFirstName(storedFirstName);
    setLastName(storedLastName);

    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
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

  const fetchStudents = async (educationLevel) => {
    setIsLoading(true);
    setError(null);
    setSearchQuery('');
    try {
      const response = await fetch(`/api/students/by-education-level?level=${educationLevel}`);
      if (!response.ok) throw new Error('Failed to fetch students');
      const data = await response.json();
      console.log('Fetched students for', educationLevel, ':', data);
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEducationLevelSelect = (level) => {
    setSelectedEducationLevel(level);
    setActiveTab(`PDS - ${level}`);
    fetchStudents(level);
  };

  const handleViewPds = (student) => {
    console.log('Selected student for PDS:', student);
    setSelectedStudent(student);
    setShowPdsModal(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const filteredStudents = useMemo(() => {
    if (!searchQuery) return students;
    const query = searchQuery.toLowerCase();
    return students.filter(
      (student) =>
        student.first_name?.toLowerCase().includes(query) ||
        student.last_name?.toLowerCase().includes(query)
    );
  }, [students, searchQuery]);

  const stats = [
    { title: 'Total Students', value: students.length, change: '+0%', icon: FiUsers, color: 'bg-blue-500' },
    { title: 'Basic Education', value: students.filter(s => s.education_level === 'Basic Education').length, change: '+0%', icon: FiFileText, color: 'bg-orange-500' },
    { title: 'Senior High', value: students.filter(s => s.education_level === 'Senior High').length, change: '+0%', icon: FiUserCheck, color: 'bg-green-500' },
    { title: 'Higher Education', value: students.filter(s => s.education_level === 'Higher Education').length, change: '+0%', icon: FiTrendingUp, color: 'bg-purple-500' },
  ];

  const fullname = `${firstName} ${lastName}`;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`bg-white shadow-xl transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-20'} h-screen sticky top-0 flex flex-col border-r border-gray-100`}>
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
                  <p className="text-xs text-gray-500">Advocate Portal</p>
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
          <div>
            <div
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 ${activeTab.startsWith('PDS') ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm' : 'hover:bg-gray-50'}`}
              onClick={() => setIsPdsDropdownOpen(!isPdsDropdownOpen)}
            >
              <div className="flex items-center space-x-3">
                <FiFileText size={20} className="flex-shrink-0 text-gray-700" />
                {isSidebarOpen && <span className="font-medium text-gray-700">Personal Data Sheet</span>}
              </div>
              {isSidebarOpen && (
                <div className={`transition-transform duration-200 ${isPdsDropdownOpen ? 'rotate-180' : ''}`}>
                  <FiChevronDown size={16} />
                </div>
              )}
            </div>
            {isSidebarOpen && isPdsDropdownOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l-2 border-gray-100 pl-4">
                <SidebarSubItem icon={FiFileText} label="Basic Education" activeTab={activeTab} setActiveTab={() => handleEducationLevelSelect('Basic Education')} />
                <SidebarSubItem icon={FiFileText} label="Senior High" activeTab={activeTab} setActiveTab={() => handleEducationLevelSelect('Senior High')} />
                <SidebarSubItem icon={FiFileText} label="Higher Education" activeTab={activeTab} setActiveTab={() => handleEducationLevelSelect('Higher Education')} />
              </div>
            )}
          </div>
          <SidebarItem icon={FiCalendar} label="Appointments" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={FiBarChart} label="Reports" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={FiLogOut} label="Logout" activeTab={activeTab} setActiveTab={handleLogout} isSidebarOpen={isSidebarOpen} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm border-b border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{activeTab.startsWith('PDS') ? `${selectedEducationLevel} Students` : activeTab}</h2>
              <p className="text-gray-500 mt-1">Welcome back, {lastName}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <FiBell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div
                className="relative"
                onMouseEnter={() => setIsProfileDropdownOpen(true)}
                onMouseLeave={() => setIsProfileDropdownOpen(false)}
              >
                <button className="flex items-center space-x-2">
                  {isSidebarOpen && <span className="font-medium text-gray-700">{fullname}</span>}
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-xs">
                      {fullname.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </button>
                {isProfileDropdownOpen && (
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
          {activeTab === 'Dashboard' && <Dashboard />}
          {activeTab.startsWith('PDS') && (
            <PersonalDataSheet
              students={filteredStudents}
              isLoading={isLoading}
              error={error}
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
              clearSearch={clearSearch}
              handleViewPds={handleViewPds}
              selectedEducationLevel={selectedEducationLevel}
            />
          )}
          {activeTab === 'Appointments' && <Appointments />}
          {activeTab === 'Reports' && <Reports />}
        </div>

        {showPdsModal && selectedStudent && (
          <StudentPDSViewModal
            showModal={showPdsModal}
            setShowModal={setShowPdsModal}
            studentData={selectedStudent}
            educationLevel={selectedEducationLevel}
          />
        )}
      </main>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, activeTab, setActiveTab, isSidebarOpen }) {
  const isActive = activeTab === label || (label === 'Personal Data Sheet' && activeTab.startsWith('PDS'));
  return (
    <button
      className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${isActive
          ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm'
          : 'hover:bg-gray-50 text-gray-700'
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
      className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 text-sm ${isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-600'
        }`}
      onClick={setActiveTab}
    >
      <Icon size={16} className="flex-shrink-0" />
      <span>{label}</span>
    </button>
  );
}

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    studentsByLevel: {
      'Basic Education': 0,
      'Senior High': 0,
      'Higher Education': 0
    },
    pendingAppointments: 0,
    todayAppointments: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [statsResponse, activityResponse] = await Promise.all([
        fetch('/api/advocate/dashboard-stats'),
        fetch('/api/advocate/recent-activity')
      ]);

      if (!statsResponse.ok) throw new Error('Failed to fetch stats');
      if (!activityResponse.ok) throw new Error('Failed to fetch activities');

      const [statsData, activityData] = await Promise.all([
        statsResponse.json(),
        activityResponse.json()
      ]);

      setStats(statsData);
      setRecentActivities(activityData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const dashboardStats = [
    { 
      title: 'Total Students', 
      value: stats.totalStudents, 
      icon: Users, 
      color: 'text-blue-600 bg-blue-50' 
    },
    { 
      title: 'Basic Education', 
      value: stats.studentsByLevel['Basic Education'], 
      icon: BookOpen, 
      color: 'text-green-600 bg-green-50' 
    },
    { 
      title: 'Senior High', 
      value: stats.studentsByLevel['Senior High'], 
      icon: GraduationCap, 
      color: 'text-purple-600 bg-purple-50' 
    },
    { 
      title: 'Higher Education', 
      value: stats.studentsByLevel['Higher Education'], 
      icon: TrendingUp, 
      color: 'text-indigo-600 bg-indigo-50' 
    },
    { 
      title: 'Pending Appointments', 
      value: stats.pendingAppointments, 
      icon: Clock, 
      color: 'text-amber-600 bg-amber-50' 
    },
    { 
      title: "Today's Appointments", 
      value: stats.todayAppointments, 
      icon: Calendar, 
      color: 'text-red-600 bg-red-50' 
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
              <span className="text-gray-600 text-sm">Loading dashboard...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="text-red-500 text-3xl mb-4">⚠️</div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Error Loading Dashboard</h3>
              <p className="text-gray-600 text-sm mb-4">{error}</p>
              <button
                onClick={fetchDashboardData}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Dashboard Overview</h2>
              <p className="text-sm text-gray-500 mt-1">Student counseling system statistics</p>
            </div>
            <button
              onClick={fetchDashboardData}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboardStats.map((stat, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>

        <div className="p-6">
          {recentActivities.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-300 text-3xl mb-4">📋</div>
              <h4 className="text-lg font-medium text-gray-700 mb-2">No recent activity</h4>
              <p className="text-gray-500 text-sm">Activity will appear here when actions are performed.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      activity.type === 'success' 
                        ? 'bg-green-500' 
                        : activity.type === 'warning' 
                        ? 'bg-amber-500' 
                        : 'bg-blue-500'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <Calendar className="w-4 h-4" />
              View Appointments
            </button>
            <button className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <Users className="w-4 h-4" />
              Manage Students
            </button>
            <button className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <BookOpen className="w-4 h-4" />
              View Records
            </button>
            <button className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <TrendingUp className="w-4 h-4" />
              Generate Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


function PersonalDataSheet({ students, isLoading, error, searchQuery, handleSearchChange, clearSearch, handleViewPds, selectedEducationLevel }) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <span className="text-gray-600 text-sm">Loading students...</span>
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
            <h4 className="text-lg font-medium text-gray-800 mb-2">Error Loading Students</h4>
            <p className="text-gray-600 text-sm mb-4">{error}</p>
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
            <h2 className="text-xl font-semibold text-gray-900">Personal Data Sheet</h2>
            <p className="text-sm text-gray-500 mt-1">
              {selectedEducationLevel} • {students.length} students
            </p>
          </div>
          
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by name..."
              className="w-full sm:w-64 pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Search students"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {students.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-300 text-4xl mb-4">👥</div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              {searchQuery ? 'No students found' : 'No students available'}
            </h3>
            <p className="text-gray-500 text-sm">
              {searchQuery 
                ? `No students found matching "${searchQuery}"`
                : `No students found for ${selectedEducationLevel}.`
              }
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Grade/Course</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="text-sm font-medium text-gray-900">
                      {`${student.first_name} ${student.last_name}`}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">{student.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">
                      {student.education_level === 'Higher Education'
                        ? `${student.course || 'N/A'} - ${student.year_level || 'N/A'}`
                        : `${student.grade_level || 'N/A'} ${student.strand ? `- ${student.strand}` : ''}`}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleViewPds(student)}
                      className="text-xs px-3 py-1 text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      View PDS
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      {students.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              Showing {students.length} students
            </span>
          </div>
        </div>
      )}
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

function Reports() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Reports</h3>
        <p className="text-gray-600">Reporting functionality will be implemented here.</p>
      </div>
    </div>
  );
}