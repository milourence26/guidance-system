import { FiX, FiPlus, FiSave, FiUpload, FiUser } from 'react-icons/fi';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const FAMILY_INCOME_RANGES = [
  'Below ₱10,000.00',
  '₱10,001 - ₱15,000',
  '₱15,001 - ₱18,000',
  '₱18,001 - ₱21,000',
  '₱21,001 - ₱24,000',
  '₱24,001 - ₱27,000',
  '₱27,001 - ₱30,000',
  'Above ₱30,000.00'
];

const RELATIONSHIP_OPTIONS = [
  'sister/brother',
  'aunt/uncle',
  'land lord/lady',
  'grandparents',
  'other'
];

export default function HigherEdModal({
  showModal,
  setShowModal,
  newStudent,
  setNewStudent,
  errors,
  setErrors,
  activeSection,
  setActiveSection,
  handleAddStudent,
  handleInputChange,
  triggerFileInput,
  fileInputRef,
  handleFileUpload,
  initialStudentState,
  handleSacramentChange,
  handleSiblingChange,
  handleEducationChange,
  handleOrganizationChange,
  handleTestResultChange
}) {
  const FormNavigation = () => (
    <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
      <nav className="flex overflow-x-auto py-2 px-4">
        {[
          { id: 'personal', label: 'Personal Data' },
          { id: 'family', label: 'Family Info' },
          { id: 'education', label: 'Education' },
          { id: 'organizations', label: 'Organizations' },
          { id: 'health', label: 'Health' },
          { id: 'tests', label: 'Test Results' },
          { id: 'consent', label: 'Consent' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              activeSection === tab.id
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">ST. RITA'S COLLEGE OF BALINGASAG</h2>
              <p className="text-sm opacity-90">Higher Education Department - Guidance Center</p>
            </div>
            <button 
              onClick={() => {
                setShowModal(false);
                setNewStudent(initialStudentState);
                setErrors({});
              }}
              className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
          
          {/* Form Title */}
          <div className="mt-4 text-center">
            <h1 className="text-xl font-bold uppercase tracking-wide">Student Personal Data Sheet</h1>
            <div className="flex justify-center gap-4 mt-3">
              {['New', 'Transferee', 'Returnee', 'Old'].map(type => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <div className={`w-4 h-4 rounded-full border-2 ${newStudent.studentType === type ? 'border-white bg-white/30' : 'border-white/50'}`}>
                    {newStudent.studentType === type && (
                      <div className="w-2 h-2 rounded-full bg-white mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        {/* Form Navigation */}
        <FormNavigation />
        
        {/* Modal Body - Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6">
          {/* School Year and Course - Always visible */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School Year</label>
              <div className="relative">
                <input
                  type="text"
                  name="schoolYear"
                  value={newStudent.schoolYear}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="SY ____"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course*</label>
              <input
                type="text"
                name="course"
                value={newStudent.course}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.course ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Course"
              />
              {errors.course && <p className="mt-1 text-sm text-red-600">{errors.course}</p>}
            </div>
          </div>

          {/* PERSONAL DATA SECTION */}
          {(activeSection === 'personal') && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-800">I. PERSONAL DATA</h3>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-xl">
                {/* Student Photo Upload */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    {newStudent.studentPhotoUrl ? (
                      <img 
                        src={newStudent.studentPhotoUrl} 
                        alt="Student" 
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-md">
                        <FiUser className="text-gray-400 text-4xl" />
                      </div>
                    )}
                    <button
                      onClick={triggerFileInput}
                      className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors"
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

                {/* Name Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name*</label>
                    <input
                      type="text"
                      name="lastName"
                      value={newStudent.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name*</label>
                    <input
                      type="text"
                      name="givenName"
                      value={newStudent.givenName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.givenName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.givenName && <p className="mt-1 text-sm text-red-600">{errors.givenName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                    <input
                      type="text"
                      name="middleName"
                      value={newStudent.middleName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nickname</label>
                    <input
                      type="text"
                      name="nickname"
                      value={newStudent.nickname}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Additional Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
                    <select
                      name="gender"
                      value={newStudent.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
                    <input
                      type="text"
                      name="nationality"
                      value={newStudent.nationality}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={newStudent.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Home Address</label>
                    <textarea
                      name="homeAddress"
                      value={newStudent.homeAddress}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City Address (if boarding)</label>
                    <textarea
                      name="cityAddress"
                      value={newStudent.cityAddress}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Birth Date and Place */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <div className="grid grid-cols-3 gap-3">
                      <select
                        name="birthMonth"
                        value={newStudent.birthMonth}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Month</option>
                        {MONTHS.map(month => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                      <select
                        name="birthDay"
                        value={newStudent.birthDay}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Day</option>
                        {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                      <select
                        name="birthYear"
                        value={newStudent.birthYear}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Year</option>
                        {Array.from({length: 30}, (_, i) => new Date().getFullYear() - i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Place of Birth</label>
                    <input
                      type="text"
                      name="birthPlace"
                      value={newStudent.birthPlace}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                    <input
                      type="text"
                      name="contactNumber"
                      value={newStudent.contactNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={newStudent.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Religion</label>
                    <input
                      type="text"
                      name="religion"
                      value={newStudent.religion}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Civil Status */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Civil Status</label>
                  <select
                    name="civilStatus"
                    value={newStudent.civilStatus}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Separated">Separated</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>

                {/* Emergency Contact */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Person</label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={newStudent.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                    <input
                      type="text"
                      name="emergencyRelation"
                      value={newStudent.emergencyRelation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Number</label>
                    <input
                      type="text"
                      name="emergencyNumber"
                      value={newStudent.emergencyNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAMILY INFORMATION SECTION */}
          {(activeSection === 'family') && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-800">II. FAMILY INFORMATION</h3>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-xl">
                {/* Father's and Mother's Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Father's Information */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3 text-blue-800 flex items-center">
                      <FiUser className="mr-2" />
                      Father's Information
                    </h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                          <input
                            type="text"
                            name="fatherLastName"
                            value={newStudent.fatherLastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                          <input
                            type="text"
                            name="fatherFirstName"
                            value={newStudent.fatherFirstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                          <input
                            type="text"
                            name="fatherMiddleName"
                            value={newStudent.fatherMiddleName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                          <input
                            type="text"
                            name="fatherOccupation"
                            value={newStudent.fatherOccupation}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select
                            name="fatherStatus"
                            value={newStudent.fatherStatus}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select</option>
                            <option value="Employed">Employed</option>
                            <option value="Unemployed">Unemployed</option>
                            <option value="Retired">Retired</option>
                            <option value="Disabled">Disabled</option>
                            <option value="Deceased">Deceased</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                          <div className="flex gap-4">
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="fatherLocation"
                                value="Overseas"
                                checked={newStudent.fatherLocation === "Overseas"}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              />
                              <span className="ml-2 text-gray-700">Overseas</span>
                            </label>
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="fatherLocation"
                                value="Local"
                                checked={newStudent.fatherLocation === "Local"}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              />
                              <span className="ml-2 text-gray-700">Local</span>
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                          <div className="flex gap-4">
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="fatherEmploymentType"
                                value="Private"
                                checked={newStudent.fatherEmploymentType === "Private"}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              />
                              <span className="ml-2 text-gray-700">Private</span>
                            </label>
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="fatherEmploymentType"
                                value="Government"
                                checked={newStudent.fatherEmploymentType === "Government"}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              />
                              <span className="ml-2 text-gray-700">Government</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Highest Educational Attainment</label>
                        <select
                          name="fatherEducation"
                          value={newStudent.fatherEducation}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select</option>
                          <option value="Some Elementary">Some Elementary</option>
                          <option value="Elementary">Elementary</option>
                          <option value="Some High School">Some High School</option>
                          <option value="High School">High School</option>
                          <option value="Some College">Some College</option>
                          <option value="College Degree">College Degree</option>
                          <option value="Post Graduate Studies">Post Graduate Studies</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                        <input
                          type="text"
                          name="fatherSpecialization"
                          value={newStudent.fatherSpecialization}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mother's Information */}
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3 text-pink-800 flex items-center">
                      <FiUser className="mr-2" />
                      Mother's Information
                    </h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                          <input
                            type="text"
                            name="motherLastName"
                            value={newStudent.motherLastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                          <input
                            type="text"
                            name="motherFirstName"
                            value={newStudent.motherFirstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                          <input
                            type="text"
                            name="motherMiddleName"
                            value={newStudent.motherMiddleName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                          <input
                            type="text"
                            name="motherOccupation"
                            value={newStudent.motherOccupation}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select
                            name="motherStatus"
                            value={newStudent.motherStatus}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select</option>
                            <option value="Employed">Employed</option>
                            <option value="Unemployed">Unemployed</option>
                            <option value="Retired">Retired</option>
                            <option value="Disabled">Disabled</option>
                            <option value="Deceased">Deceased</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                          <div className="flex gap-4">
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="motherLocation"
                                value="Overseas"
                                checked={newStudent.motherLocation === "Overseas"}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              />
                              <span className="ml-2 text-gray-700">Overseas</span>
                            </label>
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="motherLocation"
                                value="Local"
                                checked={newStudent.motherLocation === "Local"}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              />
                              <span className="ml-2 text-gray-700">Local</span>
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                          <div className="flex gap-4">
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="motherEmploymentType"
                                value="Private"
                                checked={newStudent.motherEmploymentType === "Private"}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              />
                              <span className="ml-2 text-gray-700">Private</span>
                            </label>
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="motherEmploymentType"
                                value="Government"
                                checked={newStudent.motherEmploymentType === "Government"}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              />
                              <span className="ml-2 text-gray-700">Government</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Highest Educational Attainment</label>
                        <select
                          name="motherEducation"
                          value={newStudent.motherEducation}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select</option>
                          <option value="Some Elementary">Some Elementary</option>
                          <option value="Elementary">Elementary</option>
                          <option value="Some High School">Some High School</option>
                          <option value="High School">High School</option>
                          <option value="Some College">Some College</option>
                          <option value="College Degree">College Degree</option>
                          <option value="Post Graduate Studies">Post Graduate Studies</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                        <input
                          type="text"
                          name="motherSpecialization"
                          value={newStudent.motherSpecialization}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parents' Marital Status */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parents' Marital Status</label>
                  <div className="flex gap-4 flex-wrap">
                    {['Sacramental Marriage', 'Civil Marriage', 'Legally Separated', 'Annulled', 'Unmarried'].map(status => (
                      <label key={status} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="parentsMaritalStatus"
                          checked={newStudent.parentsMaritalStatus === status}
                          onChange={() => setNewStudent({...newStudent, parentsMaritalStatus: status})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Residence Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Is your residence:</label>
                    <div className="flex gap-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="residenceType"
                          checked={newStudent.residenceType === 'rented'}
                          onChange={() => setNewStudent({...newStudent, residenceType: 'rented'})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Rented</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="residenceType"
                          checked={newStudent.residenceType === 'owned'}
                          onChange={() => setNewStudent({...newStudent, residenceType: 'owned'})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Owned</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Languages spoken at home:</label>
                    <input
                      type="text"
                      name="languagesSpoken"
                      value={newStudent.languagesSpoken}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Family Monthly Income */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Family Monthly Income</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {FAMILY_INCOME_RANGES.map(range => (
                      <label key={range} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="familyIncome"
                          checked={newStudent.familyIncome === range}
                          onChange={() => setNewStudent({...newStudent, familyIncome: range})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Financial Support */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Source of financial support:</label>
                  <div className="flex flex-wrap gap-3">
                    {['Parents', 'Grandparents', 'Others'].map(source => (
                      <label key={source} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={newStudent.financialSupport.includes(source)}
                          onChange={() => {
                            const updated = newStudent.financialSupport.includes(source)
                              ? newStudent.financialSupport.filter(s => s !== source)
                              : [...newStudent.financialSupport, source];
                            setNewStudent({...newStudent, financialSupport: updated});
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-gray-700">{source}</span>
                      </label>
                    ))}
                  </div>
                  {newStudent.financialSupport.includes('Others') && (
                    <div className="mt-2">
                      <input
                        type="text"
                        name="otherFinancialSupport"
                        value={newStudent.otherFinancialSupport}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Please specify other financial support"
                      />
                    </div>
                  )}
                </div>

                {/* Leisure Activities */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Leisure activities of family members:</label>
                  <div className="flex flex-wrap gap-3">
                    {['listening to radio', 'watching TV', 'picnic'].map(activity => (
                      <label key={activity} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={newStudent.leisureActivities.includes(activity)}
                          onChange={() => {
                            const updated = newStudent.leisureActivities.includes(activity)
                              ? newStudent.leisureActivities.filter(a => a !== activity)
                              : [...newStudent.leisureActivities, activity];
                            setNewStudent({...newStudent, leisureActivities: updated});
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-gray-700">{activity}</span>
                      </label>
                    ))}
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={newStudent.leisureActivities.includes('other')}
                        onChange={() => {
                          const updated = newStudent.leisureActivities.includes('other')
                            ? newStudent.leisureActivities.filter(a => a !== 'other')
                            : [...newStudent.leisureActivities, 'other'];
                          setNewStudent({...newStudent, leisureActivities: updated});
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700">Others</span>
                    </label>
                  </div>
                  {newStudent.leisureActivities.includes('other') && (
                    <div className="mt-2">
                      <input
                        type="text"
                        name="otherLeisureActivities"
                        value={newStudent.otherLeisureActivities}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Please specify other leisure activities"
                      />
                    </div>
                  )}
                </div>

                {/* Special Talents */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special talents:</label>
                  <input
                    type="text"
                    name="specialTalents"
                    value={newStudent.specialTalents}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Child Residing With */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Child is residing with:</label>
                  <div className="flex gap-4 flex-wrap">
                    {['Both Parents', 'Father Only', 'Mother Only', 'Others'].map(status => (
                      <label key={status} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="childResidingWith"
                          checked={newStudent.childResidingWith === status}
                          onChange={() => setNewStudent({...newStudent, childResidingWith: status})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Guardian Information (if not living with parents) */}
                {newStudent.childResidingWith === 'Others' && (
                  <div className="mb-6 border-t pt-4">
                    <h4 className="font-medium mb-3 text-gray-800">Guardian Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Guardian's Name</label>
                        <input
                          type="text"
                          name="guardianName"
                          value={newStudent.guardianName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Relation</label>
                        <select
                          name="guardianRelation"
                          value={newStudent.guardianRelation}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select</option>
                          {RELATIONSHIP_OPTIONS.map(relation => (
                            <option key={relation} value={relation}>
                              {relation.replace(/(^\w|\s\w)/g, m => m.toUpperCase()).replace('Lord/Lady', 'Lord/Lady')}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {newStudent.guardianRelation === 'other' && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Please specify relation</label>
                        <input
                          type="text"
                          name="otherGuardianRelation"
                          value={newStudent.otherGuardianRelation}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Guardian's Address</label>
                      <input
                        type="text"
                        name="guardianAddress"
                        value={newStudent.guardianAddress}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}

                {/* Birth Order and Siblings Count */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Birth Order</label>
                    <div className="flex flex-wrap gap-3">
                      {[1, 2, 3, 4, 5, 6, 7].map(num => (
                        <label key={num} className="inline-flex items-center">
                          <input
                            type="radio"
                            name="birthOrder"
                            value={num}
                            checked={newStudent.birthOrder === num.toString()}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-2 text-gray-700">{num}</span>
                        </label>
                      ))}
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="birthOrder"
                          value="Other"
                          checked={![1, 2, 3, 4, 5, 6, 7].includes(parseInt(newStudent.birthOrder)) && newStudent.birthOrder !== ""}
                          onChange={() => setNewStudent({...newStudent, birthOrder: "Other"})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Other</span>
                      </label>
                      {newStudent.birthOrder === "Other" && (
                        <input
                          type="text"
                          value={newStudent.otherBirthOrder || ""}
                          onChange={(e) => setNewStudent({...newStudent, otherBirthOrder: e.target.value})}
                          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                          placeholder="Specify"
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Siblings</label>
                    <input
                      type="number"
                      name="siblingsCount"
                      value={newStudent.siblingsCount}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Other Relatives at Home */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Other Relatives at Home</label>
                    <div className="flex flex-wrap gap-3">
                      {['Brother/s', 'Sister/s', 'Grand Parents', 'Uncle', 'Aunt', 'Step Brother/s', 'Step Sister/s', 'Cousins'].map(rel => (
                        <label key={rel} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={newStudent.relativesAtHome.includes(rel)}
                            onChange={() => {
                              const updated = newStudent.relativesAtHome.includes(rel)
                                ? newStudent.relativesAtHome.filter(r => r !== rel)
                                : [...newStudent.relativesAtHome, rel];
                              setNewStudent({...newStudent, relativesAtHome: updated});
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-gray-700">{rel}</span>
                        </label>
                      ))}
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={newStudent.relativesAtHome.includes('Other')}
                          onChange={() => {
                            const updated = newStudent.relativesAtHome.includes('Other')
                              ? newStudent.relativesAtHome.filter(r => r !== 'Other')
                              : [...newStudent.relativesAtHome, 'Other'];
                            setNewStudent({...newStudent, relativesAtHome: updated});
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-gray-700">Other</span>
                      </label>
                      {newStudent.relativesAtHome.includes('Other') && (
                        <input
                          type="text"
                          value={newStudent.otherRelatives}
                          onChange={(e) => setNewStudent({...newStudent, otherRelatives: e.target.value})}
                          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                          placeholder="Specify"
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Number of Relatives at Home</label>
                    <input
                      type="number"
                      name="totalRelatives"
                      value={newStudent.totalRelatives}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Siblings Table */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Siblings (from Oldest to Youngest)</label>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School Attended</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupation</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Array.from({length: Math.max(6, newStudent.siblingsCount)}).map((_, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-2 whitespace-nowrap">
                              <input
                                type="text"
                                value={newStudent.siblings[index]?.name || ''}
                                onChange={(e) => handleSiblingChange(index, 'name', e.target.value)}
                                className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
                              />
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <input
                                type="number"
                                value={newStudent.siblings[index]?.age || ''}
                                onChange={(e) => handleSiblingChange(index, 'age', e.target.value)}
                                className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
                              />
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <input
                                type="text"
                                value={newStudent.siblings[index]?.school || ''}
                                onChange={(e) => handleSiblingChange(index, 'school', e.target.value)}
                                className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
                              />
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <input
                                type="text"
                                value={newStudent.siblings[index]?.status || ''}
                                onChange={(e) => handleSiblingChange(index, 'status', e.target.value)}
                                className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
                              />
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <input
                                type="text"
                                value={newStudent.siblings[index]?.occupation || ''}
                                onChange={(e) => handleSiblingChange(index, 'occupation', e.target.value)}
                                className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* EDUCATIONAL BACKGROUND SECTION */}
          {(activeSection === 'education') && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-800">III. EDUCATIONAL BACKGROUND</h3>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-xl">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School Attended/School Address</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Awards/Honors Received</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School Year Attended</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {['preschool', 'gradeSchool', 'highSchool'].map(level => (
                        <tr key={level} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                            {level === 'preschool' ? 'Preschool' : level === 'gradeSchool' ? 'Grade School' : 'High School'}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              value={newStudent.educationBackground[level]?.school || ''}
                              onChange={(e) => handleEducationChange(level, 'school', e.target.value)}
                              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              value={newStudent.educationBackground[level]?.awards || ''}
                              onChange={(e) => handleEducationChange(level, 'awards', e.target.value)}
                              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              value={newStudent.educationBackground[level]?.year || ''}
                              onChange={(e) => handleEducationChange(level, 'year', e.target.value)}
                              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ORGANIZATIONAL AFFILIATIONS SECTION */}
          {(activeSection === 'organizations') && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-800">IV. ORGANIZATIONAL AFFILIATIONS</h3>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-xl">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SY</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization/Club</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {newStudent.organizations.map((_, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              value={newStudent.organizations[index]?.year || ''}
                              onChange={(e) => handleOrganizationChange(index, 'year', e.target.value)}
                              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
                              placeholder="SY 20___-20___"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              value={newStudent.organizations[index]?.organization || ''}
                              onChange={(e) => handleOrganizationChange(index, 'organization', e.target.value)}
                              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              value={newStudent.organizations[index]?.designation || ''}
                              onChange={(e) => handleOrganizationChange(index, 'designation', e.target.value)}
                              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* HEALTH SECTION */}
          {(activeSection === 'health') && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-800">V. HEALTH</h3>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                    <input
                      type="text"
                      name="height"
                      value={newStudent.height}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                    <input
                      type="text"
                      name="weight"
                      value={newStudent.weight}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Any physical handicap or health problem:</label>
                    <div className="flex gap-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="healthProblem"
                          checked={newStudent.healthProblem === 'Yes'}
                          onChange={() => setNewStudent({...newStudent, healthProblem: 'Yes'})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="healthProblem"
                          checked={newStudent.healthProblem === 'No'}
                          onChange={() => setNewStudent({...newStudent, healthProblem: 'No'})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">No</span>
                      </label>
                    </div>
                    {newStudent.healthProblem === 'Yes' && (
                      <div className="mt-2">
                        <input
                          type="text"
                          name="healthProblemDetails"
                          value={newStudent.healthProblemDetails}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Please specify"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">General Condition:</label>
                    <div className="flex gap-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="generalCondition"
                          checked={newStudent.generalCondition === 'Good Condition'}
                          onChange={() => setNewStudent({...newStudent, generalCondition: 'Good Condition'})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Good Condition</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="generalCondition"
                          checked={newStudent.generalCondition === 'Under Medication'}
                          onChange={() => setNewStudent({...newStudent, generalCondition: 'Under Medication'})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Under Medication</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="generalCondition"
                          checked={newStudent.generalCondition === 'With Special Care/Attention'}
                          onChange={() => setNewStudent({...newStudent, generalCondition: 'With Special Care/Attention'})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">With Special Care/Attention</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">When was your last visit to the doctor?</label>
                    <input
                      type="date"
                      name="lastDoctorVisit"
                      value={newStudent.lastDoctorVisit}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reason for visit:</label>
                    <input
                      type="text"
                      name="doctorVisitReason"
                      value={newStudent.doctorVisitReason}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TEST RESULTS SECTION */}
          {(activeSection === 'tests') && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-800">VI. TEST RESULTS</h3>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-xl">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Taken</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Taken</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {newStudent.testResults.map((_, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              value={newStudent.testResults[index]?.test || ''}
                              onChange={(e) => handleTestResultChange(index, 'test', e.target.value)}
                              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="date"
                              value={newStudent.testResults[index]?.date || ''}
                              onChange={(e) => handleTestResultChange(index, 'date', e.target.value)}
                              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              value={newStudent.testResults[index]?.rating || ''}
                              onChange={(e) => handleTestResultChange(index, 'rating', e.target.value)}
                              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Data Privacy Consent */}
          {(activeSection === 'consent') && (
            <div className="mb-6 p-5 border border-gray-200 rounded-xl bg-gray-50">
              <p className="text-sm text-gray-700 mb-3">
                St. Rita's College of Balingasag – Guidance Center shall protect the data you provided in compliance with the Data Privacy Act of 2012 and its implementing rules and regulations.
              </p>
              <p className="text-sm text-gray-700">
                By signing this form, you hereby agree and express your voluntary, unequivocal and informed consent that your Personal data which you have provided shall be processed for the purposes of carrying out Guidance Program Services.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Signature over printed name</label>
                  <div className="flex items-center">
                    <div className="border-b border-gray-400 w-full h-8"></div>
                    <span className="ml-3 text-sm text-gray-500">Date:</span>
                    <input
                      type="date"
                      name="signatureDate"
                      value={newStudent.signatureDate}
                      onChange={handleInputChange}
                      className="ml-2 px-3 py-1 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
                {newStudent.age < 18 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Signature of Parent/Guardian</label>
                    <div className="flex items-center">
                      <div className="border-b border-gray-400 w-full h-8"></div>
                      <span className="ml-3 text-sm text-gray-500">Date:</span>
                      <input
                        type="date"
                        name="parentSignatureDate"
                        value={newStudent.parentSignatureDate}
                        onChange={handleInputChange}
                        className="ml-2 px-3 py-1 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {activeSection === 'personal' ? 'I. Personal Data' : 
             activeSection === 'family' ? 'II. Family Information' :
             activeSection === 'education' ? 'III. Educational Background' :
             activeSection === 'organizations' ? 'IV. Organizational Affiliations' :
             activeSection === 'health' ? 'V. Health' :
             activeSection === 'tests' ? 'VI. Test Results' : 'Consent'}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowModal(false);
                setNewStudent(initialStudentState);
                setErrors({});
              }}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddStudent}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FiSave className="w-5 h-5" />
              Save Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}