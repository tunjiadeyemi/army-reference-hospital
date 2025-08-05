import { useState } from 'react';

export default function PartOneOrder() {
  const [formData, setFormData] = useState({
    rank: '',
    serviceNo: '',
    name: '',
    decorations: '',
    appointment: '',
    unit: '',
    issueNo: '',
    date: '',
    dutyDepartment: 'Radiologist on call',
    dutyDate: '',
    dutyRank: '',
    dutyServiceNo: '',
    dutyName: '',
    fireDuration: '',
    fireLocation: '',
    fireServiceNo: '',
    fireName: '',
    subject: '',
    comment: '',
    timeOut: '',
    timeOutName: '',
    timeOutRank: '',
    timeOutAppt: ''
  });

  const departmentOptions = [
    { value: 'Radiologist on call', label: 'Radiologist on call' },
    { value: 'Ortho Surgeon on call', label: 'Ortho Surgeon on call' },
    { value: 'Physiotherapist on call', label: 'Physiotherapist on call' },
    { value: 'Pharmacist on call', label: 'Pharmacist on call' },
    { value: 'Optometrist on call', label: 'Optometrist on call' },
    { value: 'Psychologist on call', label: 'Psychologist on call' },
    { value: 'Gynaecologist on call', label: 'Gynaecologist on call' },
    { value: 'Snr Med Lab Sci', label: 'Snr Med Lab Sci' },
    { value: 'Dental Surgeon on Call', label: 'Dental Surgeon on Call' },
    { value: 'Field Officer for the week', label: 'Field Officer for the week' },
    { value: 'Cantonment Sy Officer', label: 'Cantonment Sy Officer' },
    { value: 'Duty Officers', label: 'Duty Officers' },
    { value: 'Duty SNCOs', label: 'Duty SNCOs' },
    { value: 'Overall Night Duty Nurse', label: 'Overall Night Duty Nurse' },
    { value: 'Duty Clerks', label: 'Duty Clerks' },
    { value: 'Duty Amb Dvr', label: 'Duty Amb Dvr' },
    { value: 'Utility Dvr', label: 'Utility Dvr' },
    { value: 'Duty Armourer', label: 'Duty Armourer' },
    { value: 'Duty Electricians', label: 'Duty Electricians' }
  ];

  // Change routineActivities to state
  const [routineActivities, setRoutineActivities] = useState([
    { time: '0600 HR', activity: 'Reveille', days: 'Daily' },
    { time: '0605 HR', activity: 'Morning PT', days: 'Monday/Wednesday' },
    { time: '0700HR', activity: 'Sick Report Parade', days: 'Daily' },
    { time: '0700HR', activity: 'Muster Parade', days: 'Daily' },
    { time: '0700HR', activity: 'CO Admin Parade', days: 'Wednesday' },
    { time: '0700HR', activity: 'Inspection of Quarter Guard', days: 'Mondays' },
    { time: '0700HR', activity: 'HOD Meetings', days: 'Tuesday' },
    { time: '0700HR', activity: 'CO Morning Orders/Interviews', days: 'Thursdays' },
    { time: '0700HR', activity: 'Tea Break', days: 'Thursdays' },
    { time: '0700HR', activity: 'Padre Hour', days: 'Friday' },
    { time: '0700HR', activity: 'Evening Games', days: 'Tuesdays/Thursday' },
    { time: '00:00 HR', activity: 'Guard Mountings', days: 'Daily', disabled: true }
  ]);

  // Add handler to add a new activity
  const handleAddActivity = () => {
    setRoutineActivities((prev) => [...prev, { time: '', activity: '', days: '' }]);
  };

  // Add handler to remove an activity by index
  const handleRemoveActivity = (index: number) => {
    setRoutineActivities((prev) => prev.filter((_, i) => i !== index));
  };

  // Add handler to update a routine activity field
  const handleActivityChange = (
    index: number,
    field: 'time' | 'activity' | 'days',
    value: string
  ) => {
    setRoutineActivities((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-lg font-medium text-gray-700 mb-4">PART ONE ORDER BY</h1>
        <input
          type="text"
          placeholder="ENTER NAME"
          className="w-full p-3 border border-gray-300 rounded text-gray-500 placeholder-gray-400"
        />
      </div>

      {/* First Row - Personal Details */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">RANK</label>
          <div className="relative">
            <select
              className="w-full p-3 border border-gray-300 rounded appearance-none bg-white text-gray-400"
              value={formData.rank}
              onChange={(e) => handleInputChange('rank', e.target.value)}
            >
              <option value="">Rank</option>
            </select>
            <img
              src="/chevron-down.svg"
              alt="chevron down"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SERVICE NO</label>
          <input
            type="text"
            placeholder="Service No"
            className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
            value={formData.serviceNo}
            onChange={(e) => handleInputChange('serviceNo', e.target.value)}
          />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">NAME</label>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">DECORATIONS</label>
          <input
            type="text"
            placeholder="Decoration"
            className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
            value={formData.decorations}
            onChange={(e) => handleInputChange('decorations', e.target.value)}
          />
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">APPOINTMENT</label>
          <input
            type="text"
            placeholder="Appointment"
            className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
            value={formData.appointment}
            onChange={(e) => handleInputChange('appointment', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">UNIT</label>
          <input
            type="text"
            placeholder="Unit"
            className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
            value={formData.unit}
            onChange={(e) => handleInputChange('unit', e.target.value)}
          />
        </div>
      </div>

      {/* Fourth Row */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ISSUE NO.</label>
          <input
            type="text"
            placeholder="Issue date"
            className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
            value={formData.issueNo}
            onChange={(e) => handleInputChange('issueNo', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">DATE</label>
          <input
            type="text"
            placeholder="Date"
            className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
          />
        </div>
      </div>

      {/* Routine Activities Section */}
      <div className="mb-8">
        <h2 className="text-center text-lg font-medium text-gray-700 mb-6">Routine Activities</h2>

        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-50 grid grid-cols-3 p-3 border-b border-gray-300">
            <div className="font-medium text-gray-700">TIME</div>
            <div className="font-medium text-gray-700">ACTIVITIES</div>
            <div className="font-medium text-gray-700">DAYS</div>
          </div>

          {routineActivities.map((activity, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 p-3 border-b border-gray-200 ${
                activity.disabled ? 'text-gray-400' : 'text-gray-700'
              }`}
            >
              <div className="flex items-center">
                {activity.disabled ? (
                  activity.time
                ) : (
                  <input
                    type="text"
                    className="w-full px-2 py-1  rounded text-sm"
                    placeholder="Time"
                    value={activity.time}
                    onChange={(e) => handleActivityChange(index, 'time', e.target.value)}
                  />
                )}
              </div>
              <div className="flex items-center">
                {activity.disabled ? (
                  activity.activity
                ) : (
                  <input
                    type="text"
                    className="w-full px-2 py-1  rounded text-sm"
                    placeholder="Activity"
                    value={activity.activity}
                    onChange={(e) => handleActivityChange(index, 'activity', e.target.value)}
                  />
                )}
              </div>
              <div className="flex items-center justify-between">
                {activity.disabled ? (
                  activity.days
                ) : (
                  <input
                    type="text"
                    className="w-full px-2 py-1  rounded text-sm"
                    placeholder="Days"
                    value={activity.days}
                    onChange={(e) => handleActivityChange(index, 'days', e.target.value)}
                  />
                )}
                {!activity.disabled && (
                  <button type="button" onClick={() => handleRemoveActivity(index)}>
                    <img src="/cancel-circle.svg" alt="cancel" className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="p-3">
            <button
              type="button"
              className="flex items-center text-gray-500"
              onClick={handleAddActivity}
            >
              <img src="/department/add-black-icon.svg" alt="add" className="w-5 h-5 mr-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Duty/Department Section */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">DUTY/DEPARTMENT</label>
          <div className="relative">
            <select
              className="w-full p-3 border border-gray-300 rounded appearance-none bg-white text-gray-700"
              value={formData.dutyDepartment}
              onChange={(e) => handleInputChange('dutyDepartment', e.target.value)}
            >
              {departmentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <img
              src="/chevron-down.svg"
              alt="chevron down"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">DATE(DAY:DD/MM/YR)</label>
          <input
            type="text"
            placeholder="dd/mm/yy"
            className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
            value={formData.dutyDate}
            onChange={(e) => handleInputChange('dutyDate', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">RANK</label>
          <div className="relative">
            <select
              className="w-full p-3 border border-gray-300 rounded appearance-none bg-white text-gray-400"
              value={formData.dutyRank}
              onChange={(e) => handleInputChange('dutyRank', e.target.value)}
            >
              <option value="">Rank</option>
            </select>
            <img
              src="/chevron-down.svg"
              alt="chevron down"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SERVICE NO</label>
          <input
            type="text"
            placeholder="Service No."
            className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
            value={formData.dutyServiceNo}
            onChange={(e) => handleInputChange('dutyServiceNo', e.target.value)}
          />
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">NAME</label>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
          value={formData.dutyName}
          onChange={(e) => handleInputChange('dutyName', e.target.value)}
        />
      </div>

      {/* Fire Piquet and Guard Duty Section */}
      <div className="mb-8">
        <h2 className="text-center text-lg font-medium text-gray-700 mb-6">
          FIRE PIQUET AND GUARD DUTY
        </h2>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              DUTY DURATION (HR)
            </label>
            <input
              type="text"
              placeholder="Duty Duration"
              className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
              value={formData.fireDuration}
              onChange={(e) => handleInputChange('fireDuration', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">LOCATION</label>
            <div className="relative">
              <select
                className="w-full p-3 border border-gray-300 rounded appearance-none bg-white text-gray-400"
                value={formData.fireLocation}
                onChange={(e) => handleInputChange('fireLocation', e.target.value)}
              >
                <option value="">Location</option>
              </select>
              <img
                src="/chevron-down.svg"
                alt="chevron down"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SERVICE NO</label>
            <input
              type="text"
              placeholder="Service No"
              className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
              value={formData.fireServiceNo}
              onChange={(e) => handleInputChange('fireServiceNo', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">NAME</label>
            <input
              type="text"
              placeholder="full Name"
              className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
              value={formData.fireName}
              onChange={(e) => handleInputChange('fireName', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Notice Board and Information Section */}
      <div className="mb-8">
        <h2 className="text-center text-lg font-medium text-gray-700 mb-6">
          NOTICE BOARD AND INFORMATION
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">SUBJECT</label>
          <input
            type="text"
            placeholder="Subject"
            className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">COMMENT</label>
          <textarea
            placeholder="Comment"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400 resize-none"
            value={formData.comment}
            onChange={(e) => handleInputChange('comment', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">TIME OUT</label>
            <input
              type="text"
              placeholder="Time out"
              className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
              value={formData.timeOut}
              onChange={(e) => handleInputChange('timeOut', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">NAME</label>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
              value={formData.timeOutName}
              onChange={(e) => handleInputChange('timeOutName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">RANK</label>
            <input
              type="text"
              placeholder="Rank"
              className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
              value={formData.timeOutRank}
              onChange={(e) => handleInputChange('timeOutRank', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">APPT</label>
            <input
              type="text"
              placeholder="Appt"
              className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
              value={formData.timeOutAppt}
              onChange={(e) => handleInputChange('timeOutAppt', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded font-medium">
          Save
        </button>
      </div>
    </div>
  );
}
