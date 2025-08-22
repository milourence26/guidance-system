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
    // Transform the API response data to match the form structure
    const transformedData = {
      ...data,
      schoolYear: data.school_year,
      gradeLevel: data.grade_level,
      yearLevel: data.year_level,
      studentType: data.student_type,
      firstName: data.first_name,
      lastName: data.last_name,
      middleName: data.middle_name,
      civil_status: data.civil_status,
      contact_number: data.contact_number,
      emergency_contact: data.emergency_contact,
      emergency_relation: data.emergency_relation,
      emergency_number: data.emergency_number,
      signature_name: data.signature_name,
      signature_date: data.signature_date,
      parent_signature_name: data.parent_signature_name,
      parent_signature_date: data.parent_signature_date,
      student_photo_url: data.student_photo_url,
      residence_type: data.residence_type,
      residence_owner: data.residence_owner,
      languages_spoken_at_home: data.languages_spoken_at_home,
      special_talents: data.special_talents,
      living_with_parents: data.living_with_parents,
      // Map family info
      ...(data.family_info && data.family_info.length > 0 && {
        parentsMaritalStatus: data.family_info[0].parents_marital_status,
        child_residing_with: data.family_info[0].child_residing_with,
        child_residence_other: data.family_info[0].child_residence_other,
        birth_order: data.family_info[0].birth_order,
        siblings_count: data.family_info[0].siblings_count,
        brothers_count: data.family_info[0].brothers_count,
        sisters_count: data.family_info[0].sisters_count,
        step_brothers_count: data.family_info[0].step_brothers_count,
        step_sisters_count: data.family_info[0].step_sisters_count,
        adopted_count: data.family_info[0].adopted_count,
        family_monthly_income: data.family_info[0].family_monthly_income,
        relatives_at_home: data.family_info[0].relatives_at_home ? 
          (typeof data.family_info[0].relatives_at_home === 'string' ? 
            data.family_info[0].relatives_at_home.split(',') : 
            data.family_info[0].relatives_at_home) : [],
        other_relatives: data.family_info[0].other_relatives,
        total_relatives: data.family_info[0].total_relatives,
        financial_support: data.family_info[0].financial_support
      }),
      // Map parents
      father: data.father && data.father.length > 0 ? data.father[0] : {},
      mother: data.mother && data.mother.length > 0 ? data.mother[0] : {},
      // Map sacraments
      baptism: data.sacraments && data.sacraments.find(s => s.sacrament_type === 'baptism') || {},
      firstCommunion: data.sacraments && data.sacraments.find(s => s.sacrament_type === 'first communion') || {},
      confirmation: data.sacraments && data.sacraments.find(s => s.sacrament_type === 'confirmation') || {},
      // Map leisure activities
      ...(data.leisure_activities && data.leisure_activities.length > 0 && {
        leisureActivities: data.leisure_activities[0].activities ? 
          (typeof data.leisure_activities[0].activities === 'string' ? 
            data.leisure_activities[0].activities.split(',') : 
            data.leisure_activities[0].activities) : [],
        otherLeisureActivity: data.leisure_activities[0].other_activity
      }),
      // Map guardian
      ...(data.guardian && data.guardian.length > 0 && {
        guardianName: data.guardian[0].guardian_name,
        guardianRelationship: data.guardian[0].relationship,
        guardianAddress: data.guardian[0].address
      }),
      // Map siblings
      siblings: data.siblings || [],
      // Map educational background
      preschool: data.educational_background && data.educational_background.find(e => e.level === 'Preschool') || {},
      elementary: data.educational_background && data.educational_background.find(e => e.level === 'Grade School') || {},
      highSchool: data.educational_background && data.educational_background.find(e => e.level === 'High School') || {},
      seniorHigh: data.educational_background && data.educational_background.find(e => e.level === 'Senior High School') || {},
      // Map organizations
      organizations: data.organizations || [],
      // Map health info
      ...(data.health_info && data.health_info.length > 0 && {
        height: data.health_info[0].height,
        weight: data.health_info[0].weight,
        physicalCondition: data.health_info[0].physical_condition,
        health_problem: data.health_info[0].health_problem,
        health_problem_details: data.health_info[0].health_problem_details,
        last_doctor_visit: data.health_info[0].last_doctor_visit,
        last_doctor_visit_reason: data.health_info[0].last_doctor_visit_reason,
        general_condition: data.health_info[0].general_condition
      }),
      // Map test results
      testResults: data.test_results || []
    };

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
      isUpdate={true}
    />
  );
};

export default StudentPDSUpdateModal;