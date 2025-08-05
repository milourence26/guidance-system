import { useRef } from "react";
import { FiX, FiUser, FiUpload, FiSave } from "react-icons/fi";

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const FAMILY_INCOME_RANGES = [
  'Below ₱10,000.00',
  '₱10,001 - ₱15,000',
  '₱15,001 - ₱20,000',
  '₱20,001 - ₱25,000',
  '₱25,001 - ₱30,000',
  'Above ₱30,000'
];
const RELATIONSHIP_OPTIONS = ['sister/brother', 'aunt/uncle', 'grandparents', 'other'];
const GRADE_LEVELS = [
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
  'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
];
const MARITAL_STATUSES = ['Sacramental Marriage', 'Civil', 'Legally Separated', 'Annulled', 'Unmarried'];
const RESIDENCE_OPTIONS = ['Both Parents', 'Father Only', 'Mother Only', 'Others'];

export default function BasicEdForm({
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
  initialStudentState,
}) {
  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewStudent({ ...newStudent, studentPhotoUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 ${showModal ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">St. Rita's College of Balingasag</h2>
              <p className="text-xs opacity-90">Basic Education Department - Guidance Center</p>
            </div>
            <button
              onClick={() => {
                setShowModal(false);
                setNewStudent(initialStudentState);
                setErrors({});
              }}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-3 text-center">
            <h1 className="text-base font-bold uppercase tracking-wider">Student Personal Data Sheet</h1>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {['New', 'Transferee', 'Returnee', 'Old'].map((type) => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="studentType"
                    checked={newStudent.studentType === type}
                    onChange={() => setNewStudent({ ...newStudent, studentType: type })}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-200"
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {/* School Year and Grade/Year Level */}
          <section className="mb-8">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">School Year (SY)*</label>
                  <input
                    type="text"
                    name="schoolYear"
                    value={newStudent.schoolYear}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-black text-sm"
                    placeholder="e.g., 2023-2024"
                  />
                  {errors.schoolYear && <p className="mt-1 text-xs text-red-600">{errors.schoolYear}</p>}
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">Grade/Year Level*</label>
                  <select
                    name="gradeYearLevel"
                    value={newStudent.gradeYearLevel}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-black text-sm"
                  >
                    <option value="">Select Grade/Year</option>
                    {GRADE_LEVELS.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  {errors.gradeYearLevel && <p className="mt-1 text-xs text-red-600">{errors.gradeYearLevel}</p>}
                </div>
              </div>
            </div>
          </section>
          {/* I. Personal Data */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">I. Personal Data</h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-6">
              {/* Student Photo */}
              <div className="flex justify-center">
                <div className="relative">
                  {newStudent.studentPhotoUrl ? (
                    <img
                      src={newStudent.studentPhotoUrl}
                      alt="Student"
                      className="w-20 h-20 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                      <FiUser className="text-gray-400 text-2xl" />
                    </div>
                  )}
                  <button
                    onClick={triggerFileInput}
                    className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600 transition-colors"
                  >
                    <FiUpload className="w-3 h-3" />
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
                  <label className="block text-base font-medium text-gray-600 mb-1">Last Name*</label>
                  <input
                    type="text"
                    name="lastName"
                    value={newStudent.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm ${errors.lastName ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">Given Name*</label>
                  <input
                    type="text"
                    name="givenName"
                    value={newStudent.givenName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm ${errors.givenName ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  {errors.givenName && <p className="mt-1 text-xs text-red-600">{errors.givenName}</p>}
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">Middle Name</label>
                  <input
                    type="text"
                    name="middleName"
                    value={newStudent.middleName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">Suffix</label>
                  <select
                    name="suffix"
                    value={newStudent.suffix}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
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
              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={newStudent.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">Citizenship</label>
                  <input
                    type="text"
                    name="citizenship"
                    value={newStudent.citizenship}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={newStudent.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
              {/* Address */}
              <div>
                <label className="block text-base font-medium text-gray-600 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={newStudent.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              {/* Birth Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">Date of Birth</label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      name="birthMonth"
                      value={newStudent.birthMonth}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
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
                      value={newStudent.birthDay}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
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
                      value={newStudent.birthYear}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
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
                  <label className="block text-base font-medium text-gray-600 mb-1">Place of Birth</label>
                  <input
                    type="text"
                    name="birthPlace"
                    value={newStudent.birthPlace}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
              {/* Contact and Religion */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">Tel./Mobile #</label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={newStudent.contactNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">Religion</label>
                  <input
                    type="text"
                    name="religion"
                    value={newStudent.religion}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
              {/* Sacraments */}
              <div>
                <label className="block text-base font-medium text-gray-600 mb-2">Sacraments Received</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['baptism', 'firstCommunion', 'confirmation'].map((sacrament) => (
                    <div key={sacrament} className="border border-gray-200 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600 capitalize">
                          {sacrament === 'firstCommunion' ? '1st Communion' : sacrament}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newStudent[sacrament].received}
                            onChange={() =>
                              handleSacramentChange(sacrament, 'received', !newStudent[sacrament].received)
                            }
                            className="sr-only peer"
                          />
                          <div className="w-9 h-4 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
                        </label>
                      </div>
                      {newStudent[sacrament].received && (
                        <div className="space-y-2">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Date</label>
                            <input
                              type="date"
                              value={newStudent[sacrament].date}
                              onChange={(e) => handleSacramentChange(sacrament, 'date', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Church</label>
                            <input
                              type="text"
                              value={newStudent[sacrament].church}
                              onChange={(e) => handleSacramentChange(sacrament, 'church', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* Emergency Contact */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">Person to be contacted in case of emergency</label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={newStudent.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">Relationship</label>
                  <input
                    type="text"
                    name="emergencyRelation"
                    value={newStudent.emergencyRelation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">Contact Number</label>
                  <input
                    type="text"
                    name="emergencyNumber"
                    value={newStudent.emergencyNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </section>
          {/* II. Family Information */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">II. Family Information</h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Father's Information */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-3">Father's Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-base font-medium text-gray-600 mb-1">Name (Surname Given Name Middle Name)</label>
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          name="fatherSurname"
                          value={newStudent.fatherSurname}
                          onChange={handleInputChange}
                          placeholder="Surname"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <input
                          type="text"
                          name="fatherGivenName"
                          value={newStudent.fatherGivenName}
                          onChange={handleInputChange}
                          placeholder="Given Name"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <input
                          type="text"
                          name="fatherMiddleName"
                          value={newStudent.fatherMiddleName}
                          onChange={handleInputChange}
                          placeholder="Middle Name"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-base font-medium text-gray-600 mb-1">Occupation</label>
                        <input
                          type="text"
                          name="fatherOccupation"
                          value={newStudent.fatherOccupation}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-base font-medium text-gray-600 mb-1">Status</label>
                        <select
                          name="fatherStatus"
                          value={newStudent.fatherStatus}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                          <option value="">Select</option>
                          <option value="Employed">Employed</option>
                          <option value="Unemployed">Unemployed</option>
                          <option value="Deceased">Deceased</option>
                          <option value="Retired">Retired</option>
                          <option value="Disabled">Disabled</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-base font-medium text-gray-600 mb-1">Location</label>
                        <select
                          name="fatherLocation"
                          value={newStudent.fatherLocation}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                          <option value="">Select</option>
                          <option value="Overseas">Overseas</option>
                          <option value="Local">Local</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-base font-medium text-gray-600 mb-1">Type</label>
                        <select
                          name="fatherEmploymentType"
                          value={newStudent.fatherEmploymentType}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                          <option value="">Select</option>
                          <option value="Private">Private</option>
                          <option value="Government">Government</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-base font-medium text-gray-600 mb-1">Highest Educational Attainment</label>
                      <select
                        name="fatherEducation"
                        value={newStudent.fatherEducation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                      >
                        <option value="">Select</option>
                        <option value="Elementary">Elementary</option>
                        <option value="High School">High School</option>
                        <option value="College">College</option>
                        <option value="Post Graduate">Post Graduate</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-base font-medium text-gray-600 mb-1">Specialization</label>
                      <input
                        type="text"
                        name="fatherSpecialization"
                        value={newStudent.fatherSpecialization}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  </div>
                </div>
                {/* Mother's Information */}
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h4 className="font-medium text-pink-800 mb-3">Mother's Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-base font-medium text-gray-600 mb-1">Name (Surname Given Name Middle Name)</label>
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          name="motherSurname"
                          value={newStudent.motherSurname}
                          onChange={handleInputChange}
                          placeholder="Surname"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <input
                          type="text"
                          name="motherGivenName"
                          value={newStudent.motherGivenName}
                          onChange={handleInputChange}
                          placeholder="Given Name"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <input
                          type="text"
                          name="motherMiddleName"
                          value={newStudent.motherMiddleName}
                          onChange={handleInputChange}
                          placeholder="Middle Name"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-base font-medium text-gray-600 mb-1">Occupation</label>
                        <input
                          type="text"
                          name="motherOccupation"
                          value={newStudent.motherOccupation}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-base font-medium text-gray-600 mb-1">Status</label>
                        <select
                          name="motherStatus"
                          value={newStudent.motherStatus}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                          <option value="">Select</option>
                          <option value="Employed">Employed</option>
                          <option value="Unemployed">Unemployed</option>
                          <option value="Deceased">Deceased</option>
                          <option value="Retired">Retired</option>
                          <option value="Disabled">Disabled</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-base font-medium text-gray-600 mb-1">Location</label>
                        <select
                          name="motherLocation"
                          value={newStudent.motherLocation}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                          <option value="">Select</option>
                          <option value="Overseas">Overseas</option>
                          <option value="Local">Local</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-base font-medium text-gray-600 mb-1">Type</label>
                        <select
                          name="motherEmploymentType"
                          value={newStudent.motherEmploymentType}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                          <option value="">Select</option>
                          <option value="Private">Private</option>
                          <option value="Government">Government</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-base font-medium text-gray-600 mb-1">Highest Educational Attainment</label>
                      <select
                        name="motherEducation"
                        value={newStudent.motherEducation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                      >
                        <option value="">Select</option>
                        <option value="Elementary">Elementary</option>
                        <option value="High School">High School</option>
                        <option value="College">College</option>
                        <option value="Post Graduate">Post Graduate</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-base font-medium text-gray-600 mb-1">Specialization</label>
                      <input
                        type="text"
                        name="motherSpecialization"
                        value={newStudent.motherSpecialization}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Parents Marital Status */}
              <div>
                <label className="block text-base font-medium text-gray-600 mb-2">Parents' Marital Status</label>
                <div className="flex flex-wrap gap-4">
                  {MARITAL_STATUSES.map((status) => (
                    <label key={status} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="parentsMaritalStatus"
                        checked={newStudent.parentsMaritalStatus === status}
                        onChange={() => setNewStudent({ ...newStudent, parentsMaritalStatus: status })}
                        className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-200"
                      />
                      <span className="ml-2 text-sm text-gray-600">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Child Residence */}
              <div>
                <label className="block text-base font-medium text-gray-600 mb-2">Child is Residing</label>
                <div className="flex flex-wrap gap-4">
                  {RESIDENCE_OPTIONS.map((option) => (
                    <label key={option} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="childResidence"
                        checked={newStudent.childResidence === option}
                        onChange={() => setNewStudent({ ...newStudent, childResidence: option })}
                        className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-200"
                      />
                      <span className="ml-2 text-sm text-gray-600">{option}</span>
                    </label>
                  ))}
                </div>
                {newStudent.childResidence === 'Others' && (
                  <div className="mt-3">
                    <input
                      type="text"
                      name="childResidenceOther"
                      value={newStudent.childResidenceOther}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Please specify"
                    />
                  </div>
                )}
              </div>
              {/* Birth Order and Siblings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">Birth Order</label>
                  <div className="flex flex-wrap gap-3">
                    {[1, 2, 3, 4, 5, 6, 7].map((order) => (
                      <label key={order} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="birthOrder"
                          checked={newStudent.birthOrder === order}
                          onChange={() => setNewStudent({...newStudent, birthOrder: order})}
                          className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-200"
                        />
                        <span className="ml-1 text-sm text-gray-600">{order} {order === 1 ? 'st' : order === 2 ? 'nd' : order === 3 ? 'rd' : 'th'}</span>
                      </label>
                    ))}
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="birthOrder"
                        checked={newStudent.birthOrder > 7}
                        onChange={() => setNewStudent({...newStudent, birthOrder: 8})}
                        className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-200"
                      />
                      <span className="ml-1 text-sm text-gray-600">Other</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">Number of Siblings</label>
                  <input
                    type="number"
                    name="numberOfSiblings"
                    value={newStudent.numberOfSiblings}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">Other Relatives at Home</label>
                  <input
                    type="text"
                    name="otherRelatives"
                    value={newStudent.otherRelatives}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g., Grandparents, Aunt, etc."
                  />
                </div>
              </div>
              {/* Family Income */}
              <div>
                <label className="block text-base font-medium text-gray-600 mb-2">Family Monthly Income</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {FAMILY_INCOME_RANGES.map((range) => (
                    <label key={range} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="familyIncome"
                        checked={newStudent.familyIncome === range}
                        onChange={() => setNewStudent({ ...newStudent, familyIncome: range })}
                        className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-200"
                      />
                      <span className="ml-2 text-sm text-gray-600">{range}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Siblings Table */}
              <div>
                <label className="block text-base font-medium text-gray-600 mb-2">Siblings (Oldest to Youngest)</label>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 rounded-lg">
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
                              className="w-full px-2 py-1 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={newStudent.siblings[index]?.age || ''}
                              onChange={(e) => handleSiblingChange(index, 'age', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={newStudent.siblings[index]?.school || ''}
                              onChange={(e) => handleSiblingChange(index, 'school', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={newStudent.siblings[index]?.status || ''}
                              onChange={(e) => handleSiblingChange(index, 'status', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={newStudent.siblings[index]?.occupation || ''}
                              onChange={(e) => handleSiblingChange(index, 'occupation', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
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
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">III. Educational Background</h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Level</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">School Attended/Address</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Awards/Honors</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">School Year</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {['Preschool', 'Grade School', 'High School'].map((level) => (
                      <tr key={level} className="hover:bg-gray-50">
                        <td className="px-3 py-2 text-sm font-medium text-gray-600">{level}</td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={newStudent.educationBackground[level.toLowerCase()]?.school || ''}
                            onChange={(e) =>
                              handleEducationChange(level.toLowerCase(), 'school', e.target.value)
                            }
                            className="w-full px-2 py-1 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={newStudent.educationBackground[level.toLowerCase()]?.awards || ''}
                            onChange={(e) =>
                              handleEducationChange(level.toLowerCase(), 'awards', e.target.value)
                            }
                            className="w-full px-2 py-1 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={newStudent.educationBackground[level.toLowerCase()]?.year || ''}
                            onChange={(e) =>
                              handleEducationChange(level.toLowerCase(), 'year', e.target.value)
                            }
                            className="w-full px-2 py-1 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
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
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">IV. Organizational Affiliations</h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
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
                            value={newStudent.organizations[index]?.year || ''}
                            onChange={(e) => handleOrganizationChange(index, 'year', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="e.g., 2023-2024"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={newStudent.organizations[index]?.organization || ''}
                            onChange={(e) =>
                              handleOrganizationChange(index, 'organization', e.target.value)
                            }
                            className="w-full px-2 py-1 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={newStudent.organizations[index]?.designation || ''}
                            onChange={(e) =>
                              handleOrganizationChange(index, 'designation', e.target.value)
                            }
                            className="w-full px-2 py-1 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
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
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">V. Health</h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">Any Physical Handicap or Health Problem</label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="healthProblem"
                        checked={newStudent.healthProblem === 'Yes'}
                        onChange={() => setNewStudent({ ...newStudent, healthProblem: 'Yes' })}
                        className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-200"
                      />
                      <span className="ml-2 text-sm text-gray-600">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="healthProblem"
                        checked={newStudent.healthProblem === 'No'}
                        onChange={() => setNewStudent({ ...newStudent, healthProblem: 'No' })}
                        className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-200"
                      />
                      <span className="ml-2 text-sm text-gray-600">No</span>
                    </label>
                  </div>
                  {newStudent.healthProblem === 'Yes' && (
                    <div className="mt-3">
                      <input
                        type="text"
                        name="healthProblemDetails"
                        value={newStudent.healthProblemDetails}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Specify details"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">General Condition</label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="generalCondition"
                        checked={newStudent.generalCondition === 'Good'}
                        onChange={() => setNewStudent({ ...newStudent, generalCondition: 'Good' })}
                        className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-200"
                      />
                      <span className="ml-2 text-sm text-gray-600">Good</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="generalCondition"
                        checked={newStudent.generalCondition === 'Fair'}
                        onChange={() => setNewStudent({ ...newStudent, generalCondition: 'Fair' })}
                        className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-200"
                      />
                      <span className="ml-2 text-sm text-gray-600">Fair</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="generalCondition"
                        checked={newStudent.generalCondition === 'Poor'}
                        onChange={() => setNewStudent({ ...newStudent, generalCondition: 'Poor' })}
                        className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-200"
                      />
                      <span className="ml-2 text-sm text-gray-600">Poor</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">Under Medication</label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="underMedication"
                        checked={newStudent.underMedication === 'Yes'}
                        onChange={() => setNewStudent({ ...newStudent, underMedication: 'Yes' })}
                        className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-200"
                      />
                      <span className="ml-2 text-sm text-gray-600">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="underMedication"
                        checked={newStudent.underMedication === 'No'}
                        onChange={() => setNewStudent({ ...newStudent, underMedication: 'No' })}
                        className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-200"
                      />
                      <span className="ml-2 text-sm text-gray-600">No</span>
                    </label>
                  </div>
                  {newStudent.underMedication === 'Yes' && (
                    <div className="mt-3">
                      <input
                        type="text"
                        name="medicationDetails"
                        value={newStudent.medicationDetails}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Specify medication"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">Requires Special Care/Attention</label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="specialCare"
                        checked={newStudent.specialCare === 'Yes'}
                        onChange={() => setNewStudent({ ...newStudent, specialCare: 'Yes' })}
                        className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-200"
                      />
                      <span className="ml-2 text-sm text-gray-600">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="specialCare"
                        checked={newStudent.specialCare === 'No'}
                        onChange={() => setNewStudent({ ...newStudent, specialCare: 'No' })}
                        className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-200"
                      />
                      <span className="ml-2 text-sm text-gray-600">No</span>
                    </label>
                  </div>
                  {newStudent.specialCare === 'Yes' && (
                    <div className="mt-3">
                      <input
                        type="text"
                        name="specialCareDetails"
                        value={newStudent.specialCareDetails}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Specify special care needed"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">Last Doctor Visit</label>
                  <input
                    type="date"
                    name="lastDoctorVisit"
                    value={newStudent.lastDoctorVisit}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">Reason for Visit</label>
                  <input
                    type="text"
                    name="doctorVisitReason"
                    value={newStudent.doctorVisitReason}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </section>
          {/* VI. Test Results */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">VI. Test Results</h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border border-gray-200 rounded-lg">
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
                            value={newStudent.testResults[index]?.test || ''}
                            onChange={(e) => handleTestResultChange(index, 'test', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="date"
                            value={newStudent.testResults[index]?.date || ''}
                            onChange={(e) => handleTestResultChange(index, 'date', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={newStudent.testResults[index]?.rating || ''}
                            onChange={(e) => handleTestResultChange(index, 'rating', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <h4 className="text-base font-medium text-gray-900 mb-3">Data Privacy Consent</h4>
                <p className="text-sm text-gray-600 mb-3">
                  St. Rita's College of Balingasag—Guidance Center shall protect the data you provided in compliance with the Data Privacy Act of 2012 and its implementing rules and regulations.
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  By signing this form, you hereby agree and express your voluntary, unequivocal, and informed consent that your personal data provided shall be processed for the purposes of carrying out Guidance Program Services.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base font-medium text-gray-600 mb-2">Signature over Printed Name</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        name="signatureName"
                        value={newStudent.signatureName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Enter name"
                      />
                      <input
                        type="date"
                        name="signatureDate"
                        value={newStudent.signatureDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  </div>
                  {newStudent.age < 18 && (
                    <div>
                      <label className="block text-base font-medium text-gray-600 mb-2">Parent/Guardian Signature</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          name="parentSignatureName"
                          value={newStudent.parentSignatureName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="Enter name"
                        />
                        <input
                          type="date"
                          name="parentSignatureDate"
                          value={newStudent.parentSignatureDate}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
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
        <div className="bg-white px-6 py-4 border-t border-gray-200 flex justify-end rounded-b-lg">
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowModal(false);
                setNewStudent(initialStudentState);
                setErrors({});
              }}
              className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-sm hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddStudent}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
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