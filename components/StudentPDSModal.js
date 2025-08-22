import { useState } from 'react';
import { FiX, FiPlus, FiUpload, FiUser, FiTrash2, FiSave } from 'react-icons/fi';

const initialStudentState = {
  educationLevel: '',
  schoolYear: '',
  semester: '',
  gradeLevel: '',
  strand: '',
  course: '',
  yearLevel: '',
  firstName: '',
  lastName: '',
  middleName: '',
  nickname: '',
  sex: '',
  civil_status: '',
  nationality: '',
  contact_number: '',
  email: '',
  address: '',
  city_address: '',
  birth_date: '',
  birth_place: '',
  age: '',
  religion: '',
  emergency_contact: '',
  emergency_relation: '',
  emergency_number: '',
  signature_name: '',
  signature_date: '',
  parent_signature_name: '',
  parent_signature_date: '',
  student_photo_url: '',
  residence_type: '',
  residence_owner: '',
  languages_spoken_at_home: '',
  special_talents: '',
  living_with_parents: true,
  studentType: '',
  parentsMaritalStatus: '',
  child_residing_with: '',
  child_residence_other: '',
  birth_order: '',
  siblings_count: '',
  brothers_count: '',
  sisters_count: '',
  step_brothers_count: '',
  step_sisters_count: '',
  adopted_count: '',
  family_monthly_income: '',
  financial_support: '',
  relatives_at_home: '',
  other_relatives: '',
  total_relatives: '',
  father: { last_name: '', first_name: '', middle_name: '', occupation: '', location: '', employment_type: '', status: '', highest_educational_attainment: '', specialization: '', post_graduate_studies: '' },
  mother: { last_name: '', first_name: '', middle_name: '', occupation: '', location: '', employment_type: '', status: '', highest_educational_attainment: '', specialization: '', post_graduate_studies: '' },
  baptism: { sacrament_type: 'baptism', received: false, date: '', church: '' },
  firstCommunion: { sacrament_type: 'first communion', received: false, date: '', church: '' },
  confirmation: { sacrament_type: 'confirmation', received: false, date: '', church: '' },
  leisureActivities: '',
  otherLeisureActivity: '',
  guardianName: '',
  guardianRelationship: '',
  guardianAddress: '',
  siblings: [],
  preschool: { level: 'Preschool', school_attended_or_address: '', awards_or_honors_received: '', school_year_attended: '' },
  elementary: { level: 'Grade School', school_attended_or_address: '', awards_or_honors_received: '', school_year_attended: '', school_name: '', school_address: '' },
  highSchool: { level: 'High School', school_attended_or_address: '', awards_or_honors_received: '', school_year_attended: '', school_name: '', school_address: '' },
  seniorHigh: { level: 'Senior High School', school_attended_or_address: '', awards_or_honors_received: '', school_year_attended: '', school_name: '', school_address: '' },
  organizations: [],
  height: '',
  weight: '',
  physicalCondition: '',
  health_problem: '',
  health_problem_details: '',
  last_doctor_visit: '',
  last_doctor_visit_reason: '',
  general_condition: '',
  testResults: [],
};

const FAMILY_INCOME_RANGES = [
  'Below ₱10,000.00',
  '₱10,001 - ₱13,000',
  '₱13,001 - ₱15,000',
  '₱15,001 - ₱18,000',
  '₱18,001 - ₱21,000',
  '₱21,001 - ₱24,000',
  '₱24,001 - ₱27,000',
  '₱27,001 - ₱30,000',
  'Above ₱30,000'
];

const RELATIONSHIP_OPTIONS = ['sister/brother', 'aunt/uncle', 'land lord/lady', 'grandparents', 'other'];
const EDUCATION_LEVELS = [
  'Some Elementary',
  'Elementary',
  'Some High School',
  'High School',
  'Some College',
  'College Degree',
];
const FINANCIAL_SUPPORT_OPTIONS = ['Parents', 'Grandparents', 'Others'];
const FAMILY_ACTIVITIES = ['Listening to radio', 'Watching TV', 'Picnic', 'Others'];
const RESIDENCE_OPTIONS = ['Rented', 'Owned'];
const PARENTS_MARITAL_STATUS = [
  'Sacramental Marriage',
  'Civil',
  'Both Parent',
  'Legally Separated',
  'Annulled',
  'Unmarried'
];

