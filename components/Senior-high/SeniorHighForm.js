// SeniorHighForm.js
import { useState, useRef } from 'react';
import { FiX, FiPlus, FiEdit2, FiSave, FiArchive, FiUser, FiPhone, FiMail, FiCalendar, FiUpload, FiImage, FiEye, FiPrinter } from 'react-icons/fi';
import SeniorHighModal from './SeniorHighModal';

export default function SeniorHighSchoolForm() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('personal');
  const [viewingStudent, setViewingStudent] = useState(null);
  const [printingStudent, setPrintingStudent] = useState(null);
  const fileInputRef = useRef(null);
  
  const initialStudentState = {
    // School Information
    academicYear: '',
    gradeLevel: 'Grade 11',
    strand: '',
    studentType: 'New', // New, Transferee, Returnee, Old
    status: 'Active',
    archived: false,
    lrn: '',
    
    // Personal Data
    lastName: '',
    firstName: '',
    middleName: '',
    gender: '', // Male, Female
    citizenship: '',
    contactNumber: '',
    address: '',
    birthDate: '',
    birthPlace: '',
    religion: '',
    
    // Residence Information
    residenceType: '', // Rented, Owned
    residenceOwner: '', // Name of owner if rented
    languagesSpokenAtHome: '',
    
    // Financial Support
    financialSupport: [], // Parents, Grandparents, Others
    otherFinancialSupport: '',
    
    // Leisure Activities
    leisureActivities: [], // Listening to radio, Watching TV, Picnic, Others
    otherLeisureActivity: '',
    
    // Special Talents
    specialTalents: '',
    
    // If not living with parents
    guardianAddress: '',
    guardianGraduationName: '',
    guardianGraduationAddress: '',
    
    // Sacraments
    baptism: {
      received: false,
      date: '',
      church: ''
    },
    firstCommunion: {
      received: false,
      date: '',
      church: ''
    },
    confirmation: {
      received: false,
      date: '',
      church: ''
    },
    
    // Emergency Contact
    emergencyContact: '',
    emergencyRelation: '',
    emergencyNumber: '',
    
    // Family Information
    father: {
      lastName: '',
      firstName: '',
      middleName: '',
      occupation: '',
      location: '', // Overseas, Local
      employmentType: '', // Private, Govt
      status: '', // Employed, Unemployed, Deceased, Retired, Disabled
      education: '', // Some Elementary, Elementary, Some High School, High School, Some College, College Degree, MS/MA, PhD
      specialization: ''
    },
    
    mother: {
      lastName: '',
      firstName: '',
      middleName: '',
      occupation: '',
      location: '', // Overseas, Local
      employmentType: '', // Private, Govt
      status: '', // Employed, Unemployed, Deceased, Retired, Disabled
      education: '', // Some Elementary, Elementary, Some High School, High School, Some College, College Degree, MS/MA, PhD
      specialization: ''
    },
    
    parentsMaritalStatus: '', // Sacramental Marriage, Civil, Both Parent, Legally Separated, Annulled, Unmarried
    birthOrder: '', // 1st, 2nd, 3rd, 4th, 5th, 6th, 7th, others
    siblingsCount: 0,
    otherRelativesAtHome: [], // Brother/s, Sister/s, Grand Parents, Uncle, Aunt, Step Brother/s, Step Sister/s, Cousins, Others
    familyMonthlyIncome: '', // Below ₱10,000.00, ₱10,001-₱13,000, etc.
    
    siblings: [
      { name: '', age: '', school: '', status: '', occupation: '' },
      { name: '', age: '', school: '', status: '', occupation: '' },
      { name: '', age: '', school: '', status: '', occupation: '' },
      { name: '', age: '', school: '', status: '', occupation: '' },
      { name: '', age: '', school: '', status: '', occupation: '' },
      { name: '', age: '', school: '', status: '', occupation: '' }
    ],
    
    // Educational Background
    preschool: {
      school: '',
      awards: '',
      year: ''
    },
    elementary: {
      school: '',
      awards: '',
      year: ''
    },
    highSchool: {
      school: '',
      awards: '',
      year: ''
    },
    seniorHigh: {
      school: '',
      awards: '',
      year: ''
    },
    
    // Health Information
    weight: '',
    physicalCondition: '', // Good, Fair, Poor
    healthProblem: '', // Yes, No
    healthProblemDetails: '',
    lastDoctorVisit: '',
    lastDoctorVisitReason: '',
    generalCondition: '', // Good Condition, Under Medication, With Special Care/Attention
    
    // Test Results
    testResults: [
      { testName: '', dateTaken: '', rating: '' }
    ],
    
    // Student Photo
    studentPhoto: null,
    studentPhotoUrl: '',
    
    // Consent
    signature: '',
    signatureDate: '',
    parentSignature: '',
    parentSignatureDate: ''
  };

  const [newStudent, setNewStudent] = useState(initialStudentState);

  // Validate required fields
  const validateForm = () => {
    const newErrors = {};
    if (!newStudent.lastName) newErrors.lastName = 'Last name is required';
    if (!newStudent.firstName) newErrors.firstName = 'First name is required';
    if (!newStudent.lrn) newErrors.lrn = 'LRN is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewStudent(prev => ({
          ...prev,
          studentPhoto: file,
          studentPhotoUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Filter students based on search and archive status
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.contactNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lrn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArchive = showArchived ? student.archived : !student.archived;
    return matchesSearch && matchesArchive;
  });

  const handleArchive = (id) => {
    setStudents(students.map(student => 
      student.id === id ? {...student, archived: !student.archived} : student
    ));
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setEditForm({...student});
    setShowModal(true);
  };

  const handleView = (student) => {
    setViewingStudent(student);
  };

  const handlePrint = (student) => {
    setPrintingStudent(student);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleSave = () => {
    setStudents(students.map(student => 
      student.id === editingId ? {...editForm} : student
    ));
    setEditingId(null);
  };

  const handleAddStudent = () => {
    if (!validateForm()) return;
    
    const id = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const studentToAdd = {
      ...newStudent,
      id,
      birthDate: newStudent.birthDate,
      fullName: `${newStudent.lastName}, ${newStudent.firstName} ${newStudent.middleName}`
    };
    
    setStudents([...students, studentToAdd]);
    setShowModal(false);
    setNewStudent(initialStudentState);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({...prev, [name]: value}));
    // Clear error when field is filled
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSiblingChange = (index, field, value) => {
    const updatedSiblings = [...newStudent.siblings];
    updatedSiblings[index] = { ...updatedSiblings[index], [field]: value };
    setNewStudent(prev => ({...prev, siblings: updatedSiblings}));
  };

  const handleSacramentChange = (sacrament, field, value) => {
    setNewStudent(prev => ({
      ...prev,
      [sacrament]: {
        ...prev[sacrament],
        [field]: value
      }
    }));
  };

  const handleCheckboxChange = (field, value) => {
    const current = newStudent[field] || [];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    setNewStudent(prev => ({ ...prev, [field]: updated }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 mb-8 border border-gray-100">
        <h1 className="text-3xl font-bold mb-2 text-blue-800">Student Personal Data Management</h1>
        <p className="text-gray-600 mb-6">St. Rita's College of Balingasag - Senior High School Department</p>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by name, LRN or contact number..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          
          <div className="flex items-center gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showArchived}
                onChange={() => setShowArchived(!showArchived)}
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Show Archived</span>
            </label>
            
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FiPlus className="w-5 h-5" />
              Add Student
            </button>
          </div>
        </div>
        
        {/* Student Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LRN</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade & Strand</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className={student.archived ? 'bg-gray-50' : 'hover:bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.studentPhotoUrl ? (
                          <img 
                            src={student.studentPhotoUrl} 
                            alt="Student" 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <FiUser className="text-gray-400" />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {student.lastName}, {student.firstName} {student.middleName}
                          {student.archived && (
                            <span className="ml-2 text-xs text-gray-500">(Archived)</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{student.lrn}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {student.gradeLevel} - {student.strand}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {student.studentType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          student.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          student.status === 'Graduated' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleView(student)}
                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                          >
                            <FiEye className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={() => handleEdit(student)}
                            className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1"
                          >
                            <FiEdit2 className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handlePrint(student)}
                            className="text-purple-600 hover:text-purple-900 flex items-center gap-1"
                          >
                            <FiPrinter className="w-4 h-4" />
                            Print
                          </button>
                          <button
                            onClick={() => handleArchive(student.id)}
                            className={student.archived ? 'text-green-600 hover:text-green-900 flex items-center gap-1' : 'text-gray-600 hover:text-gray-900 flex items-center gap-1'}
                          >
                            <FiArchive className="w-4 h-4" />
                            {student.archived ? 'Unarchive' : 'Archive'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                      No students found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <SeniorHighModal
          showModal={showModal}
          setShowModal={setShowModal}
          newStudent={newStudent}
          setNewStudent={setNewStudent}
          errors={errors}
          setErrors={setErrors}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          handleAddStudent={handleAddStudent}
          handleInputChange={handleInputChange}
          handleSacramentChange={handleSacramentChange}
          triggerFileInput={triggerFileInput}
          fileInputRef={fileInputRef}
          handleFileUpload={handleFileUpload}
          initialStudentState={initialStudentState}
          handleSiblingChange={handleSiblingChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      {viewingStudent && (
        <ViewStudentModal 
          student={viewingStudent} 
          onClose={() => setViewingStudent(null)} 
        />
      )}

      {printingStudent && (
        <div className="hidden print:block">
          <SeniorHighPrintView student={printingStudent} />
        </div>
      )}
    </div>
  );
}