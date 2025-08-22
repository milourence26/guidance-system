// components/StudentPDSViewModal.js
import { FiX } from 'react-icons/fi';

const StudentPDSViewModal = ({ showModal, setShowModal, studentData, educationLevel }) => {
  if (!showModal || !studentData) return null;

  // Helper function to display array values
  const displayArray = (arr) => {
    if (!arr || arr.length === 0) return 'N/A';
    return Array.isArray(arr) ? arr.join(', ') : arr;
  };

  // Helper function to display date
  const displayDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  // Helper function to display parent information
  const displayParent = (parent) => {
    if (!parent || (!parent.first_name && !parent.last_name)) return 'N/A';
    return `${parent.first_name || ''} ${parent.last_name || ''}`.trim();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[95vh] overflow-hidden border border-gray-200">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-6 rounded-t-xl relative">
          <button
            onClick={() => setShowModal(false)}
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
          <h1 className="text-2xl font-bold uppercase tracking-tight text-gray-800 text-center mb-6">
            STUDENT PERSONAL DATA SHEET
          </h1>

          {/* Education Level */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
              Education Level
            </h2>
            <p className="text-gray-700">{educationLevel || 'N/A'}</p>
          </div>

          {/* Personal Information */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">School Year</label>
                <p className="text-gray-700">{studentData.school_year || 'N/A'}</p>
              </div>
              
              {educationLevel === 'Higher Education' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                  <p className="text-gray-700">{studentData.semester || 'N/A'}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {educationLevel === 'Higher Education' ? 'Course & Year Level' : 'Grade Level & Strand'}
                </label>
                <p className="text-gray-700">
                  {educationLevel === 'Higher Education' 
                    ? `${studentData.course || 'N/A'} - ${studentData.year_level || 'N/A'}`
                    : `${studentData.grade_level || 'N/A'} ${studentData.strand ? `- ${studentData.strand}` : ''}`
                  }
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student Type</label>
                <p className="text-gray-700">{studentData.student_type || 'N/A'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <p className="text-gray-700">{studentData.last_name || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <p className="text-gray-700">{studentData.first_name || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                <p className="text-gray-700">{studentData.middle_name || 'N/A'}</p>
              </div>
            </div>

            {educationLevel === 'Higher Education' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nickname</label>
                    <p className="text-gray-700">{studentData.nickname || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Civil Status</label>
                    <p className="text-gray-700">{studentData.civil_status || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-700">{studentData.email || 'N/A'}</p>
                </div>
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                <p className="text-gray-700">{studentData.sex || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                <p className="text-gray-700">{studentData.nationality || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tel./Mobile #</label>
                <p className="text-gray-700">{studentData.contact_number || 'N/A'}</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <p className="text-gray-700">{studentData.address || 'N/A'}</p>
            </div>

            {educationLevel === 'Higher Education' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">City Address (if boarding)</label>
                <p className="text-gray-700">{studentData.city_address || 'N/A'}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <p className="text-gray-700">{displayDate(studentData.birth_date)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Place of Birth</label>
                <p className="text-gray-700">{studentData.birth_place || 'N/A'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <p className="text-gray-700">{studentData.age || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
                <p className="text-gray-700">{studentData.religion || 'N/A'}</p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Person</label>
                <p className="text-gray-700">{studentData.emergency_contact || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                <p className="text-gray-700">{studentData.emergency_relation || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <p className="text-gray-700">{studentData.emergency_number || 'N/A'}</p>
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
                {studentData.father && studentData.father.length > 0 ? (
                  studentData.father.map((father, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Full Name</label>
                        <p className="text-gray-700">{displayParent(father)}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Occupation</label>
                        <p className="text-gray-700">{father.occupation || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Location</label>
                        <p className="text-gray-700">{father.location || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Employment Type</label>
                        <p className="text-gray-700">{father.employment_type || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Status</label>
                        <p className="text-gray-700">{father.status || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Highest Educational Attainment</label>
                        <p className="text-gray-700">{father.highest_educational_attainment || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Specialization</label>
                        <p className="text-gray-700">{father.specialization || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Post Graduate Studies</label>
                        <p className="text-gray-700">{father.post_graduate_studies || 'N/A'}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-700">No father information available</p>
                )}
              </div>

              {/* Mother's Information */}
              <div className="bg-pink-50 p-5 rounded-xl border border-pink-100 shadow-sm">
                <h4 className="font-medium text-pink-800 mb-4 text-lg">Mother's Information</h4>
                {studentData.mother && studentData.mother.length > 0 ? (
                  studentData.mother.map((mother, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Full Name</label>
                        <p className="text-gray-700">{displayParent(mother)}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Occupation</label>
                        <p className="text-gray-700">{mother.occupation || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Location</label>
                        <p className="text-gray-700">{mother.location || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Employment Type</label>
                        <p className="text-gray-700">{mother.employment_type || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Status</label>
                        <p className="text-gray-700">{mother.status || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Highest Educational Attainment</label>
                        <p className="text-gray-700">{mother.highest_educational_attainment || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Specialization</label>
                        <p className="text-gray-700">{mother.specialization || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Post Graduate Studies</label>
                        <p className="text-gray-700">{mother.post_graduate_studies || 'N/A'}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-700">No mother information available</p>
                )}
              </div>
            </div>

            {studentData.family_info && studentData.family_info.length > 0 && (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parents' Marital Status</label>
                  <p className="text-gray-700">{studentData.family_info[0].parents_marital_status || 'N/A'}</p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Birth Order</label>
                  <p className="text-gray-700">{studentData.family_info[0].birth_order || 'N/A'}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Siblings</label>
                    <p className="text-gray-700">{studentData.family_info[0].siblings_count || 'N/A'}</p>
                  </div>

                  {studentData.family_info[0].siblings_count > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sibling Breakdown</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Brothers</label>
                          <p className="text-gray-700">{studentData.family_info[0].brothers_count || '0'}</p>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Sisters</label>
                          <p className="text-gray-700">{studentData.family_info[0].sisters_count || '0'}</p>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Step Brothers</label>
                          <p className="text-gray-700">{studentData.family_info[0].step_brothers_count || '0'}</p>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Step Sisters</label>
                          <p className="text-gray-700">{studentData.family_info[0].step_sisters_count || '0'}</p>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Adopted</label>
                          <p className="text-gray-700">{studentData.family_info[0].adopted_count || '0'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Other Relatives at Home</label>
                  <p className="text-gray-700">{displayArray(studentData.family_info[0].relatives_at_home)}</p>
                  {studentData.family_info[0].other_relatives && (
                    <p className="text-gray-700 mt-1">Other: {studentData.family_info[0].other_relatives}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Relatives</label>
                  <p className="text-gray-700">{studentData.family_info[0].total_relatives || 'N/A'}</p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Family Monthly Income</label>
                  <p className="text-gray-700">{studentData.family_info[0].family_monthly_income || 'N/A'}</p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Source of financial support</label>
                  <p className="text-gray-700">{studentData.family_info[0].financial_support || 'N/A'}</p>
                </div>
              </>
            )}

            {/* Siblings */}
            {studentData.siblings && studentData.siblings.length > 0 && (
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
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {studentData.siblings.map((sibling, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 text-sm text-gray-700">{sibling.name || 'N/A'}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{sibling.age || 'N/A'}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{sibling.school || 'N/A'}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{sibling.status || 'N/A'}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{sibling.occupation || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Residence Information */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Residence Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Is your residence:</label>
                  <p className="text-gray-700">{studentData.residence_type || 'N/A'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Languages spoken at home:</label>
                  <p className="text-gray-700">{studentData.languages_spoken_at_home || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Leisure Activities */}
            {studentData.leisure_activities && studentData.leisure_activities.length > 0 && (
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Leisure Activities</h3>
                <p className="text-gray-700">{displayArray(studentData.leisure_activities[0].activities)}</p>
                {studentData.leisure_activities[0].other_activity && (
                  <p className="text-gray-700 mt-2">Other: {studentData.leisure_activities[0].other_activity}</p>
                )}
              </div>
            )}

            {/* Special Talents */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Special Talents</h3>
              <p className="text-gray-700">{studentData.special_talents || 'N/A'}</p>
            </div>

            {/* Guardian Information */}
            {studentData.guardian && studentData.guardian.length > 0 && (
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Guardian Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Guardian's Name</label>
                    <p className="text-gray-700">{studentData.guardian[0].guardian_name || 'N/A'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                    <p className="text-gray-700">{studentData.guardian[0].relationship || 'N/A'}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guardian's Address</label>
                  <p className="text-gray-700">{studentData.guardian[0].address || 'N/A'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Educational Background */}
          {studentData.educational_background && studentData.educational_background.length > 0 && (
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
                    {studentData.educational_background.map((edu, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm font-medium text-gray-700">{edu.level || 'N/A'}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{edu.school_attended_or_address || 'N/A'}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{edu.awards_or_honors_received || 'N/A'}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{edu.school_year_attended || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Organizational Affiliations */}
          {studentData.organizations && studentData.organizations.length > 0 && (
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
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {studentData.organizations.map((org, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-700">{org.school_year || 'N/A'}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{org.organization_club || 'N/A'}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{org.designation || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Health Information */}
          {studentData.health_info && studentData.health_info.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">6</span>
                Health Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                  <p className="text-gray-700">{studentData.health_info[0].weight || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Physical Condition</label>
                  <p className="text-gray-700">{studentData.health_info[0].physical_condition || 'N/A'}</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Any physical handicap or health problem</label>
                <p className="text-gray-700">{studentData.health_info[0].health_problem || 'N/A'}</p>
                {studentData.health_info[0].health_problem_details && (
                  <p className="text-gray-700 mt-2">Details: {studentData.health_info[0].health_problem_details}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">When was your last visit to the doctor?</label>
                  <p className="text-gray-700">{displayDate(studentData.health_info[0].last_doctor_visit)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                  <p className="text-gray-700">{studentData.health_info[0].last_doctor_visit_reason || 'N/A'}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">General Condition</label>
                <p className="text-gray-700">{studentData.health_info[0].general_condition || 'N/A'}</p>
              </div>
            </div>
          )}

          {/* Test Results */}
          {studentData.test_results && studentData.test_results.length > 0 && (
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
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {studentData.test_results.map((test, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-700">{test.test_name || 'N/A'}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{displayDate(test.date_taken)}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{test.rating || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

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
                <label className="block text-sm font-medium text-gray-700 mb-1">Signature over printed name</label>
                <p className="text-gray-700">{studentData.signature_name || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Signed</label>
                <p className="text-gray-700">{displayDate(studentData.signature_date)}</p>
              </div>
            </div>
            {studentData.parent_signature_name && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Signature of Parent/Guardian over printed name</label>
                  <p className="text-gray-700">{studentData.parent_signature_name || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Signed</label>
                  <p className="text-gray-700">{displayDate(studentData.parent_signature_date)}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl border-t border-gray-200 flex justify-end">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-blue-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentPDSViewModal;