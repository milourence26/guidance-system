import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  FiMenu, FiGrid, FiUsers, FiFileText, FiLogOut, FiChevronDown, FiBell,FiUserCheck,FiTrendingUp,
  FiSearch, FiX, FiCalendar, FiBarChart
} from 'react-icons/fi';
import StudentPDSViewModal from '../components/StudentPDSViewModal';

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
          {activeTab === 'Dashboard' && <Dashboard stats={stats} />}
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
      className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
        isActive
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
      className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 text-sm ${
        isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-600'
      }`}
      onClick={setActiveTab}
    >
      <Icon size={16} className="flex-shrink-0" />
      <span>{label}</span>
    </button>
  );
}

function Dashboard({ stats }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Student PDS viewed', user: 'Juan Dela Cruz', time: '2 hours ago', type: 'info' },
            { action: 'Appointment scheduled', user: 'Maria Garcia', time: '4 hours ago', type: 'success' },
            { action: 'Report generated', user: 'Pedro Santos', time: '6 hours ago', type: 'warning' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div
                className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' : activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}
              ></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PersonalDataSheet({ students, isLoading, error, searchQuery, handleSearchChange, clearSearch, handleViewPds, selectedEducationLevel }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Personal Data Sheet - {selectedEducationLevel}</h3>
      </div>

      <div className="relative max-w-md mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name..."
          className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          aria-label="Search students"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label="Clear search"
          >
            <FiX className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {isLoading && (
        <div className="p-6 text-center text-gray-500">Loading...</div>
      )}

      {error && (
        <div className="m-6 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Student List</h3>
          {students.length === 0 ? (
            <p className="text-gray-600">
              {searchQuery ? `No students found matching "${searchQuery}"` : `No students found for ${selectedEducationLevel}.`}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade/Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {`${student.first_name} ${student.last_name}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.education_level === 'Higher Education'
                          ? `${student.course || 'N/A'} - ${student.year_level || 'N/A'}`
                          : `${student.grade_level || 'N/A'} ${student.strand ? `- ${student.strand}` : ''}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleViewPds(student)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View PDS
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Appointments() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointments</h3>
        <p className="text-gray-600">Appointment scheduling functionality will be implemented here.</p>
      </div>
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