import { FiX, FiCalendar, FiClock, FiUser, FiBook, FiInfo, FiCheckCircle, FiXCircle } from 'react-icons/fi';

export default function AppointmentDetailsModal({ appointment, onClose, onStatusUpdate }) {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatConcerns = (concerns) => {
    if (!concerns || concerns.length === 0) return 'None specified';
    return Array.isArray(concerns) ? concerns.join(', ') : concerns;
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-gray-900">Appointment Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
              <FiInfo className="mr-2" />
              Basic Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <FiUser className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Student Name</p>
                  <p className="font-medium">{appointment.name}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <FiBook className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Grade & Section</p>
                  <p className="font-medium">{appointment.grade_section || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <FiCalendar className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{new Date(appointment.date).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <FiClock className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{appointment.time}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Appointment Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Purpose</p>
                <p className="font-medium">{appointment.purpose}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Nature</p>
                <p className="font-medium">{appointment.nature}</p>
              </div>
              
              {appointment.referred_by && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Referred By</p>
                  <p className="font-medium">{appointment.referred_by}</p>
                </div>
              )}
            </div>
          </div>

          {/* Areas of Concern */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Areas of Concern</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Personal/Social Concerns</p>
                <p className="font-medium text-sm">
                  {formatConcerns(appointment.personal_concerns)}
                  {appointment.other_personal_concern && `, ${appointment.other_personal_concern}`}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Education/Career Concerns</p>
                <p className="font-medium text-sm">
                  {formatConcerns(appointment.education_concerns)}
                  {appointment.other_education_concern && `, ${appointment.other_education_concern}`}
                </p>
              </div>
            </div>
          </div>

          {/* Status & Remarks */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Status & Remarks</h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Current Status</p>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadgeClass(appointment.status)}`}>
                  {appointment.status}
                </span>
              </div>
              
              {appointment.remarks && (
                <div>
                  <p className="text-sm text-gray-500">Student Remarks</p>
                  <p className="font-medium text-sm bg-gray-50 p-3 rounded-lg mt-1">
                    {appointment.remarks}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer with Actions */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex flex-wrap gap-3 justify-between items-center">
            <div>
              <span className="text-sm text-gray-500">Appointment ID: {appointment.id}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {appointment.status === 'pending' && (
                <>
                  <button
                    onClick={() => onStatusUpdate(appointment.id, 'confirmed')}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center text-sm"
                  >
                    <FiCheckCircle className="mr-2" />
                    Confirm
                  </button>
                  <button
                    onClick={() => onStatusUpdate(appointment.id, 'cancelled')}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center text-sm"
                  >
                    <FiXCircle className="mr-2" />
                    Cancel
                  </button>
                </>
              )}
              
              {appointment.status === 'confirmed' && (
                <button
                  onClick={() => onStatusUpdate(appointment.id, 'completed')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center text-sm"
                >
                  <FiCheckCircle className="mr-2" />
                  Mark as Completed
                </button>
              )}
              
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}