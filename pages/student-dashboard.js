import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import {
  FiHome, FiCalendar, FiFileText, FiBell, FiAlertCircle,
  FiLogOut, FiMenu, FiUser
} from "react-icons/fi";
import StudentPDSModal from '../components/StudentPDSModal';
import StudentPDSViewModal from '../components/StudentPDSViewModal';
import StudentPDSUpdateModal from '../components/StudentPDSUpdateModal';

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
          {activeTab === 'Student Forms' && (
  <Forms 
    showModal={showModal} 
    setShowModal={setShowModal} 
    onAddStudent={handleAddStudent} 
    formStatus={formStatus}
    setFormStatus={setFormStatus} // Add this line
  />
)}
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

function Forms({ formStatus, setFormStatus, showModal, setShowModal, onAddStudent }) {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student data when component mounts
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setIsLoading(true);
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
          setError('User ID not found. Please log in again.');
          setIsLoading(false);
          return;
        }

        const response = await fetch(`/api/students?userId=${userId}`);
        
        if (response.ok) {
          const data = await response.json();
          setStudentData(data);
          
          // Update form status based on whether data exists
          if (data && data.id) {
            setFormStatus('Submitted');
          } else {
            setFormStatus('Pending');
          }
        } else if (response.status === 404) {
          // No student data found, which is normal for new users
          setFormStatus('Pending');
        } else {
          setError('Failed to fetch student data');
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Error fetching student data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentData();
  }, [setFormStatus]);

  const handleViewForm = async () => {
    if (!studentData) {
      // If no data in state, try to fetch it again
      setIsLoading(true);
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`/api/students?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setStudentData(data);
          setShowViewModal(true);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Error fetching student data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setShowViewModal(true);
    }
  };

  const handleUpdateForm = async () => {
    if (!studentData) {
      // If no data in state, try to fetch it again
      setIsLoading(true);
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`/api/students?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setStudentData(data);
          setShowUpdateModal(true);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Error fetching student data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setShowUpdateModal(true);
    }
  };

const handleUpdateStudent = async (updatedStudent) => {
  setFormStatus('Submitted');
  
  // Refresh the student data after successful update
  try {
    const userId = localStorage.getItem('userId');
    const response = await fetch(`/api/students?userId=${userId}`);
    if (response.ok) {
      const data = await response.json();
      setStudentData(data);
    }
  } catch (error) {
    console.error('Error fetching student data after update:', error);
  }
};

  const handleAddStudentSuccess = (newStudent) => {
    onAddStudent(newStudent);
    setFormStatus('Submitted');
    // Refresh the student data after successful submission
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`/api/students?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setStudentData(data);
        }
      } catch (error) {
        console.error('Error fetching student data after update:', error);
      }
    };
    fetchData();
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading your form data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <FiAlertCircle className="w-5 h-5 text-red-600 mr-3" />
            <h3 className="text-red-800 font-medium">Error</h3>
          </div>
          <p className="text-red-700 mt-1">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Student Forms</h2>
      <p className="text-gray-600 mb-6">Complete or update your Personal Data Sheet (PDS) for the current academic year.</p>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Form Status: 
          <span className={`ml-2 ${formStatus === 'Submitted' ? 'text-green-600' : 'text-yellow-600'}`}>
            {formStatus}
          </span>
        </h3>
        
        {formStatus === 'Submitted' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-3">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-green-800">Your form has been submitted successfully!</p>
            </div>
            <p className="text-green-700 text-sm mt-1">
              You can view or update your information at any time.
            </p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-3 mt-4">
          {formStatus === 'Pending' ? (
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition flex items-center"
            >
              <FiFileText className="mr-2" />
              Complete PDS Form
            </button>
          ) : (
            <>
              <button
                onClick={handleViewForm}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm transition flex items-center"
              >
                <FiUser className="mr-2" />
                View PDS Form
              </button>
              <button
                onClick={handleUpdateForm}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition flex items-center"
              >
                <FiFileText className="mr-2" />
                Update PDS Form
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Additional helpful information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-blue-800 font-medium mb-2 flex items-center">
          <FiAlertCircle className="mr-2" />
          Important Information
        </h4>
        <ul className="text-blue-700 text-sm list-disc list-inside space-y-1">
          <li>Please ensure all information is accurate and up-to-date</li>
          <li>You can update your form at any time if your information changes</li>
          <li>Contact the guidance office if you need assistance</li>
        </ul>
      </div>
      
      {/* View Modal */}
      <StudentPDSViewModal 
        showModal={showViewModal}
        setShowModal={setShowViewModal}
        studentData={studentData}
        educationLevel={studentData?.education_level}
      />
      
      {/* Update Modal */}
      <StudentPDSUpdateModal 
        showModal={showUpdateModal}
        setShowModal={setShowUpdateModal}
        studentData={studentData}
        onUpdateStudent={handleUpdateStudent}
      />
      
      {/* Create Modal */}
      <StudentPDSModal 
        showModal={showModal}
        setShowModal={setShowModal}
        onAddStudent={handleAddStudentSuccess}
      />
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