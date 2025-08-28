import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import {
  FiHome, FiCalendar, FiFileText, FiBell, FiAlertCircle,
  FiLogOut, FiMenu, FiUser,FiPlus 
} from "react-icons/fi";
import StudentPDSModal from '../components/StudentPDSModal';
import StudentPDSViewModal from '../components/StudentPDSViewModal';
import StudentPDSUpdateModal from '../components/StudentPDSUpdateModal';
import AppointmentModal from "../components/AppoinmentModal";

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

        const response = await fetch(`/api/students/view?userId=${userId}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched studentData:', data); // Log studentData
          setStudentData(data);
          setFormStatus(data && data.id ? 'Submitted' : 'Pending');
        } else if (response.status === 404) {
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
      setIsLoading(true);
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`/api/students/view?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('View studentData:', data); // Log studentData
          setStudentData(data);
          setShowViewModal(true);
        } else {
          setError('Failed to fetch student data');
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Error fetching student data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('Using cached studentData:', studentData); // Log cached data
      setShowViewModal(true);
    }
  };

  const handleUpdateForm = async () => {
    if (!studentData) {
      setIsLoading(true);
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`/api/students/view?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Update studentData:', data); // Log studentData
          setStudentData(data);
          setShowUpdateModal(true);
        } else {
          setError('Failed to fetch student data');
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Error fetching student data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('Using cached studentData:', studentData); // Log cached data
      setShowUpdateModal(true);
    }
  };

  const handleUpdateStudent = async (updatedStudent) => {
    setFormStatus('Submitted');
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`/api/students/view?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Updated studentData:', data); // Log studentData
        setStudentData(data);
      } else {
        setError('Failed to fetch updated student data');
      }
    } catch (error) {
      console.error('Error fetching student data after update:', error);
      setError('Error fetching student data. Please try again.');
    }
  };

  const handleAddStudentSuccess = (newStudent) => {
    onAddStudent(newStudent);
    setFormStatus('Submitted');
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`/api/students/view?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Post-add studentData:', data); // Log studentData
          setStudentData(data);
        } else {
          setError('Failed to fetch student data after submission');
        }
      } catch (error) {
        console.error('Error fetching student data after submission:', error);
        setError('Error fetching student data. Please try again.');
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
      
      <StudentPDSViewModal 
        showModal={showViewModal}
        setShowModal={setShowViewModal}
        studentData={studentData}
        educationLevel={studentData?.education_level}
      />
      
      <StudentPDSUpdateModal 
        showModal={showUpdateModal}
        setShowModal={setShowUpdateModal}
        studentData={studentData}
        onUpdateStudent={handleUpdateStudent}
      />
      
      <StudentPDSModal 
        showModal={showModal}
        setShowModal={setShowModal}
        onAddStudent={handleAddStudentSuccess}
      />
    </div>
  );
}

function Appointments({
  selectedDate: propSelectedDate,
  setSelectedDate: propSetSelectedDate,
  appointments: propAppointments,
  setAppointments: propSetAppointments,
  handleBookAppointment,
  checkAppointmentsForDate,
  firstName: propFirstName,
  lastName: propLastName
}) {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [error, setError] = useState(null);
  const [localSelectedDate, setLocalSelectedDate] = useState(propSelectedDate || new Date());
  const [localAppointments, setLocalAppointments] = useState(propAppointments || []);
  const [localFirstName, setLocalFirstName] = useState(propFirstName || '');
  const [localLastName, setLocalLastName] = useState(propLastName || '');

  // Use local state if props are not provided
  const selectedDate = propSelectedDate || localSelectedDate;
  const setSelectedDate = propSetSelectedDate || setLocalSelectedDate;
  const appointments = propAppointments || localAppointments;
  const setAppointments = propSetAppointments || setLocalAppointments;
  const firstName = propFirstName || localFirstName;
  const lastName = propLastName || localLastName;

  // Fetch appointments if not provided
  useEffect(() => {
    if (!propAppointments) {
      const fetchAppointments = async () => {
        try {
          const userId = localStorage.getItem('userId');
          if (!userId) {
            console.error('User ID not found in localStorage');
            return;
          }

          const response = await fetch(`/api/students/appointments/list?userId=${userId}`);
          if (response.ok) {
            const data = await response.json();
            setLocalAppointments(data);
          } else {
            console.error('Failed to fetch appointments');
          }
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };

      fetchAppointments();
    }
  }, [propAppointments]);

  // Fetch user data if not provided
  useEffect(() => {
    if (!propFirstName || !propLastName) {
      const storedFirstName = localStorage.getItem('firstName') || '';
      const storedLastName = localStorage.getItem('lastName') || '';
      setLocalFirstName(storedFirstName);
      setLocalLastName(storedLastName);
    }
  }, [propFirstName, propLastName]);

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];

    const firstDayOfWeek = date.getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDay - i));
    }

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    const lastDayOfWeek = days[days.length - 1].getDay();
    for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const handleMonthChange = (increment) => {
    const newDate = new Date(currentYear, currentMonth + increment, 1);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleSubmitAppointment = async (counselingForm) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('Please log in to book an appointment.');
      return;
    }

    if (!counselingForm.name || !counselingForm.date || !counselingForm.purpose || !counselingForm.nature) {
      setError('Please fill out all required fields.');
      return;
    }

    // Check if the selected date is in the past
    const selectedDate = new Date(counselingForm.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare dates only
    
    if (selectedDate < today) {
      setError('Cannot book appointments for past dates.');
      return;
    }

    const newAppointment = {
      userId: parseInt(userId),
      name: counselingForm.name,
      gradeSection: counselingForm.gradeSection,
      date: counselingForm.date,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      counselor: "To be assigned",
      status: "pending",
      purpose: counselingForm.purpose,
      nature: counselingForm.nature,
      referredBy: counselingForm.referredBy,
      personalConcerns: counselingForm.personalConcerns,
      educationConcerns: counselingForm.educationConcerns,
      otherPersonalConcern: counselingForm.otherPersonalConcern,
      otherEducationConcern: counselingForm.otherEducationConcern,
      remarks: counselingForm.remarks
    };

    try {
      const response = await fetch('/api/students/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAppointment),
      });

      if (response.ok) {
        const result = await response.json();
        // Refresh appointments after successful booking
        const refreshResponse = await fetch(`/api/students/appointments/list?userId=${userId}`);
        if (refreshResponse.ok) {
          const refreshedData = await refreshResponse.json();
          setAppointments(refreshedData);
        }
        setIsAppointmentModalOpen(false);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(`Failed to book appointment: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      setError('An error occurred while booking the appointment. Please try again.');
    }
  };

  const openAppointmentModal = () => {
    // Check if selected date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDateCopy = new Date(selectedDate);
    selectedDateCopy.setHours(0, 0, 0, 0);
    
    if (selectedDateCopy < today) {
      setError('Cannot book appointments for past dates. Please select a future date.');
      return;
    }
    
    setIsAppointmentModalOpen(true);
    setError(null);
  };

  const closeAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
    setError(null);
  };

  const checkAppointmentsForSelectedDate = (date) => {
    if (checkAppointmentsForDate) {
      return checkAppointmentsForDate(date);
    }
    
    // Create a date string in YYYY-MM-DD format for comparison
    const selectedDateStr = date.toISOString().split('T')[0];
    
    return appointments.filter(app => {
      // Convert appointment date to YYYY-MM-DD format for comparison
      const appDate = new Date(app.date);
      const appDateStr = appDate.toISOString().split('T')[0];
      return appDateStr === selectedDateStr;
    });
  };

  // Check if a date is in the past
  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate < today;
  };

  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Format date for display without timezone issues
  const formatDateForDisplay = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'Asia/Manila'
    });
  };

  // Get date string in YYYY-MM-DD format for comparison
  const getDateString = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Asia/Manila'
    }).split('/').reverse().join('-');
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-lg">
          {error}
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">My Appointments</h3>
        <button
          onClick={openAppointmentModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isPastDate(selectedDate)}
        >
          <FiPlus className="mr-2" />
          Book New Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-semibold text-gray-800">Select Date</h4>
            <div className="flex items-center space-x-2 text-black">
              <button
                onClick={() => handleMonthChange(-1)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="font-medium">
                {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={() => handleMonthChange(1)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="CurrentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => {
                  const today = new Date();
                  setCurrentMonth(today.getMonth());
                  setCurrentYear(today.getFullYear());
                  handleDateSelect(today);
                }}
                className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
              >
                Today
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}

            {daysInMonth.map((date, i) => {
              const isCurrentMonth = date.getMonth() === currentMonth;
              const isSelected = selectedDate.toDateString() === date.toDateString();
              const isTodayDate = isToday(date);
              const isPast = isPastDate(date);
              const appointmentsForDate = checkAppointmentsForSelectedDate(date);
              const hasAppointments = appointmentsForDate && appointmentsForDate.length > 0;

              return (
                <button
                  key={i}
                  onClick={() => handleDateSelect(date)}
                  className={`p-2 rounded-lg text-center text-sm flex flex-col items-center ${
                    isSelected
                      ? isPast
                        ? 'bg-gray-300 text-gray-700 font-medium' // Selected but past date
                        : 'bg-blue-600 text-white font-medium' // Selected future date
                      : isTodayDate
                        ? 'bg-blue-100 text-blue-800' // Today
                        : isPast
                          ? 'text-gray-500 hover:bg-gray-100' // Past dates (still clickable)
                          : !isCurrentMonth
                            ? 'text-gray-400'
                            : hasAppointments
                              ? 'hover:bg-blue-50 text-gray-700'
                              : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {date.getDate()}
                  {hasAppointments && (
                    <div className={`w-1 h-1 rounded-full mt-1 ${
                      isSelected ? (isPast ? 'bg-gray-600' : 'bg-white') : 'bg-blue-500'
                    }`}></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="text-base font-semibold text-gray-800 mb-4">Appointment Details</h4>
          {(() => {
            const appointmentsForDate = checkAppointmentsForSelectedDate(selectedDate);
            const selectedDateStr = getDateString(selectedDate);
            const today = new Date();
            const todayStr = getDateString(today);
            const isPast = isPastDate(selectedDate);

            if (!appointmentsForDate || appointmentsForDate.length === 0) {
              return (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 text-sm mb-2">
                    {formatDateForDisplay(selectedDate)}
                    {isPast && <span className="text-gray-400 ml-2">(Past date)</span>}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {isPast ? 'No appointments scheduled on this date' : 'No appointments scheduled'}
                  </p>
                  {!isPast && (
                    <button
                      onClick={openAppointmentModal}
                      className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200 transition-colors"
                    >
                      Book Appointment
                    </button>
                  )}
                </div>
              );
            }

            return (
              <div>
                <p className="text-gray-500 text-sm mb-2">
                  {formatDateForDisplay(selectedDate)}
                  {isPast && <span className="text-gray-400 ml-2">(Past date)</span>}
                </p>
                {appointmentsForDate.map((appointment, index) => (
                  <div key={index} className={`p-4 rounded-lg border mb-2 last:mb-0 ${
                    appointment.status === 'confirmed' ? 'bg-green-50 border-green-100' : 'bg-yellow-50 border-yellow-100'
                  }`}>
                    <h4 className="font-medium text-gray-800 mb-1">{appointment.type}</h4>
                    <p className="text-gray-700 text-sm">Time: {appointment.time}</p>
                    <p className="text-gray-700 text-sm">Counselor: {appointment.counselor}</p>
                    <p className="text-gray-700 text-sm">Status: {appointment.status}</p>
                    {selectedDateStr === todayStr && appointment.status === 'confirmed' && (
                      <p className="mt-2 text-sm text-green-600">Your appointment is today!</p>
                    )}
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-base font-semibold text-gray-800 mb-4">All Appointments</h4>
        {!appointments || appointments.length === 0 ? (
          <p className="text-gray-500 text-sm">You have no appointments</p>
        ) : (
          <div className="space-y-3">
            {appointments.map((appointment, index) => {
              const appointmentDate = new Date(appointment.date);
              const isPastAppointment = isPastDate(appointmentDate);
              
              return (
                <div key={index} className={`flex justify-between py-2 border-b border-gray-100 last:border-0 ${isPastAppointment ? 'opacity-75' : ''}`}>
                  <div>
                    <span className="font-medium text-gray-700 text-base">{appointment.type}</span>
                    <p className="text-gray-600 text-sm">
                      {appointmentDate.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric',
                        timeZone: 'UTC'
                      })}
                      {' at '}{appointment.time}
                      {isPastAppointment && <span className="text-gray-400 ml-2">(Past)</span>}
                    </p>
                    <p className="text-gray-600 text-sm">Counselor: {appointment.counselor}</p>
                  </div>
                  <span className={`text-sm ${
                    appointment.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={closeAppointmentModal}
        onSubmit={handleSubmitAppointment}
        selectedDate={selectedDate}
        firstName={firstName}
        lastName={lastName}
        error={error}
      />
    </div>
  );
}