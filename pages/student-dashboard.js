import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import {
  FiHome, FiCalendar, FiFileText, FiBell, FiAlertCircle,
  FiLogOut, FiMenu, FiUser
} from "react-icons/fi";
import StudentPDSModal from '../components/StudentPDSModal';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [appointments, setAppointments] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formStatus, setFormStatus] = useState('Pending');
  const router = useRouter();

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName') || 'Juan';
    const storedLastName = localStorage.getItem('lastName') || 'Dela Cruz';
    const storedUserId = localStorage.getItem('userId');
    setFirstName(storedFirstName);
    setLastName(storedLastName);

    const fetchAppointments = async () => {
      if (!storedUserId) {
        console.error('User ID not found in localStorage');
        return;
      }

      try {
        const response = await fetch(`/api/students/appointments/list?userId=${storedUserId}`);
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          console.error('Failed to fetch appointments');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const fullname = `${firstName} ${lastName}`;

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

  const handleAddStudent = (newStudent) => {
    setFormStatus('Submitted');
    // Optionally, update localStorage or state with new student data
    localStorage.setItem('firstName', newStudent.firstName);
    setFirstName(newStudent.firstName);
  };

  function SidebarItem({ icon: Icon, label, activeTab, setActiveTab, isSidebarOpen }) {
    const isActive = activeTab === label;
    return (
      <button
        className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
          isActive
            ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm"
            : "hover:bg-gray-50 text-gray-700"
        }`}
        onClick={() => label === 'Logout' ? handleLogout() : setActiveTab(label)}
      >
        <Icon size={20} className="flex-shrink-0" />
        {isSidebarOpen && <span className="font-medium">{label}</span>}
      </button>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`bg-white shadow-xl transition-all duration-300 ${
        isSidebarOpen ? "w-72" : "w-20"
      } h-screen sticky top-0 flex flex-col border-r border-gray-100`}>
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
                  <p className="text-xs text-gray-500">Student Portal</p>
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
          <SidebarItem 
            icon={FiHome} 
            label="Dashboard" 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isSidebarOpen={isSidebarOpen} 
          />
          <SidebarItem 
            icon={FiFileText} 
            label="Student Forms" 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isSidebarOpen={isSidebarOpen} 
          />
          <SidebarItem 
            icon={FiCalendar} 
            label="Appointments" 
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-100 p-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{activeTab}</h2>
              <p className="text-gray-500 mt-1">Welcome back, {firstName}</p>
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

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'Dashboard' && <Dashboard appointments={appointments} firstName={firstName} setActiveTab={setActiveTab} />}
          {activeTab === 'Student Forms' && <Forms showModal={showModal} setShowModal={setShowModal} onAddStudent={handleAddStudent} formStatus={formStatus} />}
          {activeTab === 'Appointments' && <Appointments />}
        </div>
      </div>
    </div>
  );
}

function Dashboard({ appointments, firstName, setActiveTab }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome, {firstName}!</h2>
        <p className="text-base">Schedule appointments and complete your student forms.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiCalendar className="w-5 h-5 mr-2 text-blue-600" />
          Upcoming Appointments
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {appointments
            .filter(app => new Date(app.date) >= new Date())
            .slice(0, 2)
            .map((appointment, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                appointment.status === 'confirmed' 
                  ? 'bg-green-50 border-green-100' 
                  : 'bg-yellow-50 border-yellow-100'
              }`}>
                <h4 className="font-medium text-gray-800 mb-2">{appointment.type}</h4>
                <p className="text-gray-700 text-base">Date: {appointment.date}</p>
                <p className="text-gray-700 text-base">Time: {appointment.time}</p>
                <p className="text-gray-700 text-base">Counselor: {appointment.counselor}</p>
                <p className="text-gray-700 text-base">Status: {appointment.status}</p>
              </div>
            ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
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
                className="mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded hover:bg-yellow-200 transition-colors"
                onClick={() => setActiveTab('Student Forms')}
              >
                Complete Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Forms({ showModal, setShowModal, onAddStudent, formStatus }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Student Forms</h2>
      <p className="text-gray-600 mb-6">Complete or update your Personal Data Sheet (PDS) for the current academic year.</p>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Form Status: {formStatus}</h3>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition"
        >
          {formStatus === 'Pending' ? 'Complete PDS Form' : 'Update PDS Form'}
        </button>
      </div>
      <StudentPDSModal showModal={showModal} setShowModal={setShowModal} onAddStudent={onAddStudent} />
    </div>
  );
}

function Appointments() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Appointments</h2>
      <p className="text-gray-600">Schedule and manage your appointments here.</p>
    </div>
  );
}