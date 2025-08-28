// components/AppointmentModal.js
import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function AppointmentModal({
  isOpen,
  onClose,
  onSubmit,
  selectedDate,
  firstName,
  lastName,
  error
}) {
  const [counselingForm, setCounselingForm] = useState({
    name: '',
    gradeSection: '',
    date: '',
    purpose: '',
    nature: '',
    referredBy: '',
    personalConcerns: [],
    educationConcerns: [],
    otherPersonalConcern: '',
    otherEducationConcern: '',
    remarks: ''
  });

  useEffect(() => {
    if (isOpen) {
      // Format the date for the input field (YYYY-MM-DD) using Philippine time
      const phDate = new Date(selectedDate.getTime() + (8 * 60 * 60 * 1000));
      const formattedDate = phDate.toISOString().split('T')[0];
      
      setCounselingForm(prev => ({
        ...prev,
        name: `${firstName} ${lastName}`,
        date: formattedDate
      }));
    }
  }, [isOpen, firstName, lastName, selectedDate]);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (checked) {
        setCounselingForm(prev => ({
          ...prev,
          [name]: [...prev[name], value]
        }));
      } else {
        setCounselingForm(prev => ({
          ...prev,
          [name]: prev[name].filter(item => item !== value)
        }));
      }
    } else {
      setCounselingForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = () => {
    onSubmit(counselingForm);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-gray-900">Counseling Appointment Form</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        {/* Scrollable Form Content */}
        <div className="p-6 overflow-y-auto flex-1 text-gray-800">
          {/* === I. PERSONAL INFORMATION === */}
          <h3 className="font-bold text-lg mb-2">I. PERSONAL INFORMATION</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={counselingForm.name}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {/* Grade & Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade & Section</label>
              <input
                type="text"
                name="gradeSection"
                value={counselingForm.gradeSection}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={counselingForm.date}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          {/* Purpose of Contact */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Purpose of Contact</label>
            <div className="space-y-2">
              {['Intake Interview', 'Consultation', 'Follow-up'].map((purpose) => (
                <label key={purpose} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="purpose"
                    value={purpose}
                    checked={counselingForm.purpose === purpose}
                    onChange={handleFormChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    required
                  />
                  <span>{purpose}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Nature of Contact */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Nature of Contact</label>
            <div className="space-y-2">
              {['Walk-in / Voluntary', 'Referral', 'Guidance Personnel Initiated'].map((nature) => (
                <label key={nature} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="nature"
                    value={nature}
                    checked={counselingForm.nature === nature}
                    onChange={handleFormChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    required
                  />
                  <span>{nature}</span>
                </label>
              ))}
            </div>
            {counselingForm.nature === 'Referral' && (
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Referred by</label>
                <input
                  type="text"
                  name="referredBy"
                  value={counselingForm.referredBy}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required={counselingForm.nature === 'Referral'}
                />
              </div>
            )}
          </div>

          {/* II. AREAS OF CONCERN */}
          <h3 className="font-bold text-lg mb-2">II. AREAS OF CONCERN</h3>
          {/* Personal / Social */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2">A. Personal / Social</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                'Adjustment to school', 'Financial Problems', 'Health',
                'Self-confidence / Self-esteem', 'Family Relationship',
                'Friends', 'Romantic Relationship', 'Self-Identity Crisis',
                'Depression / Anxiety', 'Suicidal Ideation/Tendencies',
                'Addiction (drugs/alcohol)'
              ].map((concern) => (
                <label key={concern} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="personalConcerns"
                    value={concern}
                    checked={counselingForm.personalConcerns.includes(concern)}
                    onChange={handleFormChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm">{concern}</span>
                </label>
              ))}
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Other Concerns</label>
              <input
                type="text"
                name="otherPersonalConcern"
                value={counselingForm.otherPersonalConcern}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Specify other personal concerns"
              />
            </div>
          </div>

          {/* Education / Career */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2">B. Education / Career</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                'Academic Deficiency', 'Attendance', 'School Choice',
                'Failure', 'Study Habits'
              ].map((concern) => (
                <label key={concern} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="educationConcerns"
                    value={concern}
                    checked={counselingForm.educationConcerns.includes(concern)}
                    onChange={handleFormChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm">{concern}</span>
                </label>
              ))}
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Other Concerns</label>
              <input
                type="text"
                name="otherEducationConcern"
                value={counselingForm.otherEducationConcern}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Specify other education concerns"
              />
            </div>
          </div>

          {/* Remarks */}
          <h3 className="font-bold text-lg mb-2">III. REMARKS</h3>
          <textarea
            name="remarks"
            value={counselingForm.remarks}
            onChange={handleFormChange}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Appointment
          </button>
        </div>
      </div>
    </div>
  );
}