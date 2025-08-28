// components/StudentPDSUpdateModal.js
import { useState, useEffect } from 'react';
import StudentPDSModal from './StudentPDSModal';

const StudentPDSUpdateModal = ({ showModal, setShowModal, studentData, onUpdateStudent }) => {
  const [initialData, setInitialData] = useState(null);
  const [educationLevel, setEducationLevel] = useState('');
  const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  const fetchLatestData = async () => {
    if (showModal) {
      setIsLoading(true);
      try {
        const userId = localStorage.getItem('userId');
        // Use the correct endpoint with query parameter
        const response = await fetch(`/api/students?userId=${userId}`);
        
        if (response.ok) {
          const latestData = await response.json();
          transformData(latestData);
        } else {
          // If fetching latest data fails, use the existing studentData
          if (studentData) {
            transformData(studentData);
          }
        }
      } catch (error) {
        console.error('Error fetching latest student data:', error);
        // If there's an error, use the existing studentData
        if (studentData) {
          transformData(studentData);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (showModal) {
    fetchLatestData();
  }
}, [showModal, studentData]);

const transformData = (data) => {
  // Helper function to format date for input[type="date"]
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0]; // Get only yyyy-MM-dd part
  };

  console.log('=== RAW DATA FROM API ===');
  console.log('Full data object:', data);
  console.log('Data ID:', data.id);
  console.log('Data structure keys:', Object.keys(data));
  console.log('Family info:', data.family_info);
  console.log('Parents:', data.parents);
  console.log('Sacraments:', data.sacraments);
  console.log('Leisure activities:', data.leisure_activities);

  // First, create the base transformed data
  const transformedData = {
    ...data,
    id: data.id,
    educationLevel: data.education_level || '',
    schoolYear: data.school_year || '',
    semester: data.semester || '',
    gradeLevel: data.grade_level || '',
    strand: data.strand || '',
    course: data.course || '',
    yearLevel: data.year_level || '',
    studentType: data.student_type || '',
    firstName: data.first_name || '',
    lastName: data.last_name || '',
    middleName: data.middle_name || '',
    nickname: data.nickname || '',
    sex: data.sex || '',
    civil_status: data.civil_status || '',
    nationality: data.nationality || '',
    contact_number: data.contact_number || '',
    email: data.email || '',
    address: data.address || '',
    city_address: data.city_address || '',
    birth_date: formatDateForInput(data.birth_date),
    birth_place: data.birth_place || '',
    age: data.age || '',
    religion: data.religion || '',
    emergency_contact: data.emergency_contact || '',
    emergency_relation: data.emergency_relation || '',
    emergency_number: data.emergency_number || '',
    signature_name: data.signature_name || '',
    signature_date: formatDateForInput(data.signature_date),
    parent_signature_name: data.parent_signature_name || '',
    parent_signature_date: formatDateForInput(data.parent_signature_date),
    student_photo_url: data.student_photo_url || '',
    residence_type: data.residence_type || '',
    residence_owner: data.residence_owner || '',
    languages_spoken_at_home: data.languages_spoken_at_home || '',
    special_talents: data.special_talents || '',
    living_with_parents: data.living_with_parents !== undefined ? data.living_with_parents : true,
  };

  // Add family info if available
  if (data.family_info && data.family_info.length > 0) {
    transformedData.parentsMaritalStatus = data.family_info[0].parents_marital_status || '';
    transformedData.child_residing_with = data.family_info[0].child_residing_with || '';
    transformedData.child_residence_other = data.family_info[0].child_residence_other || '';
    transformedData.birth_order = data.family_info[0].birth_order || '';
    transformedData.siblings_count = data.family_info[0].siblings_count || 0;
    transformedData.brothers_count = data.family_info[0].brothers_count || 0;
    transformedData.sisters_count = data.family_info[0].sisters_count || 0;
    transformedData.step_brothers_count = data.family_info[0].step_brothers_count || 0;
    transformedData.step_sisters_count = data.family_info[0].step_sisters_count || 0;
    transformedData.adopted_count = data.family_info[0].adopted_count || 0;
    transformedData.family_monthly_income = data.family_info[0].family_monthly_income || '';
    transformedData.relatives_at_home = data.family_info[0].relatives_at_home ? 
      (typeof data.family_info[0].relatives_at_home === 'string' ? 
        data.family_info[0].relatives_at_home.split(',') : 
        data.family_info[0].relatives_at_home) : [];
    transformedData.other_relatives = data.family_info[0].other_relatives || '';
    transformedData.total_relatives = data.family_info[0].total_relatives || 0;
    transformedData.financial_support = data.family_info[0].financial_support || '';
  }

  // Add parents
  transformedData.father = (data.father && data.father.length > 0) ? data.father[0] : {};
  transformedData.mother = (data.mother && data.mother.length > 0) ? data.mother[0] : {};

  // Add sacraments with formatted dates
  const baptismSacrament = data.sacraments && data.sacraments.find(s => s.sacrament_type === 'baptism');
  const firstCommunionSacrament = data.sacraments && data.sacraments.find(s => s.sacrament_type === 'first communion');
  const confirmationSacrament = data.sacraments && data.sacraments.find(s => s.sacrament_type === 'confirmation');

  transformedData.baptism = baptismSacrament ? {
    ...baptismSacrament,
    date: formatDateForInput(baptismSacrament.date)
  } : {sacrament_type: 'baptism', received: false, date: '', church: ''};

  transformedData.firstCommunion = firstCommunionSacrament ? {
    ...firstCommunionSacrament,
    date: formatDateForInput(firstCommunionSacrament.date)
  } : {sacrament_type: 'first communion', received: false, date: '', church: ''};

  transformedData.confirmation = confirmationSacrament ? {
    ...confirmationSacrament,
    date: formatDateForInput(confirmationSacrament.date)
  } : {sacrament_type: 'confirmation', received: false, date: '', church: ''};

  // Add leisure activities
  if (data.leisure_activities && data.leisure_activities.length > 0) {
    transformedData.leisureActivities = data.leisure_activities[0].activities ? 
      (typeof data.leisure_activities[0].activities === 'string' ? 
        data.leisure_activities[0].activities.split(',') : 
        data.leisure_activities[0].activities) : [];
    transformedData.otherLeisureActivity = data.leisure_activities[0].other_activity || '';
  }

  // Add guardian
  if (data.guardian && data.guardian.length > 0) {
    transformedData.guardianName = data.guardian[0].guardian_name || '';
    transformedData.guardianRelationship = data.guardian[0].relationship || '';
    transformedData.guardianAddress = data.guardian[0].address || '';
  }

  // Add other data
  transformedData.siblings = data.siblings || [];
  transformedData.organizations = data.organizations || [];

  // Add educational background
  transformedData.preschool = (data.educational_background && data.educational_background.find(e => e.level === 'Preschool')) || {level: 'Preschool', school_attended_or_address: '', awards_or_honors_received: '', school_year_attended: ''};
  transformedData.elementary = (data.educational_background && data.educational_background.find(e => e.level === 'Grade School')) || {level: 'Grade School', school_attended_or_address: '', awards_or_honors_received: '', school_year_attended: ''};
  transformedData.highSchool = (data.educational_background && data.educational_background.find(e => e.level === 'High School')) || {level: 'High School', school_attended_or_address: '', awards_or_honors_received: '', school_year_attended: ''};
  transformedData.seniorHigh = (data.educational_background && data.educational_background.find(e => e.level === 'Senior High School')) || {level: 'Senior High School', school_attended_or_address: '', awards_or_honors_received: '', school_year_attended: ''};

  // Add health info with formatted date
  if (data.health_info && data.health_info.length > 0) {
    transformedData.height = data.health_info[0].height || '';
    transformedData.weight = data.health_info[0].weight || '';
    transformedData.physicalCondition = data.health_info[0].physical_condition || '';
    transformedData.health_problem = data.health_info[0].health_problem || '';
    transformedData.health_problem_details = data.health_info[0].health_problem_details || '';
    transformedData.last_doctor_visit = formatDateForInput(data.health_info[0].last_doctor_visit);
    transformedData.last_doctor_visit_reason = data.health_info[0].last_doctor_visit_reason || '';
    transformedData.general_condition = data.health_info[0].general_condition || '';
  }

  // Add test results with formatted dates
  transformedData.testResults = data.test_results ? data.test_results.map(test => ({
    ...test,
    date_taken: formatDateForInput(test.date_taken)
  })) : [];

  console.log('=== TRANSFORMED DATA ===');
  console.log('Transformed data:', transformedData);
  console.log('Father data:', transformedData.father);
  console.log('Mother data:', transformedData.mother);
  console.log('Sacraments:', {
    baptism: transformedData.baptism,
    firstCommunion: transformedData.firstCommunion,
    confirmation: transformedData.confirmation
  });

  setInitialData(transformedData);
  setEducationLevel(data.education_level || '');
};

  if (!showModal) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 flex items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
          <span>Loading your data...</span>
        </div>
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 text-center">
          <p className="text-red-600 mb-4">Error loading student data</p>
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

return (
  <StudentPDSModal 
    showModal={showModal}
    setShowModal={setShowModal}
    onAddStudent={onUpdateStudent}
    initialData={initialData}
    educationLevel={educationLevel}
    isUpdate={true} // This is important!
  />
);
};

export default StudentPDSUpdateModal;