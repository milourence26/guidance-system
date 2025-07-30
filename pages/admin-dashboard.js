import { useState } from "react";
import { FiMenu, FiGrid, FiCalendar, FiColumns, FiUserPlus, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fullname, setFullname] = useState("Admin"); // You can set this from user data
  const router = useRouter();

  const handleLogout = () => {
    // Add your logout logic here
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen font-poppins bg-gray-100 overflow-hidden">
      {/* Sidebar - Fixed height with no scrolling */}
      <aside className={`bg-white text-black transition-all ${isSidebarOpen ? "w-64 p-5" : "w-20 p-3"} h-screen sticky top-0 flex flex-col`}>
        <div className="flex items-center justify-between">
          {isSidebarOpen && <img src="/images/shs-logo.png" alt="Logo" className="h-18 w-auto" />}
          <button className="text-black p-1 pl-3.5 pb-0" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FiMenu size={28} />
          </button>
        </div>
        <ul className="mt-4 space-y-2 flex-grow">
          <SidebarItem icon={FiGrid} label="Dashboard" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={FiCalendar} label="Manage User" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={FiColumns} label="Student Form" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={FiUserPlus} label="Personal Data Sheet" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          {/* inside personal data sheet is Higher-Education, Senior High School, Basic Education */}
        </ul>
        {/* Logout button fixed at bottom */}
        <div className="mt-auto">
          <div className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-gray-300 transition cursor-pointer" onClick={handleLogout}>
            <FiLogOut size={28} />
            {isSidebarOpen && <span>Log Out</span>}
          </div>
        </div>
      </aside>

      {/* Main Content - Scrollable */}
      <main className="flex-1 bg-gray-100 overflow-auto h-screen text-black">
        <div className="p-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold">{activeTab}</h2>
            <div className="flex items-center gap-5">
              {/* Profile Dropdown */}
              <div className="relative group" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                <button className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">A</div>
                  <span className="font-semibold text-black">{fullname}</span>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-0 w-30 bg-white border rounded-lg shadow-lg z-50">
                    <ul className="py-2">
                      <li className="px-4 py-2 hover:bg-gray-200 flex items-center gap-2 cursor-pointer" onClick={handleLogout}>
                        <FiLogOut size={18} /> Log Out
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="font-poppins">
            {activeTab === "Dashboard" && (
              <Dashboard />
            )}
            {activeTab === "Manage User" && (
              <ManageUser />
            )}
            {activeTab === "Student Form" && (
              <StudentForm />
            )}
            {activeTab === "Personal Data Sheet" && (
              <PersonalDataSheet />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, activeTab, setActiveTab, isSidebarOpen }) {
  return (
    <li
      className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition ${activeTab === label ? "bg-blue-100 text-blue-600" : "hover:bg-gray-200"}`}
      onClick={() => setActiveTab(label)}
    >
      <Icon size={24} />
      {isSidebarOpen && <span>{label}</span>}
    </li>
  );
}

function Dashboard() {
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md text-black">
      {/* Dashboard content here */}
      <h3 className="text-lg font-semibold mb-4">Dashboard Overview</h3>
      <p>Welcome to the admin dashboard. Here you can manage users, student forms, and personal data sheets.</p>
    </div>
  );
}

function ManageUser() {
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md text-black">
      {/* Manage User content here */}
      <h3 className="text-lg font-semibold mb-4">User Management</h3>
      <p>Manage user accounts and permissions here.</p>
    </div>
  );
}

function StudentForm() {
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md text-black">
      {/* Student Form content here */}
      <h3 className="text-lg font-semibold mb-4">Student Forms</h3>
      <p>View and manage student forms here.</p>
    </div>
  );
}

function PersonalDataSheet() {
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md text-black">
      {/* Personal Data Sheet content here */}
      <h3 className="text-lg font-semibold mb-4">Personal Data Sheets</h3>
      <p>Manage personal data sheets including:</p>
      <ul className="list-disc pl-5 mt-2">
        <li>Higher-Education</li>
        <li>Senior High School</li>
        <li>Basic Education</li>
      </ul>
    </div>
  );
}