const StudentPDSModal = ({ showModal, setShowModal, onAddStudent }) => {
  const [newStudent, setNewStudent] = useState({
    ...initialStudentState,
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
  });
  const [educationLevel, setEducationLevel] = useState('');
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setNewStudent((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: type === 'checkbox' ? checked : value },
      }));
    } else {
      setNewStudent((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleParentChange = (parent, field, value) => {
    setNewStudent(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
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


  const handleEducationChange = (level, field, value) => {
    setNewStudent(prev => ({
      ...prev,
      [level]: {
        ...prev[level],
        [field]: value
      }
    }));
  };

  const handleSiblingChange = (index, field, value) => {
    const updatedSiblings = [...newStudent.siblings];
    updatedSiblings[index] = { ...updatedSiblings[index], [field]: value };
    setNewStudent((prev) => ({ ...prev, siblings: updatedSiblings }));
  };

  const addSibling = () => {
    setNewStudent((prev) => ({
      ...prev,
      siblings: [...prev.siblings, { name: '', age: '', school: '', status: '', occupation: '' }],
    }));
  };

  const removeSibling = (index) => {
    setNewStudent((prev) => ({
      ...prev,
      siblings: prev.siblings.filter((_, i) => i !== index),
    }));
  };

  const handleOrganizationChange = (index, field, value) => {
    const updatedOrganizations = [...newStudent.organizations];
    updatedOrganizations[index] = { ...updatedOrganizations[index], [field]: value };
    setNewStudent((prev) => ({ ...prev, organizations: updatedOrganizations }));
  };

  const addOrganization = () => {
    setNewStudent((prev) => ({
      ...prev,
      organizations: [...prev.organizations, { school_year: '', organization_club: '', designation: '' }],
    }));
  };

  const removeOrganization = (index) => {
    setNewStudent((prev) => ({
      ...prev,
      organizations: prev.organizations.filter((_, i) => i !== index),
    }));
  };

  const handleTestResultChange = (index, field, value) => {
    const updatedTestResults = [...newStudent.testResults];
    updatedTestResults[index] = { ...updatedTestResults[index], [field]: value };
    setNewStudent((prev) => ({ ...prev, testResults: updatedTestResults }));
  };

  const addTestResult = () => {
    setNewStudent((prev) => ({
      ...prev,
      testResults: [...prev.testResults, { test_name: '', date_taken: '', rating: '' }],
    }));
  };

  const removeTestResult = (index) => {
    setNewStudent((prev) => ({
      ...prev,
      testResults: prev.testResults.filter((_, i) => i !== index),
    }));
  };

  const handleCheckboxChange = (field, value) => {
    const current = newStudent[field] || [];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    setNewStudent({ ...newStudent, [field]: updated });
  };

const validateForm = () => {
  const newErrors = {};
  setErrors({});
  // Basic required fields for all education levels
  if (!educationLevel) newErrors.educationLevel = 'Education level is required';
  if (!newStudent.schoolYear) newErrors.schoolYear = 'School year is required';
  if (!newStudent.firstName) newErrors.firstName = 'First name is required';
  if (!newStudent.lastName) newErrors.lastName = 'Last name is required';
  if (!newStudent.studentType) newErrors.studentType = 'Student type is required';

  // Education level specific validations
  if (educationLevel === 'Higher Education') {
    if (!newStudent.semester) newErrors.semester = 'Semester is required';
    if (!newStudent.course) newErrors.course = 'Course is required';
    if (!newStudent.yearLevel) newErrors.yearLevel = 'Year level is required';
    if (!newStudent.civil_status) newErrors.civil_status = 'Civil status is required';
    if (!newStudent.email) newErrors.email = 'Email is required';
  } else if (educationLevel === 'Senior High') {
    if (!newStudent.gradeLevel) newErrors.gradeLevel = 'Grade level is required';
    if (!newStudent.strand) newErrors.strand = 'Strand is required';
  } else if (educationLevel === 'Basic Education') {
    if (!newStudent.gradeLevel) newErrors.gradeLevel = 'Grade level is required';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleAddStudent = async () => {
    if (!validateForm()) return;
    
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setErrors({ submit: 'User ID not found. Please log in again.' });
        return;
      }

      // Sanitize date fields - convert empty strings to null
      const sanitizedStudent = {
        ...newStudent,
        birth_date: newStudent.birth_date || null,
        signature_date: newStudent.signature_date || null,
        parent_signature_date: newStudent.parent_signature_date || null,
        last_doctor_visit: newStudent.last_doctor_visit || null,
        baptism: {
          ...newStudent.baptism,
          date: newStudent.baptism.date || null,
        },
        firstCommunion: {
          ...newStudent.firstCommunion,
          date: newStudent.firstCommunion.date || null,
        },
        confirmation: {
          ...newStudent.confirmation,
          date: newStudent.confirmation.date || null,
        },
        testResults: newStudent.testResults.map(result => ({
          ...result,
          date_taken: result.date_taken || null,
        })),
      };
      
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'user-id': userId
        },
        body: JSON.stringify({ 
          ...sanitizedStudent, 
          educationLevel,
          userId: userId
        }),
      });

    if (response.ok) {
      const studentData = await response.json();
      localStorage.setItem('firstName', newStudent.firstName);
      localStorage.setItem('lastName', newStudent.lastName);
      onAddStudent(studentData);
      setShowModal(false);
      setNewStudent({
        ...initialStudentState,
        firstName: localStorage.getItem('firstName') || '',
        lastName: localStorage.getItem('lastName') || '',
      });
      setEducationLevel('');
      setErrors({});
    } else {
      const errorData = await response.json();
      setErrors({ submit: errorData.message || 'Failed to add student' });
    }
  } catch (error) {
    setErrors({ submit: 'Error submitting form' });
  }
};

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl flex flex-col max-h-[95vh] overflow-hidden border border-gray-200">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-6 rounded-t-xl relative">
          <button
            onClick={() => {
              setShowModal(false);
              setNewStudent({
                ...initialStudentState,
                firstName: localStorage.getItem('firstName') || '',
                lastName: localStorage.getItem('lastName') || '',
              });
              setEducationLevel('');
              setErrors({});
            }}
            className="absolute right-6 top-6 p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2 pt-2">
            <h1 className="text-2xl font-bold tracking-tight drop-shadow-sm">
              St. Rita's College of Balingasag
            </h1>
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-sm">
              <p className="font-medium opacity-95">Senior High School Department</p>
              <div className="hidden sm:block h-4 w-px bg-white/40 self-center"></div>
              <p className="font-medium opacity-95">GUIDANCE CENTER</p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Form Title */}
          <h1 className="text-2xl font-bold uppercase tracking-tight text-gray-800 text-center mb-6">
            STUDENT PERSONAL DATA SHEET
          </h1>

{/* Education Level Selection */}
<div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
    Education Level
  </h2>
  <select
    value={educationLevel}
    onChange={(e) => setEducationLevel(e.target.value)}
    className={`w-full px-4 py-2 border ${errors.educationLevel ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition shadow-sm`}
  >
    <option value="">Select Education Level</option>
    <option value="Basic Education">Basic Education</option>
    <option value="Senior High">Senior High</option>
    <option value="Higher Education">Higher Education</option>
  </select>
  {errors.educationLevel && <p className="mt-1 text-xs text-red-600">{errors.educationLevel}</p>}
</div>

{/* Education Level Indicator - Only shows for Basic Education and Senior High */}
{(educationLevel === 'Basic Education' || educationLevel === 'Senior High') && (
  <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
    <div className="flex items-center">
      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="text-blue-800 font-medium">
        {educationLevel === 'Basic Education' && 'Basic Education selected - For elementary and junior high school students'}
        {educationLevel === 'Senior High' && 'Senior High School selected - For Grades 11 and 12 students'}
      </span>
    </div>
  </div>
)}

{/* Higher Education Indicator - Only shows for Higher Education */}
{educationLevel === 'Higher Education' && (
  <div className="bg-green-50 p-4 rounded-lg mb-6 border border-green-200">
    <div className="flex items-center">
      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="text-green-800 font-medium">
        Higher Education selected - For college students
      </span>
    </div>
  </div>
)}

          {/* Personal Information */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">School Year*</label>
                <input
                  type="text"
                  name="schoolYear"
                  value={newStudent.schoolYear}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.schoolYear ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition shadow-sm`}
                  placeholder="e.g., 2023-2024"
                />
                {errors.schoolYear && <p className="mt-1 text-xs text-red-600">{errors.schoolYear}</p>}
              </div>
              
              {educationLevel === 'Higher Education' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Semester*</label>
                  <select
                    name="semester"
                    value={newStudent.semester}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${errors.semester ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition shadow-sm`}
                  >
                    <option value="">Select Semester</option>
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                  </select>
                  {errors.semester && <p className="mt-1 text-xs text-red-600">{errors.semester}</p>}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {educationLevel === 'Higher Education' ? 'Course & Year Level*' : 'Grade Level & Strand*'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(educationLevel === 'Basic Education' || educationLevel === 'Senior High') && (
                    <select
                      name="gradeLevel"
                      value={newStudent.gradeLevel}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${errors.gradeLevel ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition shadow-sm`}
                    >
                      <option value="">Select Grade</option>
                      <option value="Grade 1">Grade 1</option>
                      <option value="Grade 2">Grade 2</option>
                      <option value="Grade 3">Grade 3</option>
                      <option value="Grade 4">Grade 4</option>
                      <option value="Grade 5">Grade 5</option>
                      <option value="Grade 6">Grade 6</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 12">Grade 12</option>
                    </select>
                  )}
                  
                  {educationLevel === 'Higher Education' && (
                    <select
                      name="yearLevel"
                      value={newStudent.yearLevel}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${errors.yearLevel ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition shadow-sm`}
                    >
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  )}
                  
                  {educationLevel === 'Senior High' && (
                    <input
                      type="text"
                      name="strand"
                      value={newStudent.strand}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${errors.strand ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition shadow-sm`}
                      placeholder="e.g., STEM"
                    />
                  )}
                  
                  {educationLevel === 'Higher Education' && (
                    <input
                      type="text"
                      name="course"
                      value={newStudent.course}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${errors.course ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition shadow-sm`}
                      placeholder="e.g., BS Computer Science"
                    />
                  )}
                </div>
                {errors.gradeLevel && <p className="mt-1 text-xs text-red-600">{errors.gradeLevel}</p>}
                {errors.yearLevel && <p className="mt-1 text-xs text-red-600">{errors.yearLevel}</p>}
                {errors.strand && <p className="mt-1 text-xs text-red-600">{errors.strand}</p>}
                {errors.course && <p className="mt-1 text-xs text-red-600">{errors.course}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student Type*</label>
                <div className="grid grid-cols-4 gap-2">
                  {['New', 'Transferee', 'Returnee', 'Old'].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="studentType"
                        checked={newStudent.studentType === type}
                        onChange={() => setNewStudent({ ...newStudent, studentType: type })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
                {errors.studentType && <p className="mt-1 text-xs text-red-600">{errors.studentType}</p>}
              </div>
            </div>

            {/* Photo Upload */}
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className={`w-32 h-32 rounded-full ${newStudent.student_photo_url ? 'border-4 border-white shadow-md' : 'bg-gray-100 border-4 border-white shadow-md'} flex items-center justify-center overflow-hidden`}>
                  {newStudent.student_photo_url ? (
                    <img
                      src={newStudent.student_photo_url}
                      alt="Student"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser className="text-gray-400 text-4xl" />
                  )}
                </div>
                <button
                  onClick={() => document.getElementById('photo-upload').click()}
                  className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors shadow-md group-hover:opacity-100 opacity-90"
                  aria-label="Upload photo"
                >
                  <FiUpload className="w-4 h-4" />
                </button>
                <input
                  id="photo-upload"
                  type="file"
                  onChange={(e) => {
                    // Handle file upload logic here
                    const file = e.target.files[0];
                    if (file) {
                      // You would typically upload the file and set the URL
                      // For now, we'll just set a placeholder
                      setNewStudent({ ...newStudent, student_photo_url: URL.createObjectURL(file) });
                    }
                  }}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                <input
                  type="text"
                  name="lastName"
                  value={newStudent.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition`}
                  placeholder="e.g., Dela Cruz"
                />
                {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  value={newStudent.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition`}
                  placeholder="e.g., Juan"
                />
                {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                <input
                  type="text"
                  name="middleName"
                  value={newStudent.middleName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="e.g., Santos"
                />
              </div>
            </div>

            {educationLevel === 'Higher Education' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nickname</label>
                    <input
                      type="text"
                      name="nickname"
                      value={newStudent.nickname}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                      placeholder="e.g., Johnny"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Civil Status*</label>
                    <select
                      name="civil_status"
                      value={newStudent.civil_status}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${errors.civil_status ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition`}
                    >
                      <option value="">Select</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Separated">Separated</option>
                    </select>
                    {errors.civil_status && <p className="mt-1 text-xs text-red-600">{errors.civil_status}</p>}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={newStudent.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition`}
                    placeholder="e.g., juan.delacruz@example.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sex*</label>
                <select
                  name="sex"
                  value={newStudent.sex}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.sex ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition`}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.sex && <p className="mt-1 text-xs text-red-600">{errors.sex}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                <input
                  type="text"
                  name="nationality"
                  value={newStudent.nationality}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="e.g., Filipino"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tel./Mobile #</label>
                <input
                  type="text"
                  name="contact_number"
                  value={newStudent.contact_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="e.g., 09123456789"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
              <input
                type="text"
                name="address"
                value={newStudent.address}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition`}
                placeholder="e.g., 123 Main Street, Barangay, City"
              />
              {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
            </div>

            {educationLevel === 'Higher Education' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">City Address (if boarding)</label>
                <input
                  type="text"
                  name="city_address"
                  value={newStudent.city_address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="e.g., 456 Dormitory Street, City"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth*</label>
                <input
                  type="date"
                  name="birth_date"
                  value={newStudent.birth_date}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.birth_date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition`}
                />
                {errors.birth_date && <p className="mt-1 text-xs text-red-600">{errors.birth_date}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Place of Birth</label>
                <input
                  type="text"
                  name="birth_place"
                  value={newStudent.birth_place}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="e.g., Manila City"
                />
              </div>
            </div>

           {/* SACRAMENTS SECTION - Only show for Basic Education and Senior High */}
  {(educationLevel === 'Basic Education' || educationLevel === 'Senior High') && (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Sacraments Received</label>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Sacrament</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Received</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Church</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {[
              { sacrament: 'baptism', label: 'Baptism' },
              { sacrament: 'firstCommunion', label: 'First Communion' },
              { sacrament: 'confirmation', label: 'Confirmation' }
            ].map(({ sacrament, label }) => (
              <tr key={sacrament} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm font-medium text-gray-700">{label}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newStudent[sacrament].received || false}
                      onChange={(e) => handleSacramentChange(sacrament, 'received', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                </td>
                <td className="px-4 py-2">
                  <input
                    type="date"
                    value={newStudent[sacrament].date || ''}
                    onChange={(e) => handleSacramentChange(sacrament, 'date', e.target.value)}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 ${
                      !newStudent[sacrament].received ? 'bg-gray-100 text-gray-500' : ''
                    }`}
                    disabled={!newStudent[sacrament].received}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={newStudent[sacrament].church || ''}
                    onChange={(e) => handleSacramentChange(sacrament, 'church', e.target.value)}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 ${
                      !newStudent[sacrament].received ? 'bg-gray-100 text-gray-500' : ''
                    }`}
                    disabled={!newStudent[sacrament].received}
                    placeholder="Church name"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={newStudent.age}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="e.g., 18"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
                <input
                  type="text"
                  name="religion"
                  value={newStudent.religion}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="e.g., Catholic"
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Person</label>
                <input
                  type="text"
                  name="emergency_contact"
                  value={newStudent.emergency_contact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="e.g., Maria Dela Cruz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                <input
                  type="text"
                  name="emergency_relation"
                  value={newStudent.emergency_relation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="e.g., Mother"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="text"
                  name="emergency_number"
                  value={newStudent.emergency_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="e.g., 09187654321"
                />
              </div>
            </div>
          </div>

          {/* Family Information */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
              Family Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Father's Information */}
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
                <h4 className="font-medium text-blue-800 mb-4 text-lg">Father's Information</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={newStudent.father.last_name || ''}
                        onChange={(e) => handleParentChange('father', 'last_name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Dela Cruz"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">First Name</label>
                      <input
                        type="text"
                        value={newStudent.father.first_name || ''}
                        onChange={(e) => handleParentChange('father', 'first_name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Juan"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Middle Name</label>
                      <input
                        type="text"
                        value={newStudent.father.middle_name || ''}
                        onChange={(e) => handleParentChange('father', 'middle_name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Santos"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Occupation</label>
                    <input
                      type="text"
                      value={newStudent.father.occupation || ''}
                      onChange={(e) => handleParentChange('father', 'occupation', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Engineer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Location</label>
                      <div className="flex gap-2">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="fatherLocation"
                            checked={newStudent.father.location === 'Overseas'}
                            onChange={() => handleParentChange('father', 'location', 'Overseas')}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-1 text-xs">Overseas</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="fatherLocation"
                            checked={newStudent.father.location === 'Local'}
                            onChange={() => handleParentChange('father', 'location', 'Local')}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-1 text-xs">Local</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Type</label>
                      <div className="flex gap-2">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="fatherEmploymentType"
                            checked={newStudent.father.employment_type === 'Private'}
                            onChange={() => handleParentChange('father', 'employment_type', 'Private')}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-1 text-xs">Private</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="fatherEmploymentType"
                            checked={newStudent.father.employment_type === 'Government'}
                            onChange={() => handleParentChange('father', 'employment_type', 'Government')}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-1 text-xs">Government</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Status</label>
                    <div className="flex flex-wrap gap-2">
                      {['Employed', 'Unemployed', 'Deceased', 'Retired', 'Disabled'].map(status => (
                        <label key={status} className="flex items-center">
                          <input
                            type="radio"
                            name="fatherStatus"
                            checked={newStudent.father.status === status}
                            onChange={() => handleParentChange('father', 'status', status)}
                            className="h-4 w-4 text-blue-600"
                          />
                          <span className="ml-1 text-xs">{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Highest Educational Attainment</label>
                    <select
                      value={newStudent.father.highest_educational_attainment || ''}
                      onChange={(e) => handleParentChange('father', 'highest_educational_attainment', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select</option>
                      {EDUCATION_LEVELS.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  {newStudent.father.highest_educational_attainment === 'College Degree' && (
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Post Graduate Studies</label>
                      <div className="flex flex-wrap gap-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="fatherPostGrad"
                            checked={newStudent.father.post_graduate_studies === 'MS/MA'}
                            onChange={() => handleParentChange('father', 'post_graduate_studies', 'MS/MA')}
                            className="h-4 w-4 text-blue-600"
                          />
                          <span className="ml-1 text-xs">MS/MA</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="fatherPostGrad"
                            checked={newStudent.father.post_graduate_studies === 'PhD'}
                            onChange={() => handleParentChange('father', 'post_graduate_studies', 'PhD')}
                            className="h-4 w-4 text-blue-600"
                          />
                          <span className="ml-1 text-xs">PhD</span>
                        </label>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Specialization</label>
                    <input
                      type="text"
                      value={newStudent.father.specialization || ''}
                      onChange={(e) => handleParentChange('father', 'specialization', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Civil Engineering"
                    />
                  </div>
                </div>
              </div>

              {/* Mother's Information */}
              <div className="bg-pink-50 p-5 rounded-xl border border-pink-100 shadow-sm">
                <h4 className="font-medium text-pink-800 mb-4 text-lg">Mother's Information</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={newStudent.mother.last_name || ''}
                        onChange={(e) => handleParentChange('mother', 'last_name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Dela Cruz"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">First Name</label>
                      <input
                        type="text"
                        value={newStudent.mother.first_name || ''}
                        onChange={(e) => handleParentChange('mother', 'first_name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Maria"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Middle Name</label>
                      <input
                        type="text"
                        value={newStudent.mother.middle_name || ''}
                        onChange={(e) => handleParentChange('mother', 'middle_name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Santos"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Occupation</label>
                    <input
                      type="text"
                      value={newStudent.mother.occupation || ''}
                      onChange={(e) => handleParentChange('mother', 'occupation', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Teacher"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Location</label>
                      <div className="flex gap-2">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="motherLocation"
                            checked={newStudent.mother.location === 'Overseas'}
                            onChange={() => handleParentChange('mother', 'location', 'Overseas')}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-1 text-xs">Overseas</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="motherLocation"
                            checked={newStudent.mother.location === 'Local'}
                            onChange={() => handleParentChange('mother', 'location', 'Local')}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-1 text-xs">Local</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Type</label>
                      <div className="flex gap-2">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="motherEmploymentType"
                            checked={newStudent.mother.employment_type === 'Private'}
                            onChange={() => handleParentChange('mother', 'employment_type', 'Private')}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-1 text-xs">Private</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="motherEmploymentType"
                            checked={newStudent.mother.employment_type === 'Government'}
                            onChange={() => handleParentChange('mother', 'employment_type', 'Government')}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-1 text-xs">Government</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Status</label>
                    <div className="flex flex-wrap gap-2">
                      {['Employed', 'Unemployed', 'Deceased', 'Retired', 'Disabled'].map(status => (
                        <label key={status} className="flex items-center">
                          <input
                            type="radio"
                            name="motherStatus"
                            checked={newStudent.mother.status === status}
                            onChange={() => handleParentChange('mother', 'status', status)}
                            className="h-4 w-4 text-blue-600"
                          />
                          <span className="ml-1 text-xs">{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Highest Educational Attainment</label>
                    <select
                      value={newStudent.mother.highest_educational_attainment || ''}
                      onChange={(e) => handleParentChange('mother', 'highest_educational_attainment', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select</option>
                      {EDUCATION_LEVELS.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  {newStudent.mother.highest_educational_attainment === 'College Degree' && (
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Post Graduate Studies</label>
                      <div className="flex flex-wrap gap-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="motherPostGrad"
                            checked={newStudent.mother.post_graduate_studies === 'MS/MA'}
                            onChange={() => handleParentChange('mother', 'post_graduate_studies', 'MS/MA')}
                            className="h-4 w-4 text-blue-600"
                          />
                          <span className="ml-1 text-xs">MS/MA</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="motherPostGrad"
                            checked={newStudent.mother.post_graduate_studies === 'PhD'}
                            onChange={() => handleParentChange('mother', 'post_graduate_studies', 'PhD')}
                            className="h-4 w-4 text-blue-600"
                          />
                          <span className="ml-1 text-xs">PhD</span>
                        </label>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Specialization</label>
                    <input
                      type="text"
                      value={newStudent.mother.specialization || ''}
                      onChange={(e) => handleParentChange('mother', 'specialization', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Education"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Parents' Marital Status</label>
              <div className="flex flex-wrap gap-3">
                {PARENTS_MARITAL_STATUS.map(status => (
                  <label key={status} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="parentsMaritalStatus"
                      checked={newStudent.parentsMaritalStatus === status}
                      onChange={() => setNewStudent({ ...newStudent, parentsMaritalStatus: status })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Birth Order</label>
              <div className="flex flex-wrap gap-3">
                {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'].map((order, index) => (
                  <label key={order} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="birth_order"
                      checked={newStudent.birth_order === order}
                      onChange={() => setNewStudent({ ...newStudent, birth_order: order })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{order}</span>
                  </label>
                ))}
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="birth_order"
                    checked={!['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'].includes(newStudent.birth_order)}
                    onChange={() => setNewStudent({ ...newStudent, birth_order: 'other' })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Other</span>
                  {newStudent.birth_order === 'other' && (
                    <input
                      type="text"
                      value={newStudent.child_residence_other || ''}
                      onChange={(e) => setNewStudent({ ...newStudent, child_residence_other: e.target.value })}
                      className="ml-2 px-2 py-1 border border-gray-300 rounded-md text-sm w-20"
                      placeholder="Specify"
                    />
                  )}
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Siblings*</label>
                <input
                  type="number"
                  name="siblings_count"
                  value={newStudent.siblings_count || ''}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.siblings_count ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition`}
                  min="0"
                  placeholder="e.g., 2"
                />
                {errors.siblings_count && <p className="mt-1 text-xs text-red-600">{errors.siblings_count}</p>}
              </div>

              {newStudent.siblings_count > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sibling Breakdown</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Brothers</label>
                      <input
                        type="number"
                        value={newStudent.brothers_count || 0}
                        onChange={(e) => setNewStudent({ ...newStudent, brothers_count: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        min="0"
                        max={newStudent.siblings_count}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Sisters</label>
                      <input
                        type="number"
                        value={newStudent.sisters_count || 0}
                        onChange={(e) => setNewStudent({ ...newStudent, sisters_count: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        min="0"
                        max={newStudent.siblings_count}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Step Brothers</label>
                      <input
                        type="number"
                        value={newStudent.step_brothers_count || 0}
                        onChange={(e) => setNewStudent({ ...newStudent, step_brothers_count: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        min="0"
                        max={newStudent.siblings_count}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Step Sisters</label>
                      <input
                        type="number"
                        value={newStudent.step_sisters_count || 0}
                        onChange={(e) => setNewStudent({ ...newStudent, step_sisters_count: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        min="0"
                        max={newStudent.siblings_count}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Adopted</label>
                      <input
                        type="number"
                        value={newStudent.adopted_count || 0}
                        onChange={(e) => setNewStudent({ ...newStudent, adopted_count: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        min="0"
                        max={newStudent.siblings_count}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Validation message if counts don't add up */}
                  {((newStudent.brothers_count || 0) +
                    (newStudent.sisters_count || 0) +
                    (newStudent.step_brothers_count || 0) +
                    (newStudent.step_sisters_count || 0) +
                    (newStudent.adopted_count || 0)) > (newStudent.siblings_count || 0) && (
                      <p className="mt-2 text-xs text-red-600">
                        Total sibling breakdown cannot exceed the number of siblings
                      </p>
                    )}
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Other Relatives at Home</label>
              <div className="flex flex-wrap gap-2">
                {['Brother/s', 'Sister/s', 'Grand Parents', 'Uncle', 'Aunt', 'Step Brother/s', 'Step Sister/s', 'Cousins'].map(relative => (
                  <label key={relative} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={newStudent.relatives_at_home?.includes(relative) || false}
                      onChange={() => {
                        const current = newStudent.relatives_at_home || [];
                        const updated = current.includes(relative)
                          ? current.filter(r => r !== relative)
                          : [...current, relative];
                        setNewStudent({ ...newStudent, relatives_at_home: updated });
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{relative}</span>
                  </label>
                ))}
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={newStudent.relatives_at_home?.includes('Other') || false}
                    onChange={() => {
                      const current = newStudent.relatives_at_home || [];
                      const updated = current.includes('Other')
                        ? current.filter(r => r !== 'Other')
                        : [...current, 'Other'];
                      setNewStudent({ ...newStudent, relatives_at_home: updated });
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Other</span>
                  {newStudent.relatives_at_home?.includes('Other') && (
                    <input
                      type="text"
                      value={newStudent.other_relatives || ''}
                      onChange={(e) => setNewStudent({ ...newStudent, other_relatives: e.target.value })}
                      className="ml-2 px-2 py-1 border border-gray-300 rounded-md text-sm w-20"
                      placeholder="Specify"
                    />
                  )}
                </label>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Relatives</label>
              <input
                type="number"
                name="total_relatives"
                value={newStudent.total_relatives || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                placeholder="e.g., 5"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Family Monthly Income</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {FAMILY_INCOME_RANGES.map(income => (
                  <label key={income} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="family_monthly_income"
                      checked={newStudent.family_monthly_income === income}
                      onChange={() => setNewStudent({ ...newStudent, family_monthly_income: income })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{income}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Siblings (from Oldest to Youngest) */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Siblings (from Oldest to Youngest)</label>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Age</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">School Attended</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Occupation</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {newStudent.siblings.map((sibling, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={sibling.name || ''}
                            onChange={(e) => handleSiblingChange(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Maria Santos"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={sibling.age || ''}
                            onChange={(e) => handleSiblingChange(index, 'age', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., 15"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={sibling.school || ''}
                            onChange={(e) => handleSiblingChange(index, 'school', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., ABC High School"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={sibling.status || ''}
                            onChange={(e) => handleSiblingChange(index, 'status', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Student"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={sibling.occupation || ''}
                            onChange={(e) => handleSiblingChange(index, 'occupation', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., None"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <button
                            type="button"
                            onClick={() => removeSibling(index)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  type="button"
                  onClick={addSibling}
                  className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <FiPlus className="mr-1" /> Add Sibling
                </button>
              </div>
            </div>

            {/* Residence Information */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Residence Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Is your residence:</label>
                  <div className="flex gap-4">
                    {RESIDENCE_OPTIONS.map(option => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="residence_type"
                          checked={newStudent.residence_type === option}
                          onChange={() => setNewStudent({ ...newStudent, residence_type: option })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Languages spoken at home:</label>
                  <input
                    type="text"
                    name="languages_spoken_at_home"
                    value={newStudent.languages_spoken_at_home || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                    placeholder="e.g., Filipino, English"
                  />
                </div>
              </div>
            </div>

            {/* Financial Support */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Financial Support</h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Source of financial support:</label>
                <div className="flex flex-wrap gap-4">
                  {FINANCIAL_SUPPORT_OPTIONS.map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newStudent.financial_support?.includes(option) || false}
                        onChange={() => handleCheckboxChange('financial_support', option)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                {newStudent.financial_support?.includes('Others') && (
                  <div className="mt-2">
                    <input
                      type="text"
                      name="other_relatives"
                      value={newStudent.other_relatives || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                      placeholder="Please specify"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Leisure activities of the family:</label>
                <div className="flex flex-wrap gap-4">
                  {FAMILY_ACTIVITIES.map(activity => (
                    <label key={activity} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newStudent.leisureActivities?.includes(activity) || false}
                        onChange={() => handleCheckboxChange('leisureActivities', activity)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{activity}</span>
                    </label>
                  ))}
                </div>
                {newStudent.leisureActivities?.includes('Others') && (
                  <div className="mt-2">
                    <input
                      type="text"
                      name="otherLeisureActivity"
                      value={newStudent.otherLeisureActivity || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                      placeholder="Please specify"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Special Talents */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Special Talents</h3>
              <textarea
                name="special_talents"
                value={newStudent.special_talents || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                rows={3}
                placeholder="List any special talents or skills"
              />
            </div>

            {/* Guardian Information (if not living with parents) */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Guardian Information (if not living with parents)</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guardian's Name</label>
                  <input
                    type="text"
                    name="guardianName"
                    value={newStudent.guardianName || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                    placeholder="e.g., Juan Dela Cruz"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                  <select
                    name="guardianRelationship"
                    value={newStudent.guardianRelationship || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  >
                    <option value="">Select Relationship</option>
                    {RELATIONSHIP_OPTIONS.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {newStudent.guardianRelationship === 'other' && (
                    <div className="mt-2">
                      <input
                        type="text"
                        name="child_residence_other"
                        value={newStudent.child_residence_other || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                        placeholder="Please specify"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Guardian's Address</label>
                <input
                  type="text"
                  name="guardianAddress"
                  value={newStudent.guardianAddress || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="e.g., 123 Guardian Street, City"
                />
              </div>
            </div>
          </div>

          {/* Educational Background */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">4</span>
              Educational Background
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Level</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">School Attended/Address</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Awards/Honors Received</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">School Year Attended</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {[
                    { level: 'preschool', label: 'Preschool' },
                    { level: 'elementary', label: 'Elementary' },
                    { level: 'highSchool', label: 'High School' },
                    ...(educationLevel !== 'Basic Education' ? [{ level: 'seniorHigh', label: 'Senior High School' }] : [])
                  ].map(({ level, label }) => (
                    <tr key={level} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm font-medium text-gray-700">{label}</td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={newStudent[level].school_attended_or_address || ''}
                          onChange={(e) => handleEducationChange(level, 'school_attended_or_address', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., School Name, Address"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={newStudent[level].awards_or_honors_received || ''}
                          onChange={(e) => handleEducationChange(level, 'awards_or_honors_received', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., With Honors"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={newStudent[level].school_year_attended || ''}
                          onChange={(e) => handleEducationChange(level, 'school_year_attended', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., 2018-2019"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Organizational Affiliations */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">5</span>
              Organizational Affiliations
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">School Year</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Organization/Club</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Designation</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {newStudent.organizations?.map((org, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={org.school_year || ''}
                          onChange={(e) => handleOrganizationChange(index, 'school_year', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          placeholder="SY 2023-2024"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={org.organization_club || ''}
                          onChange={(e) => handleOrganizationChange(index, 'organization_club', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          placeholder="Organization name"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={org.designation || ''}
                          onChange={(e) => handleOrganizationChange(index, 'designation', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          placeholder="Position/role"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <button
                          type="button"
                          onClick={() => removeOrganization(index)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                onClick={addOrganization}
                className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <FiPlus className="mr-1" /> Add Organization
              </button>
            </div>
          </div>

          {/* Health Information */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">6</span>
              Health Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input
                  type="text"
                  name="weight"
                  value={newStudent.weight || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="e.g., 55"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Physical Condition</label>
                <div className="flex gap-3">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="physicalCondition"
                      checked={newStudent.physicalCondition === 'Good'}
                      onChange={() => setNewStudent({ ...newStudent, physicalCondition: 'Good' })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Good</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="physicalCondition"
                      checked={newStudent.physicalCondition === 'Fair'}
                      onChange={() => setNewStudent({ ...newStudent, physicalCondition: 'Fair' })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Fair</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="physicalCondition"
                      checked={newStudent.physicalCondition === 'Poor'}
                      onChange={() => setNewStudent({ ...newStudent, physicalCondition: 'Poor' })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Poor</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Any physical handicap or health problem</label>
              <div className="flex gap-3">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="health_problem"
                    checked={newStudent.health_problem === 'Yes'}
                    onChange={() => setNewStudent({ ...newStudent, health_problem: 'Yes' })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="health_problem"
                    checked={newStudent.health_problem === 'No'}
                    onChange={() => setNewStudent({ ...newStudent, health_problem: 'No' })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
              {newStudent.health_problem === 'Yes' && (
                <div className="mt-3">
                  <input
                    type="text"
                    name="health_problem_details"
                    value={newStudent.health_problem_details || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                    placeholder="Specify details"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">When was your last visit to the doctor?</label>
                <input
                  type="date"
                  name="last_doctor_visit"
                  value={newStudent.last_doctor_visit || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <input
                  type="text"
                  name="last_doctor_visit_reason"
                  value={newStudent.last_doctor_visit_reason || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="e.g., Check-up"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">General Condition</label>
              <div className="flex gap-3">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="general_condition"
                    checked={newStudent.general_condition === 'Good Condition'}
                    onChange={() => setNewStudent({ ...newStudent, general_condition: 'Good Condition' })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Good Condition</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="general_condition"
                    checked={newStudent.general_condition === 'Under Medication'}
                    onChange={() => setNewStudent({ ...newStudent, general_condition: 'Under Medication' })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Under Medication</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="general_condition"
                    checked={newStudent.general_condition === 'With Special Care/Attention'}
                    onChange={() => setNewStudent({ ...newStudent, general_condition: 'With Special Care/Attention' })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">With Special Care/Attention</span>
                </label>
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">7</span>
              Test Results
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Test Taken</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Date Taken</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Rating</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {newStudent.testResults.map((result, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={result.test_name || ''}
                          onChange={(e) => handleTestResultChange(index, 'test_name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., IQ Test"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="date"
                          value={result.date_taken || ''}
                          onChange={(e) => handleTestResultChange(index, 'date_taken', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={result.rating || ''}
                          onChange={(e) => handleTestResultChange(index, 'rating', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., 95"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <button
                          type="button"
                          onClick={() => removeTestResult(index)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                onClick={addTestResult}
                className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <FiPlus className="mr-1" /> Add Test Result
              </button>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">8</span>
              Privacy Notice
            </h2>

            <div className="text-sm text-gray-700 space-y-4">
              <p>
                Dear Student/Parent,
              </p>
              <p>
                St. Rita's College of Balingasag - Guidance Center shall protect the data you provided in compliance with the Data Privacy Act of 2012 and its implementation rules and regulations. SRCB Guidance Center will not collect, disclose or process personal data, including data that may classified as personal information and/or sensitive personal information unless you voluntarily choose to provide us with it and give your consent thereto, or unless such disclosure is required by applicable laws and regulations.
              </p>
              <p>
                By signing this form, you hereby agree and express your voluntary, unequivocal and informed consent that your Personal data which you have provided to SRCB - Guidance Center shall be processed by them for the purposes of current set their Guidance Program Services.
              </p>
            </div>
          </div>

          {/* Signature Section */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Signature over printed name*</label>
                <input
                  type="text"
                  name="signature_name"
                  value={newStudent.signature_name || ''}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.signature_name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition`}
                  placeholder="e.g., Juan Dela Cruz"
                />
                {errors.signature_name && <p className="mt-1 text-xs text-red-600">{errors.signature_name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Signed*</label>
                <input
                  type="date"
                  name="signature_date"
                  value={newStudent.signature_date || ''}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.signature_date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition`}
                />
                {errors.signature_date && <p className="mt-1 text-xs text-red-600">{errors.signature_date}</p>}
              </div>
            </div>
            {newStudent.age < 18 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Signature of Parent/Guardian over printed name*</label>
                  <input
                    type="text"
                    name="parent_signature_name"
                    value={newStudent.parent_signature_name || ''}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${errors.parent_signature_name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition`}
                    placeholder="e.g., Maria Dela Cruz"
                  />
                  {errors.parent_signature_name && <p className="mt-1 text-xs text-red-600">{errors.parent_signature_name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Signed*</label>
                  <input
                    type="date"
                    name="parent_signature_date"
                    value={newStudent.parent_signature_date || ''}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${errors.parent_signature_date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition`}
                  />
                  {errors.parent_signature_date && <p className="mt-1 text-xs text-red-600">{errors.parent_signature_date}</p>}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-3 md:mb-0">
            {Object.keys(errors).length > 0 && (
              <div className="flex items-center text-red-600">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Please fill in all required fields marked with *</span>
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setNewStudent({
                  ...initialStudentState,
                  firstName: localStorage.getItem('firstName') || '',
                  lastName: localStorage.getItem('lastName') || '',
                });
                setEducationLevel('');
                setErrors({});
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddStudent}
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center transition-colors w-full sm:w-auto"
              disabled={Object.keys(errors).length > 0}
            >
              <FiSave className="mr-2" />
              Save Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPDSModal;