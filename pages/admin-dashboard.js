import React, { useState } from 'react';
import { 
  Home, FileText, PieChart, Settings, ChevronDown, ChevronRight, Menu, X, 
  Users, BookOpen, GraduationCap, User, Bell, Search, Calendar, 
  TrendingUp, UserCheck, FileCheck, AlertCircle, Plus, Eye, Edit, Trash2,
  Download, Filter, MoreVertical
} from "lucide-react";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState({ 'Personal Data': true, 'Reports': true });
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    {
      title: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      path: '/',
      subItems: []
    },
    {
      title: 'Student Form',
      icon: <FileText className="w-5 h-5" />,
      path: '/student-form',
      subItems: []
    },
    {
      title: 'Personal Data',
      icon: <User className="w-5 h-5" />,
      subItems: [
        { title: 'Higher Education', path: '/college-form', icon: <GraduationCap className="w-4 h-4" /> },
        { title: 'Senior Education', path: '/personal-data/senior-ed', icon: <GraduationCap className="w-4 h-4" /> },
        { title: 'Basic Education', path: '/basic-ed', icon: <BookOpen className="w-4 h-4" /> }
      ]
    },
    {
      title: 'Reports',
      icon: <PieChart className="w-5 h-5" />,
      subItems: [
        { title: 'Student Reports', path: '/reports/student', icon: <Users className="w-4 h-4" /> },
        { title: 'Faculty Reports', path: '/reports/faculty', icon: <Users className="w-4 h-4" /> },
        { title: 'College Reports', path: '/reports/college', icon: <GraduationCap className="w-4 h-4" /> }
      ]
    },
    {
      title: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/settings',
      subItems: []
    }
  ];

  const statsCards = [
    { title: 'Total Students', value: '2,847', change: '+12%', icon: <Users className="w-6 h-6" />, color: 'blue' },
    { title: 'Active Forms', value: '156', change: '+8%', icon: <FileText className="w-6 h-6" />, color: 'green' },
    { title: 'Completed Assessments', value: '1,234', change: '+15%', icon: <FileCheck className="w-6 h-6" />, color: 'purple' },
    { title: 'Pending Reviews', value: '23', change: '-5%', icon: <AlertCircle className="w-6 h-6" />, color: 'orange' }
  ];

  const recentStudents = [
    { id: 1, name: 'John Doe', email: 'john@example.com', course: 'Computer Science', status: 'Active', date: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', course: 'Psychology', status: 'Pending', date: '2024-01-14' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', course: 'Engineering', status: 'Active', date: '2024-01-13' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', course: 'Education', status: 'Completed', date: '2024-01-12' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', course: 'Business', status: 'Active', date: '2024-01-11' }
  ];

  const recentActivities = [
    { type: 'registration', description: 'New student registered', time: '2 minutes ago', color: 'blue' },
    { type: 'submission', description: 'Form submitted', time: '15 minutes ago', color: 'green' },
    { type: 'assessment', description: 'Assessment pending review', time: '1 hour ago', color: 'yellow' },
    { type: 'report', description: 'Report generated', time: '3 hours ago', color: 'purple' }
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const toggleExpand = (itemTitle) => {
    setExpandedItems(prev => ({ ...prev, [itemTitle]: !prev[itemTitle] }));
  };

  const isActive = (path) => path === '/';

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredStudents = recentStudents.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const Sidebar = () => (
    <aside className={`fixed top-0 left-0 h-full z-20 transition-all duration-300 ease-in-out
      bg-white text-gray-800 ${sidebarOpen ? 'w-64' : 'w-20'} shadow-lg border-r border-gray-200`}>
      
      <div className={`flex items-center p-4 border-b border-gray-200 
        ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
        {sidebarOpen && (
          <h2 className="text-xl font-semibold text-blue-600 whitespace-nowrap">Guidance Portal</h2>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <nav className="overflow-y-auto h-[calc(100%-68px)] p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.title}>
              {item.subItems.length > 0 ? (
                <>
                  <button 
                    onClick={() => toggleExpand(item.title)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors
                      ${isActive(item.path) || item.subItems.some(sub => isActive(sub.path))
                        ? 'bg-blue-50 text-blue-600'
                        : 'hover:bg-gray-100 text-gray-700'}`}
                  >
                    <div className="flex items-center">
                      <span className={`${isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}`}>
                        {item.icon}
                      </span>
                      {sidebarOpen && <span className="ml-3 font-medium whitespace-nowrap">{item.title}</span>}
                    </div>
                    {sidebarOpen && (
                      <span className={`transition-transform duration-200 ${expandedItems[item.title] ? 'text-blue-600' : 'text-gray-400'}`}>
                        {expandedItems[item.title] ? 
                          <ChevronDown className="w-4 h-4" /> : 
                          <ChevronRight className="w-4 h-4" />}
                      </span>
                    )}
                  </button>

                  {sidebarOpen && expandedItems[item.title] && (
                    <ul className="ml-2 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.title}>
                          <a
                            href={subItem.path}
                            className={`flex items-center p-2 pl-8 rounded-lg text-sm transition-colors
                              ${isActive(subItem.path)
                                ? 'bg-blue-100 text-blue-600 font-medium'
                                : 'hover:bg-gray-100 text-gray-600'}`}
                          >
                            {subItem.icon && (
                              <span className="mr-2">
                                {subItem.icon}
                              </span>
                            )}
                            <span className="whitespace-nowrap">{subItem.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <a
                  href={item.path}
                  className={`flex items-center p-3 rounded-lg transition-colors
                    ${isActive(item.path)
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  <span className={`${isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>
                  {sidebarOpen && <span className="ml-3 font-medium whitespace-nowrap">{item.title}</span>}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search students, forms..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <button 
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 mb-8 text-white">
            <h2 className="text-2xl font-bold mb-2">Welcome back, Admin</h2>
            <p className="opacity-90">Here's what's happening with your guidance portal today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <div className={`flex items-center mt-2 text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>{stat.change} from last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color === 'blue' ? 'bg-blue-100' : stat.color === 'green' ? 'bg-green-100' : stat.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'}`}>
                    <div className={stat.color === 'blue' ? 'text-blue-600' : stat.color === 'green' ? 'text-green-600' : stat.color === 'purple' ? 'text-purple-600' : 'text-orange-600'}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Students Table */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Students</h3>
                  <div className="flex items-center space-x-2">
                    <button 
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      aria-label="Add new student"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Student
                    </button>
                    <button 
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                      aria-label="Filter students"
                    >
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.course}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.status)}`}>
                              {student.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                              <button 
                                className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                aria-label={`View ${student.name}`}
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                className="p-1 text-green-600 hover:bg-green-100 rounded"
                                aria-label={`Edit ${student.name}`}
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                className="p-1 text-red-600 hover:bg-red-100 rounded"
                                aria-label={`Delete ${student.name}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                          No students found matching your search
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions & Analytics */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    className="w-full flex items-center p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    aria-label="Create new form"
                  >
                    <FileText className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-sm font-medium">Create New Form</span>
                  </button>
                  <button 
                    className="w-full flex items-center p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    aria-label="Export reports"
                  >
                    <Download className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm font-medium">Export Reports</span>
                  </button>
                  <button 
                    className="w-full flex items-center p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    aria-label="Review pending items"
                  >
                    <UserCheck className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-sm font-medium">Review Pending</span>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <button 
                    className="text-sm text-blue-600 hover:text-blue-800"
                    aria-label="View all activities"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className={`w-2 h-2 mt-2 rounded-full mr-3 ${activity.color === 'blue' ? 'bg-blue-500' : activity.color === 'green' ? 'bg-green-500' : activity.color === 'yellow' ? 'bg-yellow-500' : 'bg-purple-500'}`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;