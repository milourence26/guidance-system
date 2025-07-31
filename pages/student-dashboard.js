import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { 
  FiHome, FiCalendar, FiClock, FiUser, FiBook, FiAward, 
  FiFileText, FiBell, FiSearch, FiAlertCircle, 
  FiLogOut, FiSettings, FiMenu, FiX
} from "react-icons/fi";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [educationLevel, setEducationLevel] = useState('higher-ed');
  const [guidanceAvailability, setGuidanceAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fullname, setFullname] = useState("Juan Dela Cruz");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const router = useRouter();

  // Mock data for guidance office availability
  useEffect(() => {
    const mockAvailability = [
      { 
        date: new Date().toISOString().split('T')[0], 
        hours: { start: "08:00", end: "17:00" },
        status: "open"
      },
      { 
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        hours: { start: "09:00", end: "16:00" },
        status: "open" 
      },
      { 
        date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
        hours: { start: "10:00", end: "15:00" },
        status: "open" 
      },
      { 
        date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
        status: "closed",
        reason: "University Holiday"
      }
    ];
    setGuidanceAvailability(mockAvailability);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/loginpage');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/loginpage');
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const checkAvailabilityForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return guidanceAvailability.find(day => day.date === dateStr);
  };

  const formatDate = (dateStr) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const toggleSidebar = () => {
    // On mobile, toggle open/close
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      // On desktop, toggle collapsed/expanded
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Always visible on desktop, collapsible */}
      <aside className={`
        ${isSidebarCollapsed ? 'w-16' : 'w-72'} bg-white shadow-xl h-screen flex flex-col border-r border-gray-100 transition-all duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 fixed lg:static z-50
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
                <img src="/images/guidancelogo.png" alt="Logo" className="w-full h-full object-cover"/>
              </div>
              {!isSidebarCollapsed && (
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Guidance</h1>
                  <p className="text-xs text-gray-500">Student Portal</p>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {/* Hamburger menu - visible on all devices */}
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiMenu className="w-5 h-5 text-gray-600" />
              </button>
              {/* Close button - only visible on mobile */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              >
                <FiX className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-xl transition-all duration-200 ${
              activeTab === 'dashboard' 
                ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm" 
                : "hover:bg-gray-50 text-gray-700"
            }`}
            title={isSidebarCollapsed ? "Dashboard" : ""}
          >
            <FiHome size={20} className="flex-shrink-0" />
            {!isSidebarCollapsed && <span className="font-medium">Dashboard</span>}
          </button>

          <button
            onClick={() => {
              setActiveTab('forms');
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-xl transition-all duration-200 ${
              activeTab === 'forms' 
                ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm" 
                : "hover:bg-gray-50 text-gray-700"
            }`}
            title={isSidebarCollapsed ? "My Forms" : ""}
          >
            <FiFileText size={20} className="flex-shrink-0" />
            {!isSidebarCollapsed && <span className="font-medium">My Forms</span>}
          </button>

          <button
            onClick={() => {
              setActiveTab('schedule');
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-xl transition-all duration-200 ${
              activeTab === 'schedule' 
                ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm" 
                : "hover:bg-gray-50 text-gray-700"
            }`}
            title={isSidebarCollapsed ? "Office Hours" : ""}
          >
            <FiCalendar size={20} className="flex-shrink-0" />
            {!isSidebarCollapsed && <span className="font-medium">Office Hours</span>}
          </button>
        </nav>
        
        {/* User Profile */}
        <div className="p-4 border-t border-gray-100">
          <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer`}>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-medium text-sm">{fullname.split(' ').map(n => n[0]).join('')}</span>
            </div>
            {!isSidebarCollapsed && (
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">{fullname}</p>
                <p className="text-xs text-gray-500">Student</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content - Account for sidebar on desktop */}
      <main className="flex-1 lg:ml-0 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-100 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
                  {activeTab === 'dashboard' ? 'Dashboard' : 
                   activeTab === 'forms' ? 'My Forms' : 'Office Hours'}
                </h2>
                <p className="text-gray-500 mt-1 text-sm lg:text-base">Welcome back, {fullname.split(' ')[0]}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="relative hidden sm:block">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-40 lg:w-auto"
                />
              </div>
              
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <FiBell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="relative">
                <button 
                  className="flex items-center space-x-2"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-xs">{fullname.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                    <div className="py-2">
                      <button 
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        onClick={() => {
                          handleLogout();
                          setIsDropdownOpen(false);
                        }}
                      >
                        <FiLogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 lg:p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome Card */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-4 lg:p-6 text-white">
                <h2 className="text-xl lg:text-2xl font-bold mb-2">Welcome, {fullname.split(' ')[0]}!</h2>
                <p className="text-sm lg:text-base">View guidance office hours and complete your student forms.</p>
              </div>

              {/* Guidance Office Status */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FiCalendar className="w-5 h-5 mr-2 text-blue-600" />
                  Guidance Office Status
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Regular Hours</h4>
                    <p className="text-gray-700 text-sm lg:text-base">Monday to Friday: 8:00 AM - 5:00 PM</p>
                    <p className="text-gray-700 text-sm lg:text-base">Saturday: 9:00 AM - 12:00 PM</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h4 className="font-medium text-green-800 mb-2">Current Status</h4>
                    <p className="text-gray-700 text-sm lg:text-base">Today: <span className="font-medium text-green-600">Open</span></p>
                    <p className="text-gray-700 text-sm lg:text-base">Hours: 8:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Pending Forms */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FiFileText className="w-5 h-5 mr-2 text-blue-600" />
                  Pending Forms
                </h3>
                
                <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <FiAlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Annual Student Profile Update</h4>
                      <p className="text-sm text-yellow-700 mt-1">Please complete your student profile form for the current academic year.</p>
                      <button 
                        onClick={() => setActiveTab('forms')}
                        className="mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded hover:bg-yellow-200 transition-colors"
                      >
                        Complete Form
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'forms' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Student Forms</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Education Level</h3>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setEducationLevel('higher-ed')}
                      className={`px-3 lg:px-4 py-2 rounded-lg flex items-center text-sm lg:text-base ${educationLevel === 'higher-ed' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-gray-100 text-gray-800 border border-gray-200'}`}
                    >
                      <FiAward className="w-4 h-4 mr-2" />
                      Higher Education
                    </button>
                    <button
                      onClick={() => setEducationLevel('senior-ed')}
                      className={`px-3 lg:px-4 py-2 rounded-lg flex items-center text-sm lg:text-base ${educationLevel === 'senior-ed' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-gray-100 text-gray-800 border border-gray-200'}`}
                    >
                      <FiBook className="w-4 h-4 mr-2" />
                      Senior High School
                    </button>
                    <button
                      onClick={() => setEducationLevel('basic-ed')}
                      className={`px-3 lg:px-4 py-2 rounded-lg flex items-center text-sm lg:text-base ${educationLevel === 'basic-ed' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-gray-100 text-gray-800 border border-gray-200'}`}
                    >
                      <FiUser className="w-4 h-4 mr-2" />
                      Basic Education
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {educationLevel === 'higher-ed' ? 'College Student Information' :
                     educationLevel === 'senior-ed' ? 'Senior High School Information' :
                     'Basic Education Information'}
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {educationLevel === 'higher-ed' ? 'Major' :
                         educationLevel === 'senior-ed' ? 'Strand' :
                         'Grade Level'}
                      </label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {educationLevel === 'higher-ed' ? 'Year Level' :
                         educationLevel === 'senior-ed' ? 'Grade Level' :
                         'Section'}
                      </label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {educationLevel === 'higher-ed' ? 'Academic Concerns' :
                         educationLevel === 'senior-ed' ? 'Career Guidance Needs' :
                         'Behavioral Notes'}
                      </label>
                      <textarea 
                        rows={3} 
                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                  <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                    Save Draft
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Submit Form
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Guidance Office Availability</h2>
                
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {/* Calendar Section */}
                  <div className="xl:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Date</h3>
                    <div className="grid grid-cols-7 gap-1 lg:gap-2 mb-4">
                      {dayNames.map(day => (
                        <div key={day} className="text-center text-xs lg:text-sm font-medium text-gray-500 py-2">
                          {day}
                        </div>
                      ))}
                      
                      {/* Calendar days */}
                      {Array.from({length: 35}).map((_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() + i - date.getDay());
                        const availability = checkAvailabilityForDate(date);
                        const isAvailable = availability && availability.status === "open";
                        
                        return (
                          <button
                            key={i}
                            onClick={() => handleDateChange(date)}
                            className={`p-1 lg:p-2 rounded-lg text-center text-xs lg:text-sm ${
                              selectedDate.toDateString() === date.toDateString() 
                                ? 'bg-blue-100 text-blue-800 font-medium' 
                                : isAvailable 
                                  ? 'hover:bg-blue-50' 
                                  : 'opacity-50'
                            }`}
                          >
                            {date.getDate()}
                            {isAvailable ? (
                              <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-1"></div>
                            ) : (
                              <div className="w-1 h-1 bg-transparent mx-auto mt-1"></div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Availability Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Availability Details</h3>
                    {(() => {
                      const availability = checkAvailabilityForDate(selectedDate);
                      const dateStr = selectedDate.toISOString().split('T')[0];
                      const todayStr = new Date().toISOString().split('T')[0];
                      
                      if (!availability) {
                        return (
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-500 text-sm">No availability information for this date</p>
                          </div>
                        );
                      }

                      if (availability.status === "closed") {
                        return (
                          <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                            <h4 className="font-medium text-red-800 mb-1">Guidance Office Closed</h4>
                            <p className="text-gray-700 text-sm">{availability.reason || "Not available"}</p>
                            {dateStr === todayStr && (
                              <p className="mt-2 text-sm text-red-600">The office is not open today</p>
                            )}
                          </div>
                        );
                      }

                      return (
                        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                          <h4 className="font-medium text-green-800 mb-1">Guidance Office Open</h4>
                          <p className="text-gray-700 text-sm">
                            Hours: {availability.hours.start} - {availability.hours.end}
                          </p>
                          {dateStr === todayStr && (
                            <p className="mt-2 text-sm text-green-600">
                              The office is currently open until {availability.hours.end}
                            </p>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
              
              {/* Regular Hours */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Regular Office Hours</h3>
                <div className="space-y-3">
                  {[
                    { day: "Monday", hours: "8:00 AM - 5:00 PM" },
                    { day: "Tuesday", hours: "8:00 AM - 5:00 PM" },
                    { day: "Wednesday", hours: "8:00 AM - 5:00 PM" },
                    { day: "Thursday", hours: "8:00 AM - 5:00 PM" },
                    { day: "Friday", hours: "8:00 AM - 5:00 PM" },
                    { day: "Saturday", hours: "9:00 AM - 12:00 PM" },
                    { day: "Sunday", hours: "Closed" },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="font-medium text-gray-700 text-sm lg:text-base">{item.day}</span>
                      <span className="text-gray-600 text-sm lg:text-base">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;