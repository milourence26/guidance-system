//BasicEdModal
import { FiX, FiPlus, FiSave, FiUpload, FiUser } from 'react-icons/fi';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const FAMILY_INCOME_RANGES = [
  'Below ₱10,000.00',
  '₱10,001 - ₱15,000',
  '₱15,001 - ₱20,000',
  '₱20,001 - ₱25,000',
  '₱25,001 - ₱30,000',
  'Above ₱30,000'
];

const RELATIONSHIP_OPTIONS = [
  'sister/brother',
  'aunt/uncle',
  'land lord/lady',
  'grandparents',
  'other'
];

export default function StudentModal({
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
  // Form Navigation component (moved inside since it's only used here)
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
              <p className="text-sm opacity-90">Basic Education Department - Guidance Center</p>
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
          {/* School Year and Grade Level - Always visible */}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Grade/Year Level*</label>
              <input
                type="text"
                name="gradeLevel"
                value={newStudent.gradeLevel}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.gradeLevel ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Grade/Year Level"
              />
              {errors.gradeLevel && <p className="mt-1 text-sm text-red-600">{errors.gradeLevel}</p>}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Given Name*</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Suffix</label>
                    <select
                      name="suffix"
                      value={newStudent.suffix}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

                {/* Additional Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      name="gender"
                      value={newStudent.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Citizenship</label>
                    <input
                      type="text"
                      name="citizenship"
                      value={newStudent.citizenship}
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
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={newStudent.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tel./Mobile #</label>
                    <input
                      type="text"
                      name="contactNumber"
                      value={newStudent.contactNumber}
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

                {/* Sacraments */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Sacraments Received:</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['baptism', 'firstCommunion', 'confirmation'].map(sacrament => (
                      <div key={sacrament} className="border border-gray-200 p-4 rounded-lg hover:border-blue-300 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-gray-700 font-medium capitalize">
                            {sacrament === 'firstCommunion' ? '1st Communion' : sacrament}
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={newStudent[sacrament].received}
                              onChange={() => handleSacramentChange(sacrament, 'received', !newStudent[sacrament].received)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        {newStudent[sacrament].received && (
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Date</label>
                              <input
                                type="date"
                                value={newStudent[sacrament].date}
                                onChange={(e) => handleSacramentChange(sacrament, 'date', e.target.value)}
                                className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Church</label>
                              <input
                                type="text"
                                value={newStudent[sacrament].church}
                                onChange={(e) => handleSacramentChange(sacrament, 'church', e.target.value)}
                                className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
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
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                        <input
                          type="text"
                          name="fatherName"
                          value={newStudent.fatherName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
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
                            <option value="Deceased">Deceased</option>
                          </select>
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
                          <option value="Elementary">Elementary</option>
                          <option value="High School">High School</option>
                          <option value="College">College</option>
                          <option value="Post Graduate">Post Graduate</option>
                        </select>
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
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                        <input
                          type="text"
                          name="motherName"
                          value={newStudent.motherName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
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
                            <option value="Deceased">Deceased</option>
                          </select>
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
                          <option value="Elementary">Elementary</option>
                          <option value="High School">High School</option>
                          <option value="College">College</option>
                          <option value="Post Graduate">Post Graduate</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parents' Marital Status */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parents' Marital Status</label>
                  <div className="flex gap-4 flex-wrap">
                    {['Married', 'Separated', 'Divorced', 'Widowed', 'Single Parent'].map(status => (
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
                          checked={newStudent.residenceType === 'Rented'}
                          onChange={() => setNewStudent({...newStudent, residenceType: 'Rented'})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Rented</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="residenceType"
                          checked={newStudent.residenceType === 'Owned'}
                          onChange={() => setNewStudent({...newStudent, residenceType: 'Owned'})}
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
                    {['Parents', 'Grandparents', 'Scholarship', 'Self-supporting', 'Others'].map(source => (
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Leisure activities:</label>
                  <div className="flex flex-wrap gap-3">
                    {['Listening to radio', 'Watching TV', 'Picnic', 'Sports', 'Reading', 'Others'].map(activity => (
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
                  </div>
                  {newStudent.leisureActivities.includes('Others') && (
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

                {/* Special Interests */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special interests:</label>
                  <input
                    type="text"
                    name="specialInterests"
                    value={newStudent.specialInterests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Living with Parents */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Living with parents:</label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="livingWithParents"
                        checked={newStudent.livingWithParents === true}
                        onChange={() => setNewStudent({...newStudent, livingWithParents: true})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="livingWithParents"
                        checked={newStudent.livingWithParents === false}
                        onChange={() => setNewStudent({...newStudent, livingWithParents: false})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">No</span>
                    </label>
                  </div>
                </div>

                {/* Guardian Information (if not living with parents) */}
                {!newStudent.livingWithParents && (
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
                        {Array.from({length: 4}).map((_, index) => (
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
                                type="text"
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
                      {['Preschool', 'Grade School', 'High School'].map(level => (
                        <tr key={level} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{level}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              value={newStudent.educationBackground[level.toLowerCase()]?.school || ''}
                              onChange={(e) => handleEducationChange(level.toLowerCase(), 'school', e.target.value)}
                              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              value={newStudent.educationBackground[level.toLowerCase()]?.awards || ''}
                              onChange={(e) => handleEducationChange(level.toLowerCase(), 'awards', e.target.value)}
                              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              value={newStudent.educationBackground[level.toLowerCase()]?.year || ''}
                              onChange={(e) => handleEducationChange(level.toLowerCase(), 'year', e.target.value)}
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
                      {Array.from({length: 4}).map((_, index) => (
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
                          checked={newStudent.generalCondition === 'Good'}
                          onChange={() => setNewStudent({...newStudent, generalCondition: 'Good'})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Good</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="generalCondition"
                          checked={newStudent.generalCondition === 'Fair'}
                          onChange={() => setNewStudent({...newStudent, generalCondition: 'Fair'})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Fair</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="generalCondition"
                          checked={newStudent.generalCondition === 'Poor'}
                          onChange={() => setNewStudent({...newStudent, generalCondition: 'Poor'})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Poor</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Under Medication:</label>
                    <div className="flex gap-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="underMedication"
                          checked={newStudent.underMedication === 'Yes'}
                          onChange={() => setNewStudent({...newStudent, underMedication: 'Yes'})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="underMedication"
                          checked={newStudent.underMedication === 'No'}
                          onChange={() => setNewStudent({...newStudent, underMedication: 'No'})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">No</span>
                      </label>
                    </div>
                    {newStudent.underMedication === 'Yes' && (
                      <div className="mt-2">
                        <input
                          type="text"
                          name="medicationDetails"
                          value={newStudent.medicationDetails}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Please specify medication"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Requires Special Care/Attention:</label>
                    <div className="flex gap-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="specialCare"
                          checked={newStudent.specialCare === 'Yes'}
                          onChange={() => setNewStudent({...newStudent, specialCare: 'Yes'})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="specialCare"
                          checked={newStudent.specialCare === 'No'}
                          onChange={() => setNewStudent({...newStudent, specialCare: 'No'})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">No</span>
                      </label>
                    </div>
                    {newStudent.specialCare === 'Yes' && (
                      <div className="mt-2">
                        <input
                          type="text"
                          name="specialCareDetails"
                          value={newStudent.specialCareDetails}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Please specify special care needed"
                        />
                      </div>
                    )}
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
                      {Array.from({length: 3}).map((_, index) => (
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
                St. Rita's College of Balingasag—Guidance Center shall protect the data you provided in compliance with the Data Privacy Act of 2012 and its implementing rules and regulations.
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