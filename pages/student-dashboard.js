import React, { useState, useEffect } from 'react';
import { 
  Home, Calendar, Clock, User, BookOpen, GraduationCap, FileText, 
  CheckCircle, XCircle, Bell, Search, ChevronDown, ChevronRight,
  Plus, Clock4, UserCheck, AlertCircle, Download, Settings
} from "lucide-react";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [educationLevel, setEducationLevel] = useState('higher-ed'); // 'higher-ed', 'senior-ed', 'basic-ed'
  const [guidanceAvailability, setGuidanceAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [formData, setFormData] = useState({
    personalInfo: {},
    academicInfo: {},
    counselingNeeds: {}
  });

  // Mock data for guidance counselor availability
  useEffect(() => {
    // This would normally come from an API
    const mockAvailability = [
      { date: '2024-02-01', slots: ['09:00', '11:00', '14:00'] },
      { date: '2024-02-02', slots: ['10:00', '13:00', '15:00'] },
      { date: '2024-02-05', slots: ['09:30', '11:30', '14:30'] },
    ];
    setGuidanceAvailability(mockAvailability);

    // Mock upcoming appointments
    setUpcomingAppointments([
      { date: '2024-02-01', time: '11:00', counselor: 'Dr. Smith', status: 'confirmed' },
      { date: '2024-02-08', time: '14:30', counselor: 'Ms. Johnson', status: 'pending' }
    ]);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Here you would fetch availability for the selected date
  };

  const handleScheduleAppointment = (time) => {
    setSelectedTimeSlot(time);
    setShowScheduleModal(true);
  };

  const confirmAppointment = () => {
    // Here you would send the appointment request to the server
    alert(`Appointment scheduled for ${selectedDate.toDateString()} at ${selectedTimeSlot}`);
    setShowScheduleModal(false);
  };

  const renderFormBasedOnLevel = () => {
    switch(educationLevel) {
      case 'higher-ed':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">College Student Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year Level</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                    <option>5th Year+</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Concerns</label>
                  <textarea rows={3} className="w-full p-2 border border-gray-300 rounded-lg"></textarea>
                </div>
              </div>
            </div>
          </div>
        );
      case 'senior-ed':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Senior High School Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Strand</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option>STEM</option>
                    <option>ABM</option>
                    <option>HUMSS</option>
                    <option>GAS</option>
                    <option>TVL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option>Grade 11</option>
                    <option>Grade 12</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Career Guidance Needs</label>
                  <textarea rows={3} className="w-full p-2 border border-gray-300 rounded-lg"></textarea>
                </div>
              </div>
            </div>
          </div>
        );
      case 'basic-ed':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Basic Education Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    {Array.from({length: 10}, (_, i) => (
                      <option key={i+1}>Grade {i+1}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Behavioral Notes</label>
                  <textarea rows={3} className="w-full p-2 border border-gray-300 rounded-lg"></textarea>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const checkAvailabilityForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return guidanceAvailability.find(day => day.date === dateStr);
  };

  const formatDate = (dateStr) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">Student Guidance Portal</h1>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
              <GraduationCap className="w-4 h-4" />
              <span className="capitalize">
                {educationLevel === 'higher-ed' ? 'College' : 
                 educationLevel === 'senior-ed' ? 'Senior High' : 'Basic Education'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">Student User</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Dashboard Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <div className="flex items-center">
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </div>
          </button>
          <button
            onClick={() => setActiveTab('forms')}
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'forms' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              My Forms
            </div>
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'schedule' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </div>
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Welcome, Student!</h2>
              <p>Check your upcoming appointments and complete any pending forms.</p>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Upcoming Appointments
              </h3>
              
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appt, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium">{formatDate(appt.date)} at {appt.time}</p>
                        <p className="text-sm text-gray-600">With {appt.counselor}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        appt.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appt.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No upcoming appointments scheduled</p>
              )}
              
              <button 
                onClick={() => setActiveTab('schedule')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Schedule New Appointment
              </button>
            </div>

            {/* Pending Forms */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Pending Forms
              </h3>
              
              <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6">Student Forms</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Education Level</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setEducationLevel('higher-ed')}
                    className={`px-4 py-2 rounded-lg flex items-center ${educationLevel === 'higher-ed' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-gray-100 text-gray-800 border border-gray-200'}`}
                  >
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Higher Education
                  </button>
                  <button
                    onClick={() => setEducationLevel('senior-ed')}
                    className={`px-4 py-2 rounded-lg flex items-center ${educationLevel === 'senior-ed' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-gray-100 text-gray-800 border border-gray-200'}`}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Senior High School
                  </button>
                  <button
                    onClick={() => setEducationLevel('basic-ed')}
                    className={`px-4 py-2 rounded-lg flex items-center ${educationLevel === 'basic-ed' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-gray-100 text-gray-800 border border-gray-200'}`}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Basic Education
                  </button>
                </div>
              </div>

              {renderFormBasedOnLevel()}

              <div className="mt-6 flex justify-end space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6">Schedule Guidance Appointment</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar Section */}
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">Select Date</h3>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                    
                    {/* This would be replaced with a proper calendar component */}
                    {Array.from({length: 35}).map((_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() + i - date.getDay());
                      const dateStr = date.toISOString().split('T')[0];
                      const isAvailable = guidanceAvailability.some(day => day.date === dateStr);
                      
                      return (
                        <button
                          key={i}
                          onClick={() => handleDateChange(date)}
                          disabled={!isAvailable}
                          className={`p-2 rounded-lg text-center ${isAvailable ? 'hover:bg-blue-50' : 'opacity-50'} ${
                            selectedDate.toDateString() === date.toDateString() ? 'bg-blue-100 text-blue-800 font-medium' : ''
                          }`}
                        >
                          {date.getDate()}
                          {isAvailable && (
                            <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-1"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Time Slots */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
                  {checkAvailabilityForDate(selectedDate) ? (
                    <div className="space-y-2">
                      {checkAvailabilityForDate(selectedDate).slots.map((time, index) => (
                        <button
                          key={index}
                          onClick={() => handleScheduleAppointment(time)}
                          className="w-full p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 text-left flex items-center"
                        >
                          <Clock4 className="w-4 h-4 mr-2 text-blue-600" />
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-500">
                      No availability on selected date
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Scheduled Appointments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Your Scheduled Appointments</h3>
              
              {upcomingAppointments.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {upcomingAppointments.map((appt, index) => (
                    <div key={index} className="py-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{formatDate(appt.date)} at {appt.time}</p>
                        <p className="text-sm text-gray-600">With {appt.counselor}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          appt.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appt.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                        </span>
                        <button className="p-1 text-gray-500 hover:text-red-500">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">You have no scheduled appointments</p>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Schedule Appointment Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Appointment</h3>
            <p className="mb-2">You're scheduling an appointment with a guidance counselor on:</p>
            <p className="font-medium mb-6">{selectedDate.toDateString()} at {selectedTimeSlot}</p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Appointment</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>Academic Counseling</option>
                <option>Career Guidance</option>
                <option>Personal Concerns</option>
                <option>Other</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={confirmAppointment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;