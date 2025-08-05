import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { 
  FiHome, FiCalendar, FiFileText, FiBell, FiSearch, FiAlertCircle, 
  FiLogOut, FiMenu, FiUser
} from "react-icons/fi";

const AdvocateDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [guidanceAvailability, setGuidanceAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const router = useRouter();

  // Fetch firstName and lastName from localStorage on component mount
  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName') || 'Jane';
    const storedLastName = localStorage.getItem('lastName') || 'Doe';
    setFirstName(storedFirstName);
    setLastName(storedLastName);
  }, []);

  const fullname = `${firstName} ${lastName}`;

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
        localStorage.removeItem('usertype');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
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

  const handleAvailabilitySubmit = (e) => {
    e.preventDefault();
    const dateStr = selectedDate.toISOString().split('T')[0];
    const status = e.target.status.value;
    const newAvailability = {
      date: dateStr,
      status,
      ...(status === 'open' && {
        hours: {
          start: e.target.startTime.value,
          end: e.target.endTime.value
        }
      }),
      ...(status === 'closed' && { reason: e.target.reason.value })
    };

    setGuidanceAvailability(prev => [
      ...prev.filter(day => day.date !== dateStr),
      newAvailability
    ].sort((a, b) => a.date.localeCompare(b.date)));
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    // Only collapse sidebar on mobile (< 1024px)
    if (window.innerWidth < 1024) {
      setIsSidebarCollapsed(true);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden ${
          isSidebarCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <aside className={`
        ${isSidebarCollapsed ? 'w-16' : 'w-72'} bg-white shadow-xl h-screen flex flex-col border-r border-gray-100 transition-all duration-300
        fixed z-50 lg:static
        ${isSidebarCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-center">
          {isSidebarCollapsed ? (
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={toggleSidebar}
            >
              <FiMenu size={20} className="text-gray-600" />
            </button>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
                  <img 
                    src="/images/guidancelogo.png" 
                    alt="Logo" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-9 h-9 bg-blue-600 rounded-xl hidden items-center justify-center">
                    <FiUser className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Guidance</h1>
                  <p className="text-xs text-gray-500">Advocate Portal</p>
                </div>
              </div>
              <button 
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={toggleSidebar}
              >
                <FiMenu size={20} className="text-gray-600" />
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => handleNavClick('dashboard')}
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
            onClick={() => handleNavClick('availability')}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-xl transition-all duration-200 ${
              activeTab === 'availability' 
                ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm" 
                : "hover:bg-gray-50 text-gray-700"
            }`}
            title={isSidebarCollapsed ? "Availability" : ""}
          >
            <FiCalendar size={20} className="flex-shrink-0" />
            {!isSidebarCollapsed && <span className="font-medium">Availability</span>}
          </button>

          <button
            onClick={() => handleNavClick('reports')}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-xl transition-all duration-200 ${
              activeTab === 'reports' 
                ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm" 
                : "hover:bg-gray-50 text-gray-700"
            }`}
            title={isSidebarCollapsed ? "Reports" : ""}
          >
            <FiFileText size={20} className="flex-shrink-0" />
            {!isSidebarCollapsed && <span className="font-medium">Reports</span>}
          </button>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-100">
          <div 
            className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer`} 
            onClick={handleLogout}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-medium text-sm">{fullname.split(' ').map(n => n[0]).join('')}</span>
            </div>
            {!isSidebarCollapsed && (
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{fullname}</p>
                  <p className="text-xs text-gray-500">Guidance Advocate</p>
                </div>
                <FiLogOut size={16} className="text-gray-600" />
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-100 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
                onClick={toggleSidebar}
              >
                <FiMenu size={20} className="text-gray-600" />
              </button>
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
                  {activeTab === 'dashboard' ? 'Dashboard' : 
                   activeTab === 'availability' ? 'Availability' : 
                   'Reports'}
                </h2>
                <p className="text-gray-500 mt-1 text-sm lg:text-base">Welcome back, {firstName}</p>
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
                  onClick={handleLogout}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-xs">{fullname.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                </button>
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
                <h2 className="text-xl lg:text-2xl font-bold mb-2">Welcome, {firstName}!</h2>
                <p className="text-sm lg:text-base">Manage guidance office availability and generate reports.</p>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FiHome className="w-5 h-5 mr-2 text-blue-600" />
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Set Availability</h4>
                    <p className="text-gray-700 text-sm lg:text-base">Update guidance office hours for a specific date.</p>
                    <button 
                      onClick={() => handleNavClick('availability')}
                      className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200 transition-colors"
                    >
                      Go to Availability
                    </button>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h4 className="font-medium text-green-800 mb-2">Generate Report</h4>
                    <p className="text-gray-700 text-sm lg:text-base">Create a new guidance report.</p>
                    <button 
                      onClick={() => handleNavClick('reports')}
                      className="mt-2 px-3 py-1 bg-green-100 text-green-800 text-sm rounded hover:bg-green-200 transition-colors"
                    >
                      Go to Reports
                    </button>
                  </div>
                </div>
              </div>

              {/* Current Availability */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FiCalendar className="w-5 h-5 mr-2 text-blue-600" />
                  Current Availability
                </h3>
                <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <FiAlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Today’s Status</h4>
                      <p className="text-sm text-yellow-700 mt-1">Guidance office is open today from 8:00 AM to 5:00 PM.</p>
                      <button 
                        onClick={() => handleNavClick('availability')}
                        className="mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded hover:bg-yellow-200 transition-colors"
                      >
                        Update Availability
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'availability' && (
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
                  
                  {/* Availability Form and Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Set Availability</h3>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                      <form onSubmit={handleAvailabilitySubmit}>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select 
                            name="status"
                            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            defaultValue={checkAvailabilityForDate(selectedDate)?.status || 'open'}
                          >
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                          <input 
                            type="time" 
                            name="startTime"
                            defaultValue={checkAvailabilityForDate(selectedDate)?.hours?.start || ''}
                            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                          <input 
                            type="time" 
                            name="endTime"
                            defaultValue={checkAvailabilityForDate(selectedDate)?.hours?.end || ''}
                            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Reason (if closed)</label>
                          <input 
                            type="text" 
                            name="reason"
                            defaultValue={checkAvailabilityForDate(selectedDate)?.reason || ''}
                            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., University Holiday"
                          />
                        </div>
                        <button 
                          type="submit"
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Save Availability
                        </button>
                      </form>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-4">Availability Details</h3>
                    {(() => {
                      const availability = checkAvailabilityForDate(selectedDate);
                      const dateStr = selectedDate.toISOString().split('T')[0];
                      const todayStr = new Date().toISOString().split('T')[0];

                      if (!availability) {
                        return (
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-500 text-sm">No availability set for this date</p>
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
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Guidance Reports</h2>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Generate Report</h3>
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                        <select 
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="student-progress">Student Progress</option>
                          <option value="session-summary">Session Summary</option>
                          <option value="attendance">Attendance</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                        <input 
                          type="text" 
                          placeholder="MM/DD/YYYY - MM/DD/YYYY"
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                      </div>
                      <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea 
                          rows={3} 
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Generate Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdvocateDashboard;