// SeniorHighModal.js
import { FiX, FiPlus, FiSave, FiUpload, FiUser } from 'react-icons/fi';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const FAMILY_INCOME_RANGES = [
  'Below ₱10,000.00',
  '₱10,001 - ₱13,000',
  '₱13,001 - ₱15,000',
  '₱15,001 - ₱18,000',
  '₱18,001 - ₱21,000',
  '₱21,001 - ₱24,000',
  '₱24,001 - ₱27,000',
  '₱27,001 - ₱30,000',
  'Above ₱30,000.00'
];
const RELATIONSHIP_OPTIONS = ['sister/brother', 'aunt/uncle', 'land lord/lady', 'grandparents', 'other'];
const EDUCATION_LEVELS = [
  'Some Elementary',
  'Elementary',
  'Some High School',
  'High School',
  'Some College',
  'College Degree',
  'MS/MA',
  'PhD'
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

export default function SeniorHighModal({
  showModal,
  setShowModal,
  newStudent,
  setNewStudent,
  errors,
  setErrors,
  handleAddStudent,
  handleInputChange,
  handleSacramentChange,
  handleSiblingChange,
  triggerFileInput,
  fileInputRef,
  handleFileUpload,
  initialStudentState,
  handleCheckboxChange
}) {
  if (!showModal) return null;

  const handleParentChange = (parent, field, value) => {
    setNewStudent(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
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

  const handleTestResultChange = (index, field, value) => {
    const updatedTestResults = [...newStudent.testResults];
    updatedTestResults[index] = { ...updatedTestResults[index], [field]: value };
    setNewStudent(prev => ({...prev, testResults: updatedTestResults}));
  };

  const addTestResult = () => {
    setNewStudent(prev => ({
      ...prev,
      testResults: [...prev.testResults, { testName: '', dateTaken: '', rating: '' }]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">St. Rita's College of Balingasag</h2>
              <p className="text-xs opacity-80">Senior High School Department - Guidance Center</p>
            </div>
            <button
              onClick={() => {
                setShowModal(false);
                setNewStudent(initialStudentState);
                setErrors({});
              }}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4 text-center">
            <h1 className="text-lg font-bold uppercase tracking-wide">Student Personal Data Sheet</h1>
            <div className="flex flex-wrap justify-center gap-3 mt-3">
              {['New', 'Transferee', 'Returnee', 'Old'].map((type) => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="studentType"
                    checked={newStudent.studentType === type}
                    onChange={() => setNewStudent({ ...newStudent, studentType: type })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* General Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School Year</label>
              <input
                type="text"
                name="academicYear"
                value={newStudent.academicYear || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., 2023-2024"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade/Year Level*</label>
              <select
                name="gradeLevel"
                value={newStudent.gradeLevel || ''}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm ${
                  errors.gradeLevel ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Grade Level</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
              {errors.gradeLevel && <p className="mt-1 text-xs text-red-600">{errors.gradeLevel}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Strand/Track</label>
              <input
                type="text"
                name="strand"
                value={newStudent.strand || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., STEM, ABM, HUMSS"
              />
            </div>
          </div>

          {/* I. Personal Data */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">I. Personal Data</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  {newStudent.studentPhotoUrl ? (
                    <img
                      src={newStudent.studentPhotoUrl}
                      alt="Student"
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                      <FiUser className="text-gray-400 text-3xl" />
                    </div>
                  )}
                  <button
                    onClick={triggerFileInput}
                    className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1.5 hover:bg-blue-600 transition-colors"
                  >
                    <FiUpload className="w-4 h-4" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                  <input
                    type="text"
                    name="lastName"
                    value={newStudent.lastName || ''}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                  <input
                    type="text"
                    name="firstName"
                    value={newStudent.firstName || ''}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                  <input
                    type="text"
                    name="middleName"
                    value={newStudent.middleName || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={newStudent.gender || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Citizenship</label>
                  <input
                    type="text"
                    name="citizenship"
                    value={newStudent.citizenship || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tel./Mobile #</label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={newStudent.contactNumber || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={newStudent.address || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={newStudent.birthDate || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Place of Birth</label>
                  <input
                    type="text"
                    name="birthPlace"
                    value={newStudent.birthPlace || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
                <input
                  type="text"
                  name="religion"
                  value={newStudent.religion || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Residence Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Residence Type</label>
                  <div className="flex gap-4">
                    {RESIDENCE_OPTIONS.map(option => (
                      <label key={option} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="residenceType"
                          checked={newStudent.residenceType === option}
                          onChange={() => setNewStudent({ ...newStudent, residenceType: option })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Residence Owner (if rented)</label>
                  <input
                    type="text"
                    name="residenceOwner"
                    value={newStudent.residenceOwner || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Languages spoken at home</label>
                  <input
                    type="text"
                    name="languagesSpokenAtHome"
                    value={newStudent.languagesSpokenAtHome || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Financial Support */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Source of financial support</label>
                <div className="flex flex-wrap gap-4">
                  {FINANCIAL_SUPPORT_OPTIONS.map(option => (
                    <label key={option} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={newStudent.financialSupport?.includes(option) || false}
                        onChange={() => handleCheckboxChange('financialSupport', option)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                  {newStudent.financialSupport?.includes('Others') && (
                    <input
                      type="text"
                      value={newStudent.otherFinancialSupport || ''}
                      onChange={(e) => setNewStudent({ ...newStudent, otherFinancialSupport: e.target.value })}
                      className="ml-2 px-2 py-1 border border-gray-300 rounded-md text-sm"
                      placeholder="Specify other"
                    />
                  )}
                </div>
              </div>

              {/* Leisure Activities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Leisure activities and family members</label>
                <div className="flex flex-wrap gap-4">
                  {FAMILY_ACTIVITIES.map(activity => (
                    <label key={activity} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={newStudent.leisureActivities?.includes(activity) || false}
                        onChange={() => handleCheckboxChange('leisureActivities', activity)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{activity}</span>
                    </label>
                  ))}
                  {newStudent.leisureActivities?.includes('Others') && (
                    <input
                      type="text"
                      value={newStudent.otherLeisureActivity || ''}
                      onChange={(e) => setNewStudent({ ...newStudent, otherLeisureActivity: e.target.value })}
                      className="ml-2 px-2 py-1 border border-gray-300 rounded-md text-sm"
                      placeholder="Specify other"
                    />
                  )}
                </div>
              </div>

              {/* Special Talents */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special talent/s</label>
                <input
                  type="text"
                  name="specialTalents"
                  value={newStudent.specialTalents || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* If not living with parents */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">If not living with parents:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="guardianAddress"
                      value={newStudent.guardianAddress || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guardian's Name</label>
                    <input
                      type="text"
                      name="guardianGraduationName"
                      value={newStudent.guardianGraduationName || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guardian's Address</label>
                  <input
                    type="text"
                    name="guardianGraduationAddress"
                    value={newStudent.guardianGraduationAddress || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                  <div className="flex flex-wrap gap-4">
                    {RELATIONSHIP_OPTIONS.map(relation => (
                      <label key={relation} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={newStudent.guardianRelations?.includes(relation) || false}
                          onChange={() => handleCheckboxChange('guardianRelations', relation)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{relation}</span>
                      </label>
                    ))}
                    {newStudent.guardianRelations?.includes('other') && (
                      <input
                        type="text"
                        value={newStudent.otherGuardianRelation || ''}
                        onChange={(e) => setNewStudent({ ...newStudent, otherGuardianRelation: e.target.value })}
                        className="ml-2 px-2 py-1 border border-gray-300 rounded-md text-sm"
                        placeholder="Specify other"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sacraments Received</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { key: 'baptism', label: 'Baptism' },
                    { key: 'firstCommunion', label: '1st Communion' },
                    { key: 'confirmation', label: 'Confirmation' }
                  ].map(({ key, label }) => (
                    <div key={key} className="border border-gray-200 p-3 rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{label}</span>
                        <div className="flex items-center gap-2">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name={`${key}Received`}
                              checked={newStudent[key].received === true}
                              onChange={() => handleSacramentChange(key, 'received', true)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Yes</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name={`${key}Received`}
                              checked={newStudent[key].received === false}
                              onChange={() => handleSacramentChange(key, 'received', false)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">No</span>
                          </label>
                        </div>
                      </div>
                      {newStudent[key].received && (
                        <div className="space-y-2">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Date</label>
                            <input
                              type="date"
                              value={newStudent[key].date || ''}
                              onChange={(e) => handleSacramentChange(key, 'date', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Church</label>
                            <input
                              type="text"
                              value={newStudent[key].church || ''}
                              onChange={(e) => handleSacramentChange(key, 'church', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Person to be contacted in case of emergency</label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={newStudent.emergencyContact || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                    <input
                      type="text"
                      name="emergencyRelation"
                      value={newStudent.emergencyRelation || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                    <input
                      type="text"
                      name="emergencyNumber"
                      value={newStudent.emergencyNumber || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* II. Family Information */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">II. Family Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Father's Information */}
                <div className="bg-blue-50 p-4 rounded-md">
                  <h4 className="font-medium text-blue-800 mb-3">Father's Information</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Last Name</label>
                        <input
                          type="text"
                          value={newStudent.father.lastName || ''}
                          onChange={(e) => handleParentChange('father', 'lastName', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">First Name</label>
                        <input
                          type="text"
                          value={newStudent.father.firstName || ''}
                          onChange={(e) => handleParentChange('father', 'firstName', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Middle Name</label>
                        <input
                          type="text"
                          value={newStudent.father.middleName || ''}
                          onChange={(e) => handleParentChange('father', 'middleName', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Occupation</label>
                      <input
                        type="text"
                        value={newStudent.father.occupation || ''}
                        onChange={(e) => handleParentChange('father', 'occupation', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Location</label>
                        <select
                          value={newStudent.father.location || ''}
                          onChange={(e) => handleParentChange('father', 'location', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                        >
                          <option value="">Select</option>
                          <option value="Overseas">Overseas</option>
                          <option value="Local">Local</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Type</label>
                        <select
                          value={newStudent.father.employmentType || ''}
                          onChange={(e) => handleParentChange('father', 'employmentType', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                        >
                          <option value="">Select</option>
                          <option value="Private">Private</option>
                          <option value="Government">Government</option>
                        </select>
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
                              className="h-3 w-3 text-blue-600"
                            />
                            <span className="ml-1 text-xs">{status}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Highest Educational Attainment</label>
                      <select
                        value={newStudent.father.education || ''}
                        onChange={(e) => handleParentChange('father', 'education', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="">Select</option>
                        {EDUCATION_LEVELS.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Specialization</label>
                      <input
                        type="text"
                        value={newStudent.father.specialization || ''}
                        onChange={(e) => handleParentChange('father', 'specialization', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Mother's Information */}
                <div className="bg-pink-50 p-4 rounded-md">
                  <h4 className="font-medium text-pink-800 mb-3">Mother's Information</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Last Name</label>
                        <input
                          type="text"
                          value={newStudent.mother.lastName || ''}
                          onChange={(e) => handleParentChange('mother', 'lastName', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">First Name</label>
                        <input
                          type="text"
                          value={newStudent.mother.firstName || ''}
                          onChange={(e) => handleParentChange('mother', 'firstName', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Middle Name</label>
                        <input
                          type="text"
                          value={newStudent.mother.middleName || ''}
                          onChange={(e) => handleParentChange('mother', 'middleName', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Occupation</label>
                      <input
                        type="text"
                        value={newStudent.mother.occupation || ''}
                        onChange={(e) => handleParentChange('mother', 'occupation', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Location</label>
                        <select
                          value={newStudent.mother.location || ''}
                          onChange={(e) => handleParentChange('mother', 'location', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                        >
                          <option value="">Select</option>
                          <option value="Overseas">Overseas</option>
                          <option value="Local">Local</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Type</label>
                        <select
                          value={newStudent.mother.employmentType || ''}
                          onChange={(e) => handleParentChange('mother', 'employmentType', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                        >
                          <option value="">Select</option>
                          <option value="Private">Private</option>
                          <option value="Government">Government</option>
                        </select>
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
                              className="h-3 w-3 text-blue-600"
                            />
                            <span className="ml-1 text-xs">{status}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Highest Educational Attainment</label>
                      <select
                        value={newStudent.mother.education || ''}
                        onChange={(e) => handleParentChange('mother', 'education', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="">Select</option>
                        {EDUCATION_LEVELS.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Specialization</label>
                      <input
                        type="text"
                        value={newStudent.mother.specialization || ''}
                        onChange={(e) => handleParentChange('mother', 'specialization', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
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
                  {newStudent.parentsMaritalStatus === 'Both Parent' && (
                    <input
                      type="text"
                      value={newStudent.otherParentsMaritalStatus || ''}
                      onChange={(e) => setNewStudent({ ...newStudent, otherParentsMaritalStatus: e.target.value })}
                      className="ml-2 px-2 py-1 border border-gray-300 rounded-md text-sm"
                      placeholder="Specify"
                    />
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Birth Order</label>
                <div className="flex flex-wrap gap-3">
                  {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'].map((order, index) => (
                    <label key={order} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="birthOrder"
                        checked={newStudent.birthOrder === order}
                        onChange={() => setNewStudent({ ...newStudent, birthOrder: order })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{order}</span>
                    </label>
                  ))}
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="birthOrder"
                      checked={!['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'].includes(newStudent.birthOrder)}
                      onChange={() => setNewStudent({ ...newStudent, birthOrder: 'other' })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Other</span>
                    {newStudent.birthOrder === 'other' && (
                      <input
                        type="text"
                        value={newStudent.otherBirthOrder || ''}
                        onChange={(e) => setNewStudent({ ...newStudent, otherBirthOrder: e.target.value })}
                        className="ml-2 px-2 py-1 border border-gray-300 rounded-md text-sm w-20"
                        placeholder="Specify"
                      />
                    )}
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Siblings</label>
                  <input
                    type="number"
                    name="siblingsCount"
                    value={newStudent.siblingsCount || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other Relatives at Home</label>
                  <div className="flex flex-wrap gap-2">
                    {['Brother/s', 'Sister/s', 'Grand Parents', 'Uncle', 'Aunt', 'Step Brother/s', 'Step Sister/s', 'Cousins'].map(relative => (
                      <label key={relative} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={newStudent.otherRelativesAtHome?.includes(relative) || false}
                          onChange={() => {
                            const current = newStudent.otherRelativesAtHome || [];
                            const updated = current.includes(relative)
                              ? current.filter(r => r !== relative)
                              : [...current, relative];
                            setNewStudent({ ...newStudent, otherRelativesAtHome: updated });
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{relative}</span>
                      </label>
                    ))}
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={newStudent.otherRelativesAtHome?.includes('Other') || false}
                        onChange={() => {
                          const current = newStudent.otherRelativesAtHome || [];
                          const updated = current.includes('Other')
                            ? current.filter(r => r !== 'Other')
                            : [...current, 'Other'];
                          setNewStudent({ ...newStudent, otherRelativesAtHome: updated });
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Other</span>
                      {newStudent.otherRelativesAtHome?.includes('Other') && (
                        <input
                          type="text"
                          value={newStudent.otherRelativeSpecify || ''}
                          onChange={(e) => setNewStudent({ ...newStudent, otherRelativeSpecify: e.target.value })}
                          className="ml-2 px-2 py-1 border border-gray-300 rounded-md text-sm w-20"
                          placeholder="Specify"
                        />
                      )}
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Family Monthly Income</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {FAMILY_INCOME_RANGES.map(income => (
                    <label key={income} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="familyMonthlyIncome"
                        checked={newStudent.familyMonthlyIncome === income}
                        onChange={() => setNewStudent({ ...newStudent, familyMonthlyIncome: income })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{income}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Siblings (from Oldest to Youngest)</label>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 rounded-md">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Age</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">School Attended</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Occupation</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {newStudent.siblings.slice(0, 6).map((sibling, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={sibling.name || ''}
                              onChange={(e) => handleSiblingChange(index, 'name', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={sibling.age || ''}
                              onChange={(e) => handleSiblingChange(index, 'age', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={sibling.school || ''}
                              onChange={(e) => handleSiblingChange(index, 'school', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={sibling.status || ''}
                              onChange={(e) => handleSiblingChange(index, 'status', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={sibling.occupation || ''}
                              onChange={(e) => handleSiblingChange(index, 'occupation', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* III. Educational Background */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">III. Educational Background</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-md">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Level</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">School Attended/Address</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Awards/Honors Received</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">School Year Attended</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {[
                      { level: 'preschool', label: 'Preschool' },
                      { level: 'elementary', label: 'Elementary' },
                      { level: 'highSchool', label: 'High School' },
                      { level: 'seniorHigh', label: 'Senior High School' }
                    ].map(({ level, label }) => (
                      <tr key={level} className="hover:bg-gray-50">
                        <td className="px-3 py-2 text-sm font-medium text-gray-700">{label}</td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={newStudent[level].school || ''}
                            onChange={(e) => handleEducationChange(level, 'school', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={newStudent[level].awards || ''}
                            onChange={(e) => handleEducationChange(level, 'awards', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={newStudent[level].year || ''}
                            onChange={(e) => handleEducationChange(level, 'year', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* IV. Health Information */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">IV. Health</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                  <input
                    type="text"
                    name="height"
                    value={newStudent.height || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                  <input
                    type="text"
                    name="weight"
                    value={newStudent.weight || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Any physical handicap or health problem</label>
                <div className="flex gap-3">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="healthProblem"
                      checked={newStudent.healthProblem === 'Yes'}
                      onChange={() => setNewStudent({ ...newStudent, healthProblem: 'Yes' })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="healthProblem"
                      checked={newStudent.healthProblem === 'No'}
                      onChange={() => setNewStudent({ ...newStudent, healthProblem: 'No' })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
                {newStudent.healthProblem === 'Yes' && (
                  <div className="mt-3">
                    <input
                      type="text"
                      name="healthProblemDetails"
                      value={newStudent.healthProblemDetails || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Specify details"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">When was your last visit to the doctor?</label>
                  <input
                    type="date"
                    name="lastDoctorVisit"
                    value={newStudent.lastDoctorVisit || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                  <input
                    type="text"
                    name="lastDoctorVisitReason"
                    value={newStudent.lastDoctorVisitReason || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">General Condition</label>
                <div className="flex gap-3">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="generalCondition"
                      checked={newStudent.generalCondition === 'Good Condition'}
                      onChange={() => setNewStudent({ ...newStudent, generalCondition: 'Good Condition' })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Good Condition</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="generalCondition"
                      checked={newStudent.generalCondition === 'Under Medication'}
                      onChange={() => setNewStudent({ ...newStudent, generalCondition: 'Under Medication' })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Under Medication</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="generalCondition"
                      checked={newStudent.generalCondition === 'With Special Care/Attention'}
                      onChange={() => setNewStudent({ ...newStudent, generalCondition: 'With Special Care/Attention' })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">With Special Care/Attention</span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* V. Test Results */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">V. Test Results</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-md">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Test Taken</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Date Taken</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {newStudent.testResults.map((result, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={result.testName || ''}
                            onChange={(e) => handleTestResultChange(index, 'testName', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="date"
                            value={result.dateTaken || ''}
                            onChange={(e) => handleTestResultChange(index, 'dateTaken', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={result.rating || ''}
                            onChange={(e) => handleTestResultChange(index, 'rating', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                onClick={addTestResult}
                className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <FiPlus className="mr-1" /> Add Test Result
              </button>
            </div>
          </section>

          {/* Privacy Notice */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Privacy Notice</h3>
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
              <p className="mb-4">
                Dear Student/Parent,
              </p>
              <p className="mb-4">
                St. Rita's College of Balingasag - Guidance Center shall protect the data you provided in compliance with the Data Privacy Act of 2012 and its implementation rules and regulations. SRCB Guidance Center will not collect, disclose or process personal data, including data that may classified as personal information and/or sensitive personal information unless you voluntarily choose to provide us with it and give your consent thereto, or unless such disclosure is required by applicable laws and regulations.
              </p>
              <p>
                By signing this form, you hereby agree and express your voluntary, unequivocal and informed consent that your Personal data which you have provided to SRCB - Guidance Center shall be processed by them for the purposes of current set their Guidance Program Services.
              </p>
            </div>
          </section>

          {/* Signature Section */}
          <section className="mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Signature over printed name</label>
                  <div className="h-16 border-b border-gray-300"></div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Signed</label>
                  <input
                    type="date"
                    name="signatureDate"
                    value={newStudent.signatureDate || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
              {newStudent.age < 18 && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Signature of Parent/Guardian over printed name</label>
                    <div className="h-16 border-b border-gray-300"></div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Signed</label>
                    <input
                      type="date"
                      name="parentSignatureDate"
                      value={newStudent.parentSignatureDate || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl border-t border-gray-200 flex justify-end">
          <button
            type="button"
            onClick={() => {
              setShowModal(false);
              setNewStudent(initialStudentState);
              setErrors({});
            }}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddStudent}
            className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
          >
            <FiSave className="mr-2" />
            Save Student
          </button>
        </div>
      </div>
    </div>
  );
}