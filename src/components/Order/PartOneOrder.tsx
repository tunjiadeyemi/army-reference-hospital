import { useState, useRef, useEffect } from 'react';
import { useGetOfficers } from '../UnitBible/hooks/useUnitBible';
import { useCreatePartOneOrder } from '../../hooks/dashboardhooks/useCreatePartOneOrder';
import type { CreatePartOneOrderPayload } from '../../services/dashboardApi/partOneOrderService';
import toast from 'react-hot-toast';

// Helper type for officer (should match your officer API shape)
type Officer = {
  id: number | string;
  name: string;
  serviceNumber: string;
  rank: string;
  // ...add other fields if needed
};

export default function PartOneOrder() {
  const { data: officers = [] } = useGetOfficers();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // State for officer auto-complete
  const [openOfficerDropdown, setOpenOfficerDropdown] = useState(false);
  const [filteredOfficers, setFilteredOfficers] = useState<Officer[]>([]);
  const [isOfficerConfirmed, setIsOfficerConfirmed] = useState(false);
  const [officerInputField, setOfficerInputField] = useState<'serviceNumber' | 'name' | null>(null);

  // State for duty officer auto-complete
  const [openDutyOfficerDropdown, setOpenDutyOfficerDropdown] = useState(false);
  const [filteredDutyOfficers, setFilteredDutyOfficers] = useState<Officer[]>([]);
  const [isDutyOfficerConfirmed, setIsDutyOfficerConfirmed] = useState(false);
  const [dutyOfficerInputField, setDutyOfficerInputField] = useState<
    'dutyServiceNo' | 'dutyName' | null
  >(null);

  // State for guard officer auto-complete
  const [openGuardOfficerDropdown, setOpenGuardOfficerDropdown] = useState(false);
  const [filteredGuardOfficers, setFilteredGuardOfficers] = useState<Officer[]>([]);
  const [isGuardOfficerConfirmed, setIsGuardOfficerConfirmed] = useState(false);
  const [guardOfficerInputField, setGuardOfficerInputField] = useState<
    'fireServiceNo' | 'fireName' | null
  >(null);

  // Form state
  const [formData, setFormData] = useState<
    Omit<CreatePartOneOrderPayload, 'routineActivities'> & {
      rank: string;
      serviceNumber: string;
      name: string;
      dutyRank: string;
      dutyServiceNo: string;
      dutyName: string;
      fireDuration: string;
      fireLocation: string;
      fireServiceNo: string;
      fireName: string;
      timeOut: string;
      timeOutName: string;
      timeOutRank: string;
      timeOutAppt: string;
      decorations: string;
      appointment: string;
      unit: string;
      issueNo: string;
      date: string;
      subject: string;
      comment: string;
      dutyDepartment: string;
      dutyDate: string;
      officer_id: number | string;
      duty_officer_id: number | string;
      guard_officer_id: number | string;
    }
  >({
    officer_id: '',
    rank: '',
    serviceNumber: '',
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
    timeOutAppt: '',
    duty_officer_id: '',
    guard_officer_id: ''
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

  // --- Generic Input Handler ---
  const handleFieldChange = <K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // --- Generic Officer Auto-complete Handler ---
  type OfficerContext = {
    officerKeys: {
      id: keyof typeof formData;
      name: keyof typeof formData;
      serviceNumber: keyof typeof formData;
      rank: keyof typeof formData;
    };
    dropdown: {
      open: boolean;
      setOpen: React.Dispatch<React.SetStateAction<boolean>>;
      filtered: Officer[];
      setFiltered: React.Dispatch<React.SetStateAction<Officer[]>>;
      confirmed: boolean;
      setConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
      inputField: string | null;
      setInputField: React.Dispatch<React.SetStateAction<string | null>>;
    };
  };

  // Filtering logic (shared)
  const filterOfficers = (value: string, field: 'name' | 'serviceNumber'): Officer[] => {
    if (!officers) return [];
    return officers.filter((officer: Officer) =>
      (officer[field] || '').toLowerCase().includes(value.toLowerCase())
    );
  };

  // Generic handler for officer input change
  const handleOfficerAutoCompleteInput = (
    context: OfficerContext,
    field: 'name' | 'serviceNumber',
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [context.officerKeys.id]: '',
      [context.officerKeys.name]: field === 'name' ? value : prev[context.officerKeys.name],
      [context.officerKeys.serviceNumber]:
        field === 'serviceNumber' ? value : prev[context.officerKeys.serviceNumber],
      [context.officerKeys.rank]: field === 'name' ? '' : prev[context.officerKeys.rank]
    }));
    context.dropdown.setConfirmed(false);
    context.dropdown.setInputField(field);
    if (value.trim() === '') {
      context.dropdown.setOpen(false);
      context.dropdown.setFiltered([]);
      return;
    }
    context.dropdown.setOpen(true);
    context.dropdown.setFiltered(filterOfficers(value, field));
  };

  // Generic handler for officer selection from dropdown
  const handleOfficerAutoCompleteSelect = (context: OfficerContext, officer: Officer) => {
    setFormData((prev) => ({
      ...prev,
      [context.officerKeys.id]: officer.id,
      [context.officerKeys.name]: officer.name,
      [context.officerKeys.serviceNumber]: officer.serviceNumber,
      [context.officerKeys.rank]: officer.rank
    }));
    context.dropdown.setConfirmed(true);
    context.dropdown.setOpen(false);
  };

  // --- Contexts for main officer and duty officer ---
  const mainOfficerContext: OfficerContext = {
    officerKeys: {
      id: 'officer_id',
      name: 'name',
      serviceNumber: 'serviceNumber',
      rank: 'rank'
    },
    dropdown: {
      open: openOfficerDropdown,
      setOpen: setOpenOfficerDropdown,
      filtered: filteredOfficers,
      setFiltered: setFilteredOfficers,
      confirmed: isOfficerConfirmed,
      setConfirmed: setIsOfficerConfirmed,
      inputField: officerInputField,
      setInputField: setOfficerInputField
    }
  };

  const dutyOfficerContext: OfficerContext = {
    officerKeys: {
      id: 'duty_officer_id',
      name: 'dutyName',
      serviceNumber: 'dutyServiceNo',
      rank: 'dutyRank'
    },
    dropdown: {
      open: openDutyOfficerDropdown,
      setOpen: setOpenDutyOfficerDropdown,
      filtered: filteredDutyOfficers,
      setFiltered: setFilteredDutyOfficers,
      confirmed: isDutyOfficerConfirmed,
      setConfirmed: setIsDutyOfficerConfirmed,
      inputField: dutyOfficerInputField,
      setInputField: setDutyOfficerInputField
    }
  };

  // Guard officer context for auto-complete
  const guardOfficerContext: OfficerContext = {
    officerKeys: {
      id: 'guard_officer_id',
      name: 'fireName',
      serviceNumber: 'fireServiceNo',
      rank: 'fireRank' // If you want to show rank, add fireRank to formData, otherwise use ''
    },
    dropdown: {
      open: openGuardOfficerDropdown,
      setOpen: setOpenGuardOfficerDropdown,
      filtered: filteredGuardOfficers,
      setFiltered: setFilteredGuardOfficers,
      confirmed: isGuardOfficerConfirmed,
      setConfirmed: setIsGuardOfficerConfirmed,
      inputField: guardOfficerInputField,
      setInputField: setGuardOfficerInputField
    }
  };

  // --- Remove duplicated handlers ---
  // Remove handleDutyOfficerInputChange and filterDutyOfficers, use generic handler below

  // Example usage in inputs:
  // Main officer SERVICE NO:
  // onChange={e => handleOfficerAutoCompleteInput(mainOfficerContext, 'serviceNumber', e.target.value)}
  // Main officer NAME:
  // onChange={e => handleOfficerAutoCompleteInput(mainOfficerContext, 'name', e.target.value)}
  // Duty officer SERVICE NO:
  // onChange={e => handleOfficerAutoCompleteInput(dutyOfficerContext, 'serviceNumber', e.target.value)}
  // Duty officer NAME:
  // onChange={e => handleOfficerAutoCompleteInput(dutyOfficerContext, 'name', e.target.value)}

  // Dropdown selection:
  // onMouseDown={() => handleOfficerAutoCompleteSelect(mainOfficerContext, officer)}
  // onMouseDown={() => handleOfficerAutoCompleteSelect(dutyOfficerContext, officer)}

  // --- End of handler refactor ---

  const { mutate, isLoading } = useCreatePartOneOrder();

  // Helper: Convert routineActivities to API shape (days as string[])
  const getRoutineActivitiesPayload = () =>
    routineActivities.map((item) => ({
      time: item.time,
      activity: item.activity,
      days:
        typeof item.days === 'string'
          ? item.days.split('/').map((d: string) => d.trim())
          : item.days
    }));

  // Save handler
  const handleSave = () => {
    const payload: CreatePartOneOrderPayload = {
      officer_id: Number(formData.officer_id) || 0,
      appointment: formData.appointment,
      decorations: formData.decorations,
      unit: formData.unit,
      issueNo: formData.issueNo,
      date: formData.date,
      routineActivities: getRoutineActivitiesPayload(),
      dutyDepartment: formData.dutyDepartment,
      dutyDate: formData.dutyDate,
      duty_officer_id: Number(formData.duty_officer_id) || 0,
      dutyDurationHours: Number(formData.fireDuration) || 0,
      dutyLocation: formData.fireLocation,
      guard_officer_id: Number(formData.guard_officer_id) || 0,
      subject: formData.subject,
      comment: formData.comment,
      timeOut: formData.timeOut,
      signedName: formData.timeOutName,
      signedRank: formData.timeOutRank,
      signedAppt: formData.timeOutAppt
    };

    console.log('my payload:', payload);

    mutate(payload, {
      onSuccess: () => {
        toast.success('Order created successfully');
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Failed to create order');
      }
    });
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
        <div className="relative" ref={officerInputField === 'serviceNumber' ? dropdownRef : null}>
          <label className="block text-sm font-medium text-gray-700 mb-2">SERVICE NO</label>
          <input
            type="text"
            placeholder="Service No"
            className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
            value={formData.serviceNumber}
            onChange={(e) =>
              handleOfficerAutoCompleteInput(mainOfficerContext, 'serviceNumber', e.target.value)
            }
            onFocus={() => {
              if (formData.serviceNumber && !isOfficerConfirmed) {
                setOfficerInputField('serviceNumber');
                setOpenOfficerDropdown(true);
                setFilteredOfficers(filterOfficers(formData.serviceNumber, 'serviceNumber'));
              }
            }}
            autoComplete="off"
          />
          {openOfficerDropdown && officerInputField === 'serviceNumber' && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 max-h-48 overflow-y-auto">
              {filteredOfficers.length > 0 ? (
                filteredOfficers.map((officer: Officer) => (
                  <li
                    key={officer.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOfficerAutoCompleteSelect(mainOfficerContext, officer)}
                  >
                    {officer.serviceNumber} - {officer.rank} {officer.name}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No officer found</li>
              )}
            </ul>
          )}
        </div>
        <div className="relative" ref={officerInputField === 'name' ? dropdownRef : null}>
          <label className="block text-sm font-medium text-gray-700 mb-2">NAME</label>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
            value={formData.name}
            onChange={(e) =>
              handleOfficerAutoCompleteInput(mainOfficerContext, 'name', e.target.value)
            }
            onFocus={() => {
              if (formData.name && !isOfficerConfirmed) {
                setOfficerInputField('name');
                setOpenOfficerDropdown(true);
                setFilteredOfficers(filterOfficers(formData.name, 'name'));
              }
            }}
            autoComplete="off"
          />
          {openOfficerDropdown && officerInputField === 'name' && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 max-h-48 overflow-y-auto">
              {filteredOfficers.length > 0 ? (
                filteredOfficers.map((officer: Officer) => (
                  <li
                    key={officer.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOfficerAutoCompleteSelect(mainOfficerContext, officer)}
                  >
                    {officer.serviceNumber} - {officer.rank} {officer.name}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No officer found</li>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">RANK</label>
          <input
            type="text"
            placeholder="Rank"
            className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
            value={formData.rank}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">DECORATIONS</label>
          <input
            type="text"
            placeholder="Decoration"
            className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
            value={formData.decorations}
            onChange={(e) => setFormData((prev) => ({ ...prev, decorations: e.target.value }))}
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
            type="date"
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
                    type="time"
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
            type="datetime-local"
            placeholder="dd/mm/yy"
            className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
            value={formData.dutyDate}
            onChange={(e) => handleInputChange('dutyDate', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">RANK</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Rank"
              className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
              value={formData.dutyRank}
              disabled
            />
          </div>
        </div>
        <div
          className="relative"
          ref={dutyOfficerInputField === 'dutyServiceNo' ? dropdownRef : null}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">SERVICE NO</label>
          <input
            type="text"
            placeholder="Service No."
            className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
            value={formData.dutyServiceNo}
            onChange={(e) => {
              handleOfficerAutoCompleteInput(dutyOfficerContext, 'serviceNumber', e.target.value);

              if (formData.dutyServiceNo && !isDutyOfficerConfirmed) {
                setDutyOfficerInputField('dutyServiceNo');
                setOpenDutyOfficerDropdown(true);
                setFilteredDutyOfficers(filterOfficers(formData.dutyServiceNo, 'serviceNumber'));
              }
            }}
            autoComplete="off"
          />
          {openDutyOfficerDropdown && dutyOfficerInputField === 'dutyServiceNo' && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 max-h-48 overflow-y-auto">
              {filteredDutyOfficers.length > 0 ? (
                filteredDutyOfficers.map((officer: Officer) => (
                  <li
                    key={officer.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      // Set all duty officer fields and duty_officer_id
                      setFormData((prev) => ({
                        ...prev,
                        duty_officer_id: officer.id,
                        dutyName: officer.name,
                        dutyServiceNo: officer.serviceNumber,
                        dutyRank: officer.rank
                      }));
                      setIsDutyOfficerConfirmed(true);
                      setOpenDutyOfficerDropdown(false);
                    }}
                  >
                    {officer.serviceNumber} - {officer.rank} {officer.name}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No officer found</li>
              )}
            </ul>
          )}
        </div>
      </div>

      <div
        className="mb-8 relative"
        ref={dutyOfficerInputField === 'dutyName' ? dropdownRef : null}
      >
        <label className="block text-sm font-medium text-gray-700 mb-2">NAME</label>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
          value={formData.dutyName}
          onChange={(e) => {
            handleOfficerAutoCompleteInput(dutyOfficerContext, 'name', e.target.value);

            if (formData.dutyName && !isDutyOfficerConfirmed) {
              setDutyOfficerInputField('dutyName');
              setOpenDutyOfficerDropdown(true);
              setFilteredDutyOfficers(filterOfficers(formData.dutyName, 'name'));
            }
          }}
          autoComplete="off"
        />
        {openDutyOfficerDropdown && dutyOfficerInputField === 'dutyName' && (
          <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 max-h-48 overflow-y-auto">
            {filteredDutyOfficers.length > 0 ? (
              filteredDutyOfficers.map((officer: Officer) => (
                <li
                  key={officer.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onMouseDown={() => {
                    setFormData((prev) => ({
                      ...prev,
                      duty_officer_id: officer.id,
                      dutyName: officer.name,
                      dutyServiceNo: officer.serviceNumber,
                      dutyRank: officer.rank
                    }));
                    setIsDutyOfficerConfirmed(true);
                    setOpenDutyOfficerDropdown(false);
                  }}
                >
                  {officer.serviceNumber} - {officer.rank} {officer.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No officer found</li>
            )}
          </ul>
        )}
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
          {/* --- GUARD OFFICER SERVICE NO AUTOCOMPLETE --- */}
          <div
            className="relative"
            ref={guardOfficerInputField === 'fireServiceNo' ? dropdownRef : null}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">SERVICE NO</label>
            <input
              type="text"
              placeholder="Service No"
              className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
              value={formData.fireServiceNo}
              onChange={(e) => {
                handleOfficerAutoCompleteInput(
                  guardOfficerContext,
                  'serviceNumber',
                  e.target.value
                );
                setGuardOfficerInputField('fireServiceNo');
                setOpenGuardOfficerDropdown(true);
                setFilteredGuardOfficers(filterOfficers(e.target.value, 'serviceNumber'));
              }}
              autoComplete="off"
            />
            {openGuardOfficerDropdown && guardOfficerInputField === 'fireServiceNo' && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 max-h-48 overflow-y-auto">
                {filteredGuardOfficers.length > 0 ? (
                  filteredGuardOfficers.map((officer: Officer) => (
                    <li
                      key={officer.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onMouseDown={() => {
                        setFormData((prev) => ({
                          ...prev,
                          guard_officer_id: officer.id,
                          fireName: officer.name,
                          fireServiceNo: officer.serviceNumber
                        }));
                        setIsGuardOfficerConfirmed(true);
                        setOpenGuardOfficerDropdown(false);
                      }}
                    >
                      {officer.serviceNumber} - {officer.rank} {officer.name}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No officer found</li>
                )}
              </ul>
            )}
          </div>
          {/* --- GUARD OFFICER NAME AUTOCOMPLETE --- */}
          <div
            className="relative"
            ref={guardOfficerInputField === 'fireName' ? dropdownRef : null}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">NAME</label>
            <input
              type="text"
              placeholder="full Name"
              className="w-full p-3 border border-gray-300 rounded text-gray-400 placeholder-gray-400"
              value={formData.fireName}
              onChange={(e) => {
                handleOfficerAutoCompleteInput(guardOfficerContext, 'name', e.target.value);
                setGuardOfficerInputField('fireName');
                setOpenGuardOfficerDropdown(true);
                setFilteredGuardOfficers(filterOfficers(e.target.value, 'name'));
              }}
              autoComplete="off"
            />
            {openGuardOfficerDropdown && guardOfficerInputField === 'fireName' && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 max-h-48 overflow-y-auto">
                {filteredGuardOfficers.length > 0 ? (
                  filteredGuardOfficers.map((officer: Officer) => (
                    <li
                      key={officer.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onMouseDown={() => {
                        setFormData((prev) => ({
                          ...prev,
                          guard_officer_id: officer.id,
                          fireName: officer.name,
                          fireServiceNo: officer.serviceNumber
                        }));
                        setIsGuardOfficerConfirmed(true);
                        setOpenGuardOfficerDropdown(false);
                      }}
                    >
                      {officer.serviceNumber} - {officer.rank} {officer.name}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No officer found</li>
                )}
              </ul>
            )}
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
        <button
          className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded font-medium"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}
