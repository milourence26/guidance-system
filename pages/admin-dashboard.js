import { useState } from "react";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'; // Add this import
import { FiMenu, FiGrid, FiUsers, FiFileText, FiUser, FiLogOut, FiChevronDown, FiChevronRight, FiBook, FiAward, FiHome, FiCalendar, FiClock, FiSettings, FiBell, FiSearch, FiBarChart, FiTrendingUp, FiUserCheck } from "react-icons/fi";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPdsDropdownOpen, setIsPdsDropdownOpen] = useState(false);
  const [fullname, setFullname] = useState("Dr. Maria Santos");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availabilityHours, setAvailabilityHours] = useState({
    start: "08:00",
    end: "17:00"
  });
  const router = useRouter(); // Add router

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/loginpage'); // Redirect to login page
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/loginpage'); // Fallback redirect
    }
  };

  const stats = [
    { title: "Total Students", value: "1,248", change: "+12%", icon: FiUsers, color: "bg-blue-500" },
    { title: "Pending Forms", value: "23", change: "-5%", icon: FiFileText, color: "bg-orange-500" },
    { title: "Completed Sessions", value: "186", change: "+8%", icon: FiUserCheck, color: "bg-green-500" },
    { title: "This Month", value: "45", change: "+15%", icon: FiTrendingUp, color: "bg-purple-500" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`bg-white shadow-xl transition-all duration-300 ${isSidebarOpen ? "w-72" : "w-20"} h-screen sticky top-0 flex flex-col border-r border-gray-100`}>
        {/* Header */}
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

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem icon={FiGrid} label="Dashboard" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={FiCalendar} label="Availability Schedule" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={FiUsers} label="Manage Users" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={FiFileText} label="Student Forms" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          
          {/* Personal Data Sheet Dropdown */}
          <div>
            <div 
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 ${activeTab.startsWith("PDS") ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm" : "hover:bg-gray-50"}`}
              onClick={() => setIsPdsDropdownOpen(!isPdsDropdownOpen)}
            >
              <div className="flex items-center space-x-3">
                <FiUser size={20} className="flex-shrink-0" />
                {isSidebarOpen && <span className="font-medium text-black">Personal Data Sheet</span>}
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
        </nav>
        
        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-100">
          <div 
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={handleLogout}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">{fullname.split(' ').map(n => n[0]).join('')}</span>
            </div>
            {isSidebarOpen && (
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">{fullname}</p>
                <p className="text-xs text-gray-500">Guidance Counselor</p>
              </div>
            )}
            <FiLogOut size={18} className="text-gray-400" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{activeTab}</h2>
              <p className="text-gray-500 mt-1">Welcome back, {fullname.split(' ')[1]}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
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
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-xs">{fullname.split(' ').map(n => n[0]).join('')}</span>
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

        {/* Content Area */}
        <div className="p-6">
          {activeTab === "Dashboard" && <Dashboard stats={stats} />}
          {activeTab === "Availability Schedule" && <AvailabilitySchedule selectedDate={selectedDate} setSelectedDate={setSelectedDate} availabilityHours={availabilityHours} setAvailabilityHours={setAvailabilityHours} />}
          {activeTab === "Manage Users" && <ManageUsers />}
          {activeTab === "Student Forms" && <StudentForms />}
          {activeTab === "Reports" && <Reports />}
          {activeTab === "Logs" && <Logs />}
          {activeTab.startsWith("PDS") && <PersonalDataSheet type={activeTab.replace("PDS - ", "")} />}
        </div>
      </main>
    </div>
  );
}

// Components
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

function Dashboard({ stats }) {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
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

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: "New student registration", user: "Juan Dela Cruz", time: "2 hours ago", type: "info" },
            { action: "Form submission completed", user: "Maria Garcia", time: "4 hours ago", type: "success" },
            { action: "Counseling session scheduled", user: "Pedro Santos", time: "6 hours ago", type: "warning" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'success' ? 'bg-green-500' : 
                activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
              }`}></div>
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

function AvailabilitySchedule({ selectedDate, setSelectedDate, availabilityHours, setAvailabilityHours }) {
  const [availableDays, setAvailableDays] = useState([1, 2, 3, 4, 5]); // Monday to Friday
  const [isAvailable, setIsAvailable] = useState(true);

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const toggleDay = (dayIndex) => {
    setAvailableDays(prev => 
      prev.includes(dayIndex) 
        ? prev.filter(d => d !== dayIndex)
        : [...prev, dayIndex]
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Schedule Calendar</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Available</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Unavailable</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map(day => (
              <div key={day} className="p-2 text-center text-xs font-medium text-gray-500">
                {day.slice(0, 3)}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }, (_, i) => (
              <div key={`empty-${i}`} className="p-2"></div>
            ))}
            
            {Array.from({ length: daysInMonth }, (_, i) => {
              const date = i + 1;
              const dayOfWeek = new Date(currentYear, currentMonth, date).getDay();
              const isToday = date === today.getDate();
              const isAvailableDay = availableDays.includes(dayOfWeek);
              
              return (
                <button
                  key={date}
                  className={`p-2 text-sm rounded-lg transition-colors ${
                    isToday 
                      ? 'bg-blue-500 text-white font-medium' 
                      : isAvailableDay 
                        ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  {date}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          {/* Availability Toggle */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Availability Status</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Currently Available</span>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAvailable ? 'bg-green-500' : 'bg-gray-300'
                }`}
                onClick={() => setIsAvailable(!isAvailable)}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAvailable ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Working Hours</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Start Time</label>
                <input
                  type="time"
                  value={availabilityHours.start}
                  onChange={(e) => setAvailabilityHours(prev => ({ ...prev, start: e.target.value }))}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">End Time</label>
                <input
                  type="time"
                  value={availabilityHours.end}
                  onChange={(e) => setAvailabilityHours(prev => ({ ...prev, end: e.target.value }))}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Available Days */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Days</h3>
            <div className="space-y-2">
              {dayNames.map((day, index) => (
                <label key={day} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={availableDays.includes(index)}
                    onChange={() => toggleDay(index)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{day}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ManageUsers() {
  const users = [
    { id: 1, name: "Juan Dela Cruz", email: "juan@email.com", role: "Student", status: "Active" },
    { id: 2, name: "Maria Garcia", email: "maria@email.com", role: "Student", status: "Active" },
    { id: 3, name: "Pedro Santos", email: "pedro@email.com", role: "Teacher", status: "Inactive" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">User Management</h3>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Add New User
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StudentForms() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Forms</h3>
      <p className="text-gray-600">View and manage student forms and submissions.</p>
    </div>
  );
}

function Reports() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Reports & Analytics</h3>
      <p className="text-gray-600">Generate and view detailed reports about guidance activities.</p>
    </div>
  );
}

function Logs() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Logs</h3>
      <p className="text-gray-600">Logs here content here.</p>
    </div>
  );
}

function PersonalDataSheet({ type }) {
  // Dynamically import the forms to enable code splitting
  const HigherEducationForm = dynamic(() => import('../pages/higher-ed-form'), { 
    ssr: false,
    loading: () => <p>Loading form...</p>
  });
  
  const BasicEducationForm = dynamic(() => import('../pages/basic-ed-form'), { 
    ssr: false,
    loading: () => <p>Loading form...</p>
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Personal Data Sheet - {type}</h3>
      </div>
      
      <div className="p-6">
        {type === "Higher Education" && <HigherEducationForm />}
        {type === "Basic Education" && <BasicEducationForm />}
        {type === "Senior High School" && (
          <div className="text-center py-8 text-gray-500">
            <p>Senior High School form coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}
