// components/SeniorHighModal.js
import { FiX, FiPlus, FiSave, FiUpload, FiUser } from 'react-icons/fi';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const FAMILY_INCOME_RANGES = ['Below ₱10,000.00', '₱10,001 - ₱15,000', '₱15,001 - ₱20,000', '₱20,001 - ₱25,000', '₱25,001 - ₱30,000', 'Above ₱30,000'];
const RELATIONSHIP_OPTIONS = ['sister/brother', 'aunt/uncle', 'land lord/lady', 'grandparents', 'other'];

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
  handleEducationChange,
  handleOrganizationChange,
  handleTestResultChange,
  triggerFileInput,
  fileInputRef,
  handleFileUpload,
  initialStudentState
}) {
  if (!showModal) return null;

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
                name="schoolYear"
                value={newStudent.schoolYear || ''}
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Given Name*</label>
                  <input
                    type="text"
                    name="givenName"
                    value={newStudent.givenName || ''}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm ${
                      errors.givenName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.givenName && <p className="mt-1 text-xs text-red-600">{errors.givenName}</p>}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Suffix</label>
                  <select
                    name="suffix"
                    value={newStudent.suffix || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">None</option>
                    <option value="Jr.">Jr.</option>
                    <option value="Sr.">Sr.</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                  </select>
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
                    <option value="Other">Other</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={newStudent.age || ''}
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
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      name="birthMonth"
                      value={newStudent.birthMonth || ''}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="">Month</option>
                      {MONTHS.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      name="birthDay"
                      value={newStudent.birthDay || ''}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="">Day</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                    <select
                      name="birthYear"
                      value={newStudent.birthYear || ''}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="">Year</option>
                      {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(
                        (year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        )
                      )}
                    </select>
                  </div>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sacraments Received</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['baptism', 'firstCommunion', 'confirmation'].map((sacrament) => {
                    const sacramentData = newStudent[sacrament] || { received: false, date: '', church: '' };
                    return (
                      <div key={sacrament} className="border border-gray-200 p-3 rounded-md">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {sacrament === 'firstCommunion' ? '1st Communion' : sacrament}
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={sacramentData.received}
                              onChange={() =>
                                handleSacramentChange(sacrament, 'received', !sacramentData.received)
                              }
                              className="sr-only peer"
                            />
                            <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                          </label>
                        </div>
                        {sacramentData.received && (
                          <div className="space-y-2">
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Date</label>
                              <input
                                type="date"
                                value={sacramentData.date || ''}
                                onChange={(e) => handleSacramentChange(sacrament, 'date', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Church</label>
                              <input
                                type="text"
                                value={sacramentData.church || ''}
                                onChange={(e) => handleSacramentChange(sacrament, 'church', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* II. Family Information */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">II. Family Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-md">
                  <h4 className="font-medium text-blue-800 mb-3">Father's Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        name="fatherName"
                        value={newStudent.fatherName || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                        <input
                          type="text"
                          name="fatherOccupation"
                          value={newStudent.fatherOccupation || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          name="fatherStatus"
                          value={newStudent.fatherStatus || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select</option>
                          <option value="Employed">Employed</option>
                          <option value="Unemployed">Unemployed</option>
                          <option value="Deceased">Deceased</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Highest Educational Attainment</label>
                      <select
                        name="fatherEducation"
                        value={newStudent.fatherEducation || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="Elementary">Elementary</option>
                        <option value="High School">High School</option>
                        <option value="College">College</option>
                        <option value="Post Graduate">Post Graduate</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-pink-50 p-4 rounded-md">
                  <h4 className="font-medium text-pink-800 mb-3">Mother's Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        name="motherName"
                        value={newStudent.motherName || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                        <input
                          type="text"
                          name="motherOccupation"
                          value={newStudent.motherOccupation || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          name="motherStatus"
                          value={newStudent.motherStatus || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select</option>
                          <option value="Employed">Employed</option>
                          <option value="Unemployed">Unemployed</option>
                          <option value="Deceased">Deceased</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Highest Educational Attainment</label>
                      <select
                        name="motherEducation"
                        value={newStudent.motherEducation || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="Elementary">Elementary</option>
                        <option value="High School">High School</option>
                        <option value="College">College</option>
                        <option value="Post Graduate">Post Graduate</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Parents' Marital Status</label>
                <div className="flex flex-wrap gap-3">
                  {['Married', 'Separated', 'Divorced', 'Widowed', 'Single Parent'].map((status) => (
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Residence Type</label>
                  <div className="flex gap-3">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="residenceType"
                        checked={newStudent.residenceType === 'Rented'}
                        onChange={() => setNewStudent({ ...newStudent, residenceType: 'Rented' })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Rented</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="residenceType"
                        checked={newStudent.residenceType === 'Owned'}
                        onChange={() => setNewStudent({ ...newStudent, residenceType: 'Owned' })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Owned</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Languages Spoken at Home</label>
                  <input
                    type="text"
                    name="languagesSpoken"
                    value={newStudent.languagesSpoken || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Family Monthly Income</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {FAMILY_INCOME_RANGES.map((range) => (
                    <label key={range} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="familyIncome"
                        checked={newStudent.familyIncome === range}
                        onChange={() => setNewStudent({ ...newStudent, familyIncome: range })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Source of Financial Support</label>
                <div className="flex flex-wrap gap-3">
                  {['Parents', 'Grandparents', 'Scholarship', 'Self-supporting', 'Others'].map((source) => (
                    <label key={source} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={newStudent.financialSupport?.includes(source) || false}
                        onChange={() => {
                          const currentSupport = newStudent.financialSupport || [];
                          const updated = currentSupport.includes(source)
                            ? currentSupport.filter((s) => s !== source)
                            : [...currentSupport, source];
                          setNewStudent({ ...newStudent, financialSupport: updated });
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{source}</span>
                    </label>
                  ))}
                </div>
                {newStudent.financialSupport?.includes('Others') && (
                  <div className="mt-3">
                    <input
                      type="text"
                      name="otherFinancialSupport"
                      value={newStudent.otherFinancialSupport || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Specify other financial support"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Leisure Activities</label>
                <div className="flex flex-wrap gap-3">
                  {['Listening to radio', 'Watching TV', 'Picnic', 'Sports', 'Reading', 'Others'].map((activity) => (
                    <label key={activity} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={newStudent.leisureActivities?.includes(activity) || false}
                        onChange={() => {
                          const currentActivities = newStudent.leisureActivities || [];
                          const updated = currentActivities.includes(activity)
                            ? currentActivities.filter((a) => a !== activity)
                            : [...currentActivities, activity];
                          setNewStudent({ ...newStudent, leisureActivities: updated });
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{activity}</span>
                    </label>
                  ))}
                </div>
                {newStudent.leisureActivities?.includes('Others') && (
                  <div className="mt-3">
                    <input
                      type="text"
                      name="otherLeisureActivities"
                      value={newStudent.otherLeisureActivities || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Specify other leisure activities"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Interests</label>
                <input
                  type="text"
                  name="specialInterests"
                  value={newStudent.specialInterests || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Living with Parents</label>
                <div className="flex gap-3">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="livingWithParents"
                      checked={newStudent.livingWithParents === true}
                      onChange={() => setNewStudent({ ...newStudent, livingWithParents: true })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="livingWithParents"
                      checked={newStudent.livingWithParents === false}
                      onChange={() => setNewStudent({ ...newStudent, livingWithParents: false })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {!newStudent.livingWithParents && (
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-800 mb-3">Guardian Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Guardian's Name</label>
                      <input
                        type="text"
                        name="guardianName"
                        value={newStudent.guardianName || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
                      <select
                        name="guardianRelation"
                        value={newStudent.guardianRelation || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select</option>
                        {RELATIONSHIP_OPTIONS.map((relation) => (
                          <option key={relation} value={relation}>
                            {relation.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()).replace('Lord/Lady', 'Lord/Lady')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {newStudent.guardianRelation === 'other' && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specify Relation</label>
                      <input
                        type="text"
                        name="otherGuardianRelation"
                        value={newStudent.otherGuardianRelation || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guardian's Address</label>
                    <input
                      type="text"
                      name="guardianAddress"
                      value={newStudent.guardianAddress || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Siblings (Oldest to Youngest)</label>
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
                      {Array.from({ length: 4 }).map((_, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={newStudent.siblings[index]?.name || ''}
                              onChange={(e) => handleSiblingChange(index, 'name', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={newStudent.siblings[index]?.age || ''}
                              onChange={(e) => handleSiblingChange(index, 'age', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={newStudent.siblings[index]?.school || ''}
                              onChange={(e) => handleSiblingChange(index, 'school', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={newStudent.siblings[index]?.status || ''}
                              onChange={(e) => handleSiblingChange(index, 'status', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={newStudent.siblings[index]?.occupation || ''}
                              onChange={(e) => handleSiblingChange(index, 'occupation', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
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
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Awards/Honors</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">School Year</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {['Preschool', 'Elementary', 'Junior High'].map((level) => (
                      <tr key={level} className="hover:bg-gray-50">
                        <td className="px-3 py-2 text-sm font-medium text-gray-700">{level}</td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={newStudent[`${level.toLowerCase()}School`] || ''}
                            onChange={(e) => handleInputChange({ target: { name: `${level.toLowerCase()}School`, value: e.target.value } })}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={newStudent[`${level.toLowerCase()}Awards`] || ''}
                            onChange={(e) => handleInputChange({ target: { name: `${level.toLowerCase()}Awards`, value: e.target.value } })}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={newStudent[`${level.toLowerCase()}Year`] || ''}
                            onChange={(e) => handleInputChange({ target: { name: `${level.toLowerCase()}Year`, value: e.target.value } })}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* IV. Organizational Affiliations */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">IV. Organizational Affiliations</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-md">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">School Year</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Organization/Club</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Designation</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={newStudent.organizations?.[index]?.year || ''}
                            onChange={(e) => handleOrganizationChange(index, 'year', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., 2023-2024"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={newStudent.organizations?.[index]?.organization || ''}
                            onChange={(e) => handleOrganizationChange(index, 'organization', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={newStudent.organizations?.[index]?.designation || ''}
                            onChange={(e) => handleOrganizationChange(index, 'designation', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* V. Health */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">V. Health</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Any Physical Handicap or Health Problem</label>
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Specify details"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">General Condition</label>
                  <div className="flex gap-3">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="generalCondition"
                        checked={newStudent.generalCondition === 'Good'}
                        onChange={() => setNewStudent({ ...newStudent, generalCondition: 'Good' })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Good</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="generalCondition"
                        checked={newStudent.generalCondition === 'Fair'}
                        onChange={() => setNewStudent({ ...newStudent, generalCondition: 'Fair' })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Fair</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="generalCondition"
                        checked={newStudent.generalCondition === 'Poor'}
                        onChange={() => setNewStudent({ ...newStudent, generalCondition: 'Poor' })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Poor</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Under Medication</label>
                  <div className="flex gap-3">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="underMedication"
                        checked={newStudent.underMedication === 'Yes'}
                        onChange={() => setNewStudent({ ...newStudent, underMedication: 'Yes' })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="underMedication"
                        checked={newStudent.underMedication === 'No'}
                        onChange={() => setNewStudent({ ...newStudent, underMedication: 'No' })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">No</span>
                    </label>
                  </div>
                  {newStudent.underMedication === 'Yes' && (
                    <div className="mt-3">
                      <input
                        type="text"
                        name="medicationDetails"
                        value={newStudent.medicationDetails || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Specify medication"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Requires Special Care/Attention</label>
                  <div className="flex gap-3">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="specialCare"
                        checked={newStudent.specialCare === 'Yes'}
                        onChange={() => setNewStudent({ ...newStudent, specialCare: 'Yes' })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="specialCare"
                        checked={newStudent.specialCare === 'No'}
                        onChange={() => setNewStudent({ ...newStudent, specialCare: 'No' })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">No</span>
                    </label>
                  </div>
                  {newStudent.specialCare === 'Yes' && (
                    <div className="mt-3">
                      <input
                        type="text"
                        name="specialCareDetails"
                        value={newStudent.specialCareDetails || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Specify special care needed"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Doctor Visit</label>
                  <input
                    type="date"
                    name="lastDoctorVisit"
                    value={newStudent.lastDoctorVisit || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
                  <input
                    type="text"
                    name="doctorVisitReason"
                    value={newStudent.doctorVisitReason || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* VI. Test Results */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">VI. Test Results</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border border-gray-200 rounded-md">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Test Taken</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Date Taken</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={newStudent.testResults?.[index]?.test || ''}
                            onChange={(e) => handleTestResultChange(index, 'test', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="date"
                            value={newStudent.testResults?.[index]?.date || ''}
                            onChange={(e) => handleTestResultChange(index, 'date', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={newStudent.testResults?.[index]?.rating || ''}
                            onChange={(e) => handleTestResultChange(index, 'rating', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">Data Privacy Consent</h4>
                <p className="text-sm text-gray-600 mb-3">
                  St. Rita's College of Balingasag—Guidance Center shall protect the data you provided in compliance with the Data Privacy Act of 2012 and its implementing rules and regulations.
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  By signing this form, you hereby agree and express your voluntary, unequivocal, and informed consent that your personal data provided shall be processed for the purposes of carrying out Guidance Program Services.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Signature over Printed Name</label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        name="signatureName"
                        value={newStudent.signatureName || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter name"
                      />
                      <input
                        type="date"
                        name="signatureDate"
                        value={newStudent.signatureDate || ''}
                        onChange={handleInputChange}
                        className="ml-3 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  {(newStudent.age && parseInt(newStudent.age) < 18) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Parent/Guardian Signature</label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          name="parentSignatureName"
                          value={newStudent.parentSignatureName || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter name"
                        />
                        <input
                          type="date"
                          name="parentSignatureDate"
                          value={newStudent.parentSignatureDate || ''}
                          onChange={handleInputChange}
                          className="ml-3 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end items-center rounded-b-xl">
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowModal(false);
                setNewStudent(initialStudentState);
                setErrors({});
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddStudent}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FiSave className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}