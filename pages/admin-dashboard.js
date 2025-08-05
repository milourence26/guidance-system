import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import {
  FiMenu, FiGrid, FiUsers, FiFileText, FiUser, FiLogOut, FiChevronDown,
  FiChevronRight, FiBook, FiAward, FiHome, FiCalendar, FiClock, FiSettings,
  FiBell, FiSearch, FiBarChart, FiTrendingUp, FiUserCheck, FiPlus
} from "react-icons/fi";
import BasicEdForm from '../components/Basic-ed/BasicEdForm';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const FAMILY_INCOME_RANGES = ['Below ₱10,000.00', '₱10,001 - ₱15,000', '₱15,001 - ₱20,000', '₱20,001 - ₱25,000', '₱25,001 - ₱30,000', 'Above ₱30,000'];
const RELATIONSHIP_OPTIONS = ['sister/brother', 'aunt/uncle', 'land lord/lady', 'grandparents', 'other'];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
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
  const [newStudent, setNewStudent] = useState({
    studentType: 'New',
    studentPhotoUrl: '',
    lastName: '',
    givenName: '',
    middleName: '',
    suffix: '',
    gender: '',
    citizenship: '',
    age: '',
    address: '',
    birthMonth: '',
    birthDay: '',
    birthYear: '',
    birthPlace: '',
    contactNumber: '',
    religion: '',
    baptism: { received: false, date: '', church: '' },
    firstCommunion: { received: false, date: '', church: '' },
    confirmation: { received: false, date: '', church: '' },
    fatherName: '',
    fatherOccupation: '',
    fatherStatus: '',
    fatherEducation: '',
    motherName: '',
    motherOccupation: '',
    motherStatus: '',
    motherEducation: '',
    parentsMaritalStatus: '',
    residenceType: '',
    languagesSpoken: '',
    familyIncome: '',
    financialSupport: [],
    otherFinancialSupport: '',
    leisureActivities: [],
    otherLeisureActivities: '',
    specialInterests: '',
    livingWithParents: true,
    guardianName: '',
    guardianRelation: '',
    otherGuardianRelation: '',
    guardianAddress: '',
    siblings: Array(4).fill().map(() => ({ name: '', age: '', school: '', status: '', occupation: '' })),
    educationBackground: {
      preschool: { school: '', awards: '', year: '' },
      gradeSchool: { school: '', awards: '', year: '' },
      highSchool: { school: '', awards: '', year: '' },
    },
    organizations: Array(4).fill().map(() => ({ year: '', organization: '', designation: '' })),
    healthProblem: 'No',
    healthProblemDetails: '',
    generalCondition: '',
    underMedication: 'No',
    medicationDetails: '',
    specialCare: 'No',
    specialCareDetails: '',
    lastDoctorVisit: '',
    doctorVisitReason: '',
    testResults: Array(3).fill().map(() => ({ test: '', date: '', rating: '' })),
    signatureName: '',
    signatureDate: '',
    parentSignatureName: '',
    parentSignatureDate: '',
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const initialStudentState = {
    studentType: 'New',
    studentPhotoUrl: '',
    lastName: '',
    givenName: '',
    middleName: '',
    suffix: '',
    gender: '',
    citizenship: '',
    age: '',
    address: '',
    birthMonth: '',
    birthDay: '',
    birthYear: '',
    birthPlace: '',
    contactNumber: '',
    religion: '',
    baptism: { received: false, date: '', church: '' },
    firstCommunion: { received: false, date: '', church: '' },
    confirmation: { received: false, date: '', church: '' },
    fatherName: '',
    fatherOccupation: '',
    fatherStatus: '',
    fatherEducation: '',
    motherName: '',
    motherOccupation: '',
    motherStatus: '',
    motherEducation: '',
    parentsMaritalStatus: '',
    residenceType: '',
    languagesSpoken: '',
    familyIncome: '',
    financialSupport: [],
    otherFinancialSupport: '',
    leisureActivities: [],
    otherLeisureActivities: '',
    specialInterests: '',
    livingWithParents: true,
    guardianName: '',
    guardianRelation: '',
    otherGuardianRelation: '',
    guardianAddress: '',
    siblings: Array(4).fill().map(() => ({ name: '', age: '', school: '', status: '', occupation: '' })),
    educationBackground: {
      preschool: { school: '', awards: '', year: '' },
      gradeSchool: { school: '', awards: '', year: '' },
      highSchool: { school: '', awards: '', year: '' },
    },
    organizations: Array(4).fill().map(() => ({ year: '', organization: '', designation: '' })),
    healthProblem: 'No',
    healthProblemDetails: '',
    generalCondition: '',
    underMedication: 'No',
    medicationDetails: '',
    specialCare: 'No',
    specialCareDetails: '',
    lastDoctorVisit: '',
    doctorVisitReason: '',
    testResults: Array(3).fill().map(() => ({ test: '', date: '', rating: '' })),
    signatureName: '',
    signatureDate: '',
    parentSignatureName: '',
    parentSignatureDate: '',
  };

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName') || 'Dr. Maria';
    const storedLastName = localStorage.getItem('lastName') || 'Santos';
    setFirstName(storedFirstName);
    setLastName(storedLastName);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSacramentChange = (sacrament, field, value) => {
    setNewStudent({
      ...newStudent,
      [sacrament]: { ...newStudent[sacrament], [field]: value },
    });
  };

  const handleSiblingChange = (index, field, value) => {
    const updatedSiblings = [...newStudent.siblings];
    updatedSiblings[index] = { ...updatedSiblings[index], [field]: value };
    setNewStudent({ ...newStudent, siblings: updatedSiblings });
  };

  const handleEducationChange = (level, field, value) => {
    setNewStudent({
      ...newStudent,
      educationBackground: {
        ...newStudent.educationBackground,
        [level]: {
          ...newStudent.educationBackground[level],
          [field]: value,
        },
      },
    });
  };

  const handleOrganizationChange = (index, field, value) => {
    const updatedOrganizations = [...newStudent.organizations];
    updatedOrganizations[index] = { ...updatedOrganizations[index], [field]: value };
    setNewStudent({ ...newStudent, organizations: updatedOrganizations });
  };

  const handleTestResultChange = (index, field, value) => {
    const updatedTestResults = [...newStudent.testResults];
    updatedTestResults[index] = { ...updatedTestResults[index], [field]: value };
    setNewStudent({ ...newStudent, testResults: updatedTestResults });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newStudent.lastName) newErrors.lastName = 'Last Name is required';
    if (!newStudent.givenName) newErrors.givenName = 'Given Name is required';
    return newErrors;
  };

  const handleAddStudent = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Simulate saving the student data
    console.log('Saving student:', newStudent);
    setShowModal(false);
    setNewStudent(initialStudentState);
    setErrors({});
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
          <SidebarItem icon={FiCalendar} label="Availability Schedule" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={FiUsers} label="Manage Users" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={FiFileText} label="Student Forms" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          
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
          {activeTab === "Dashboard" && <Dashboard stats={stats} />}
          {activeTab === "Availability Schedule" && <AvailabilitySchedule selectedDate={selectedDate} setSelectedDate={setSelectedDate} availabilityHours={availabilityHours} setAvailabilityHours={setAvailabilityHours} />}
          {activeTab === "Manage Users" && <ManageUsers />}
          {activeTab === "Student Forms" && <StudentForms />}
          {activeTab === "Reports" && <Reports />}
          {activeTab === "Logs" && <Logs />}
          {activeTab.startsWith("PDS") && (
            <PersonalDataSheet 
              type={activeTab.replace("PDS - ", "")} 
              showModal={showModal} 
              setShowModal={setShowModal} 
              newStudent={newStudent} 
              setNewStudent={setNewStudent} 
              errors={errors} 
              setErrors={setErrors} 
              handleInputChange={handleInputChange}
              handleSacramentChange={handleSacramentChange}
              handleSiblingChange={handleSiblingChange}
              handleEducationChange={handleEducationChange}
              handleOrganizationChange={handleOrganizationChange}
              handleTestResultChange={handleTestResultChange}
              handleAddStudent={handleAddStudent}
              initialStudentState={initialStudentState}
            />
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
  const [availableDays, setAvailableDays] = useState([1, 2, 3, 4, 5]);
  const [isAvailable, setIsAvailable] = useState(false);
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  useEffect(() => {
    const dayOfWeek = selectedDate.getDay();
    setIsAvailable(availableDays.includes(dayOfWeek));
  }, [selectedDate, availableDays]);

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
              const currentDate = new Date(currentYear, currentMonth, date);
              const dayOfWeek = currentDate.getDay();
              const isToday = date === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
              const isAvailableDay = availableDays.includes(dayOfWeek);
              
              return (
                <button
                  key={date}
                  className={`p-2 text-sm rounded-lg transition-colors ${
                    isToday 
                      ? 'bg-blue-500 text-white font-medium' 
                      : isAvailableDay 
                        ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedDate(new Date(currentYear, currentMonth, date))}
                >
                  {date}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Availability Settings</h3>
          
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Available Days</h4>
            <div className="flex flex-wrap gap-2">
              {dayNames.map((day, index) => (
                <button
                  key={day}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    availableDays.includes(index) 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => toggleDay(index)}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Available Hours</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Start Time</label>
                <input
                  type="time"
                  value={availabilityHours.start}
                  onChange={(e) => setAvailabilityHours({ ...availabilityHours, start: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">End Time</label>
                <input
                  type="time"
                  value={availabilityHours.end}
                  onChange={(e) => setAvailabilityHours({ ...availabilityHours, end: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <button
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <FiSave size={16} />
            Save Schedule
          </button>
        </div>
      </div>
    </div>
  );
}

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'GET',
        headers: { 
          'x-usertype': localStorage.getItem('usertype') || '',
          'x-user-id': localStorage.getItem('userId') || '',
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
        setError('');
      } else {
        setError(data.error || 'Failed to fetch users');
      }
    } catch (error) {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
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
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-usertype': localStorage.getItem('usertype') || '',
          'x-user-id': localStorage.getItem('userId') || '',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setUsers([...users, data.user]);
        setIsCreateModalOpen(false);
        setFormData({
          username: '',
          email: '',
          password: '',
          usertype: 'student',
          firstName: '',
          lastName: '',
          status: 'active',
        });
      } else {
        setError(data.error || 'Failed to create user');
      }
    } catch (error) {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-usertype': localStorage.getItem('usertype') || '',
          'x-user-id': localStorage.getItem('userId') || '',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(users.map(user => (user.id === selectedUser.id ? data.user : user)));
        setIsEditModalOpen(false);
        setSelectedUser(null);
        setFormData({
          username: '',
          email: '',
          password: '',
          usertype: 'student',
          firstName: '',
          lastName: '',
          status: 'active',
        });
      } else {
        setError(data.error || 'Failed to update user');
      }
    } catch (error) {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
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
    setIsLoading(true);

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { 
          'x-usertype': localStorage.getItem('usertype') || '',
          'x-user-id': localStorage.getItem('userId') || '',
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(users.filter(user => user.id !== id));
      } else {
        setError(data.error || 'Failed to delete user');
      }
    } catch (error) {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: '', // Leave empty to avoid accidental password changes
      usertype: user.usertype,
      firstName: user.first_name,
      lastName: user.last_name,
      status: user.status,
    });
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">User Management</h3>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Add New User
          </button>
        </div>
      </div>

      {error && (
        <div className="m-6 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="p-6 text-center text-gray-500">Loading...</div>
      ) : (
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{`${user.first_name} ${user.last_name}`}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.usertype}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => openEditModal(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create User Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New User</h3>
            {error && (
              <div className="mb-4 p-2 bg-red-50 text-red-700 text-sm rounded-lg">{error}</div>
            )}
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">User Type</label>
                <select
                  name="usertype"
                  value={formData.usertype}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                  <option value="guidance_advocate">Guidance Advocate</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit User</h3>
            {error && (
              <div className="mb-4 p-2 bg-red-50 text-red-700 text-sm rounded-lg">{error}</div>
            )}
            <form onSubmit={handleEditUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password (leave blank to keep unchanged)</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">User Type</label>
                <select
                  name="usertype"
                  value={formData.usertype}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                  <option value="guidance_advocate">Guidance Advocate</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StudentForms() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Forms</h3>
      <p className="text-gray-600">Student forms management will be implemented here.</p>
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

function PersonalDataSheet({ 
  type, 
  showModal, 
  setShowModal, 
  newStudent, 
  setNewStudent, 
  errors, 
  setErrors, 
  handleInputChange, 
  handleSacramentChange, 
  handleSiblingChange, 
  handleEducationChange, 
  handleOrganizationChange, 
  handleTestResultChange, 
  handleAddStudent, 
  initialStudentState 
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Personal Data Sheet - {type}</h3>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FiPlus size={16} />
          Add New Student
        </button>
      </div>

      {type === "Basic Education" && (
        <BasicEdForm
          showModal={showModal}
          setShowModal={setShowModal}
          newStudent={newStudent}
          setNewStudent={setNewStudent}
          errors={errors}
          setErrors={setErrors}
          handleInputChange={handleInputChange}
          handleSacramentChange={handleSacramentChange}
          handleSiblingChange={handleSiblingChange}
          handleEducationChange={handleEducationChange}
          handleOrganizationChange={handleOrganizationChange}
          handleTestResultChange={handleTestResultChange}
          handleAddStudent={handleAddStudent}
          initialStudentState={initialStudentState}
        />
      )}

      {type !== "Basic Education" && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-gray-600">Personal Data Sheet for {type} will be implemented here.</p>
        </div>
      )}
    </div>
  );
}