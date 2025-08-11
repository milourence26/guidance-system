//pages/student-dashboard.js
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { 
  FiHome, FiCalendar, FiFileText, FiBell, FiAlertCircle, FiPlus, FiX,
  FiLogOut, FiMenu, FiBook, FiAward, FiUser
} from "react-icons/fi";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [educationLevel, setEducationLevel] = useState('higher-ed');
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  // Fetch firstName, lastName, and userId from localStorage and appointments from database
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
      setActiveTab('Logout');
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

  const handleBookAppointment = () => {
    console.log('Booking new appointment for', selectedDate);
  };

  const checkAppointmentsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(appointment => appointment.date === dateStr);
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
        onClick={() => setActiveTab(label)}
      >
        <Icon size={20} className="flex-shrink-0" />
        {isSidebarOpen && <span className="font-medium">{label}</span>}
      </button>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
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
          <SidebarItem icon={FiHome} label="Dashboard" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={FiFileText} label="Forms" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={FiCalendar} label="Appointments" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={FiLogOut} label="Logout" activeTab={activeTab} setActiveTab={handleLogout} isSidebarOpen={isSidebarOpen} />
        </nav>
      </aside>

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
          {activeTab === 'Dashboard' && <Dashboard appointments={appointments} firstName={firstName} />}
          {activeTab === 'Forms' && <Forms educationLevel={educationLevel} setEducationLevel={setEducationLevel} />}
          {activeTab === 'Appointments' && (
            <Appointments 
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate} 
              appointments={appointments} 
              setAppointments={setAppointments}
              handleBookAppointment={handleBookAppointment} 
              checkAppointmentsForDate={checkAppointmentsForDate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Dashboard({ appointments, firstName }) {
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
          {appointments.filter(app => new Date(app.date) >= new Date()).slice(0, 2).map((appointment, index) => (
            <div key={index} className={`p-4 rounded-lg border ${appointment.status === 'confirmed' ? 'bg-green-50 border-green-100' : 'bg-yellow-50 border-yellow-100'}`}>
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
                onClick={() => setActiveTab('Forms')}
                className="mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded hover:bg-yellow-200 transition-colors"
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

function Forms({ educationLevel, setEducationLevel }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Forms</h3>
      
      <div className="mb-6">
        <h4 className="text-base font-semibold text-gray-800 mb-4">Education Level</h4>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setEducationLevel('higher-ed')}
            className={`px-4 py-2 rounded-lg flex items-center text-base ${educationLevel === 'higher-ed' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-gray-100 text-gray-800 border border-gray-200'}`}
          >
            <FiAward className="w-4 h-4 mr-2" />
            Higher Education
          </button>
          <button
            onClick={() => setEducationLevel('senior-ed')}
            className={`px-4 py-2 rounded-lg flex items-center text-base ${educationLevel === 'senior-ed' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-gray-100 text-gray-800 border border-gray-200'}`}
          >
            <FiBook className="w-4 h-4 mr-2" />
            Senior High School
          </button>
          <button
            onClick={() => setEducationLevel('basic-ed')}
            className={`px-4 py-2 rounded-lg flex items-center text-base ${educationLevel === 'basic-ed' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-gray-100 text-gray-800 border border-gray-200'}`}
          >
            <FiUser className="w-4 h-4 mr-2" />
            Basic Education
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h4 className="text-base font-semibold text-gray-800 mb-4">
          {educationLevel === 'higher-ed' ? 'College Student Information' :
           educationLevel === 'senior-ed' ? 'Senior High School Information' :
           'Basic Education Information'}
        </h4>
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

      <div className="mt-6 flex justify-end space-x-3">
        <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
          Save Draft
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Submit Form
        </button>
      </div>
    </div>
  );
}

function Appointments({ 
  selectedDate, 
  setSelectedDate, 
  appointments, 
  setAppointments, 
  handleBookAppointment, 
  checkAppointmentsForDate 
}) {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [counselingForm, setCounselingForm] = useState({
    name: '',
    gradeSection: '',
    date: new Date().toISOString().split('T')[0],
    purpose: '',
    nature: '',
    referredBy: '',
    personalConcerns: [],
    educationConcerns: [],
    otherPersonalConcern: '',
    otherEducationConcern: '',
    remarks: ''
  });
  const [error, setError] = useState(null);

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

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (checked) {
        setCounselingForm(prev => ({
          ...prev,
          [name]: [...prev[name], value]
        }));
      } else {
        setCounselingForm(prev => ({
          ...prev,
          [name]: prev[name].filter(item => item !== value)
        }));
      }
    } else {
      setCounselingForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleMonthChange = (increment) => {
    const newDate = new Date(currentYear, currentMonth + increment, 1);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setCounselingForm(prev => ({
      ...prev,
      date: date.toISOString().split('T')[0]
    }));
  };

  const handleSubmitAppointment = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('Please log in to book an appointment.');
      return;
    }

    if (!counselingForm.name || !counselingForm.date || !counselingForm.purpose || !counselingForm.nature) {
      setError('Please fill out all required fields.');
      return;
    }

    const newAppointment = {
      userId: parseInt(userId),
      name: counselingForm.name,
      gradeSection: counselingForm.gradeSection,
      date: counselingForm.date,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
        setAppointments(prev => [...prev, {
          date: newAppointment.date,
          time: newAppointment.time,
          counselor: newAppointment.counselor,
          status: newAppointment.status,
          type: newAppointment.purpose
        }]);
        setIsAppointmentModalOpen(false);
        setCounselingForm({
          name: '',
          gradeSection: '',
          date: selectedDate.toISOString().split('T')[0],
          purpose: '',
          nature: '',
          referredBy: '',
          personalConcerns: [],
          educationConcerns: [],
          otherPersonalConcern: '',
          otherEducationConcern: '',
          remarks: ''
        });
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
    setCounselingForm(prev => ({
      ...prev,
      date: selectedDate.toISOString().split('T')[0]
    }));
    setIsAppointmentModalOpen(true);
    setError(null);
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
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
              const isToday = new Date().toDateString() === date.toDateString();
              const appointmentsForDate = checkAppointmentsForDate(date);
              const hasAppointments = appointmentsForDate.length > 0;

              return (
                <button
                  key={i}
                  onClick={() => handleDateSelect(date)}
                  className={`p-2 rounded-lg text-center text-sm flex flex-col items-center ${
                    isSelected 
                      ? 'bg-blue-600 text-white font-medium' 
                      : isToday
                        ? 'bg-blue-100 text-blue-800'
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
                      isSelected ? 'bg-white' : 'bg-blue-500'
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
            const appointmentsForDate = checkAppointmentsForDate(selectedDate);
            const dateStr = selectedDate.toISOString().split('T')[0];
            const todayStr = new Date().toISOString().split('T')[0];

            if (!appointmentsForDate.length) {
              return (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 text-sm mb-2">
                    {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-gray-500 text-sm">No appointments scheduled</p>
                  <button 
                    onClick={openAppointmentModal}
                    className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200 transition-colors"
                  >
                    Book Appointment
                  </button>
                </div>
              );
            }

            return (
              <div>
                <p className="text-gray-500 text-sm mb-2">
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
                {appointmentsForDate.map((appointment, index) => (
                  <div key={index} className={`p-4 rounded-lg border mb-2 last:mb-0 ${appointment.status === 'confirmed' ? 'bg-green-50 border-green-100' : 'bg-yellow-50 border-yellow-100'}`}>
                    <h4 className="font-medium text-gray-800 mb-1">{appointment.type}</h4>
                    <p className="text-gray-700 text-sm">Time: {appointment.time}</p>
                    <p className="text-gray-700 text-sm">Counselor: {appointment.counselor}</p>
                    <p className="text-gray-700 text-sm">Status: {appointment.status}</p>
                    {dateStr === todayStr && appointment.status === 'confirmed' && (
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
        {appointments.length === 0 ? (
          <p className="text-gray-500 text-sm">You have no upcoming appointments</p>
        ) : (
          <div className="space-y-3">
            {appointments.map((appointment, index) => (
              <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <span className="font-medium text-gray-700 text-base">{appointment.type}</span>
                  <p className="text-gray-600 text-sm">
                    {new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    {' at '}{appointment.time}
                  </p>
                  <p className="text-gray-600 text-sm">Counselor: {appointment.counselor}</p>
                </div>
                <span className={`text-sm ${appointment.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

{isAppointmentModalOpen && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full flex flex-col max-h-[90vh]">

      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b">
        <h3 className="text-xl font-bold text-gray-900">Counseling Appointment Form</h3>
        <button 
          onClick={() => setIsAppointmentModalOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <FiX size={24} />
        </button>
      </div>

      {/* Scrollable Form Content */}
      <div className="p-6 overflow-y-auto flex-1 text-gray-800">
        {/* === I. PERSONAL INFORMATION === */}
        <h3 className="font-bold text-lg mb-2">I. PERSONAL INFORMATION</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={counselingForm.name}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {/* Grade & Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grade & Section</label>
            <input
              type="text"
              name="gradeSection"
              value={counselingForm.gradeSection}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={counselingForm.date}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        {/* Purpose of Contact */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Purpose of Contact</label>
          <div className="space-y-2">
            {['Intake Interview', 'Consultation', 'Follow-up'].map((purpose) => (
              <label key={purpose} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="purpose"
                  value={purpose}
                  checked={counselingForm.purpose === purpose}
                  onChange={handleFormChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  required
                />
                <span>{purpose}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Nature of Contact */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Nature of Contact</label>
          <div className="space-y-2">
            {['Walk-in / Voluntary', 'Referral', 'Guidance Personnel Initiated'].map((nature) => (
              <label key={nature} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="nature"
                  value={nature}
                  checked={counselingForm.nature === nature}
                  onChange={handleFormChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  required
                />
                <span>{nature}</span>
              </label>
            ))}
          </div>
          {counselingForm.nature === 'Referral' && (
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Referred by</label>
              <input
                type="text"
                name="referredBy"
                value={counselingForm.referredBy}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
                required={counselingForm.nature === 'Referral'}
              />
            </div>
          )}
        </div>

        {/* II. AREAS OF CONCERN */}
        <h3 className="font-bold text-lg mb-2">II. AREAS OF CONCERN</h3>
        {/* Personal / Social */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2">A. Personal / Social</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              'Adjustment to school', 'Financial Problems', 'Health', 
              'Self-confidence / Self-esteem', 'Family Relationship', 
              'Friends', 'Romantic Relationship', 'Self-Identity Crisis',
              'Depression / Anxiety', 'Suicidal Ideation/Tendencies',
              'Addiction (drugs/alcohol)'
            ].map((concern) => (
              <label key={concern} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="personalConcerns"
                  value={concern}
                  checked={counselingForm.personalConcerns.includes(concern)}
                  onChange={handleFormChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm">{concern}</span>
              </label>
            ))}
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Concerns</label>
            <input
              type="text"
              name="otherPersonalConcern"
              value={counselingForm.otherPersonalConcern}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Specify other personal concerns"
            />
          </div>
        </div>

        {/* Education / Career */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2">B. Education / Career</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              'Academic Deficiency', 'Attendance', 'School Choice',
              'Failure', 'Study Habits'
            ].map((concern) => (
              <label key={concern} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="educationConcerns"
                  value={concern}
                  checked={counselingForm.educationConcerns.includes(concern)}
                  onChange={handleFormChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm">{concern}</span>
              </label>
            ))}
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Concerns</label>
            <input
              type="text"
              name="otherEducationConcern"
              value={counselingForm.otherEducationConcern}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Specify other education concerns"
            />
          </div>
        </div>

        {/* Remarks */}
        <h3 className="font-bold text-lg mb-2">III. REMARKS</h3>
        <textarea
          name="remarks"
          value={counselingForm.remarks}
          onChange={handleFormChange}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Footer */}
      <div className="p-6 border-t flex justify-end space-x-3">
        <button
          onClick={() => setIsAppointmentModalOpen(false)}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmitAppointment}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit Appointment
        </button>
      </div>
    </div>
  </div>
      )}
    </div>
  );
}