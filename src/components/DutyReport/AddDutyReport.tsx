import { useState } from 'react';
import type { FormData, OfficerData } from '../../utils/types/dutyReport';
import { mockDutyReport } from '../../utils/constants';

const AddDutyReport = ({ viewMode = false }: { viewMode: boolean }) => {
  const [formData, setFormData] = useState<FormData>(
    viewMode
      ? mockDutyReport
      : {
          dutyOfficer: {
            pNo: '',
            rank: '',
            name: '',
            department: '',
            timeReportedForDuty: '',
            timeReportedFieldOfficer: '',
            date: '',
            signature: null,
            comments: ''
          },
          fieldOfficer: {
            pNo: '',
            rank: '',
            name: '',
            date: '',
            signature: null,
            comments: '',
            recommendations: ''
          },
          coAdmin: {
            pNo: '',
            rank: '',
            name: '',
            date: '',
            signature: null,
            comments: ''
          },
          cmd: {
            pNo: '',
            rank: '',
            name: '',
            date: '',
            signature: null,
            comments: ''
          },
          dutyPosts: [
            { id: 1, name: 'HOSPITAL ENTRANCE GATE', dayHours: '', nightHours: '' },
            { id: 2, name: 'LAFIYA DOLE GATE', dayHours: '', nightHours: '' },
            { id: 3, name: 'ARMOURY', dayHours: '', nightHours: '' },
            { id: 4, name: 'NO. 3 RACE COURSE', dayHours: '', nightHours: '' },
            { id: 5, name: 'CANTONMENT GATE', dayHours: '', nightHours: '' },
            { id: 6, name: 'MAMMY MARKET', dayHours: '', nightHours: '' },
            { id: 7, name: 'CATTLE RANCH', dayHours: '', nightHours: '' },
            { id: 8, name: 'A&E', dayHours: '', nightHours: '' },
            { id: 9, name: 'GUARD ROOM', dayHours: '', nightHours: '' }
          ]
        }
  );

  const [inviteStates, setInviteStates] = useState({
    fieldOfficer: false,
    coAdmin: false,
    cmd: false
  });

  const rankOptions = [
    'Lieutenant',
    'Captain',
    'Major',
    'Lieutenant Colonel',
    'Colonel',
    'Brigadier General',
    'Major General'
  ];

  const handleOfficerDataChange = (officerType: keyof FormData, field: string, value: string) => {
    if (officerType === 'dutyPosts') return;

    setFormData((prev) => ({
      ...prev,
      [officerType]: {
        ...(typeof prev[officerType] === 'object' && prev[officerType] !== null
          ? prev[officerType]
          : {}),
        [field]: value
      }
    }));
  };

  const handleDutyPostChange = (
    postId: number,
    field: 'dayHours' | 'nightHours',
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      dutyPosts: prev.dutyPosts.map((post) =>
        post.id === postId ? { ...post, [field]: value } : post
      )
    }));
  };

  const handleSignatureUpload = (officerType: keyof FormData, file: File | null) => {
    if (officerType === 'dutyPosts') return;

    setFormData((prev) => ({
      ...prev,
      [officerType]: {
        ...(typeof prev[officerType] === 'object' && prev[officerType] !== null
          ? prev[officerType]
          : {}),
        signature: file
      }
    }));
  };

  const handleInvite = (officerType: 'fieldOfficer' | 'coAdmin' | 'cmd') => {
    setInviteStates((prev) => ({
      ...prev,
      [officerType]: true
    }));
    console.log(`Inviting ${officerType} to sign`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    console.log('Form Data:', formData);
    alert('Form saved successfully!');
  };

  const renderOfficerSection = (
    title: string,
    officerType: keyof FormData,
    showInvite: boolean = false,
    inviteText: string = '',
    includeTimeFields: boolean = false,
    includeRecommendations: boolean = false
  ) => {
    if (officerType === 'dutyPosts') return null;

    const officer = formData[officerType] as OfficerData;
    const inviteKey = officerType as 'fieldOfficer' | 'coAdmin' | 'cmd';

    return (
      <div className={`mb-12 border-t border-gray-200 pt-8 ${viewMode ? 'max-w-6xl mx-auto' : ''}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-semibold text-gray-800 underline">{title}</h3>
          {showInvite && (
            <button className="text-[#22A08E] hover:text-[#22A08E] text-sm font-medium">
              {inviteText}
            </button>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">COMMENTS</label>
          <textarea
            placeholder="Comment"
            rows={4}
            disabled={viewMode}
            value={officer.comments}
            onChange={(e) => handleOfficerDataChange(officerType, 'comments', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#22A08E] resize-none"
          />
        </div>

        {includeRecommendations && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">RECOMMENDATIONS</label>
            <textarea
              placeholder="recommendation"
              rows={4}
              disabled={viewMode}
              value={officer.recommendations || ''}
              onChange={(e) =>
                handleOfficerDataChange(officerType, 'recommendations', e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#22A08E] resize-none"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">P/NO</label>
            <input
              type="text"
              placeholder="P/No"
              disabled={viewMode}
              value={officer.pNo}
              onChange={(e) => handleOfficerDataChange(officerType, 'pNo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#22A08E]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">RANK</label>
            <div className="relative">
              <select
                value={officer.rank}
                onChange={(e) => handleOfficerDataChange(officerType, 'rank', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#22A08E] appearance-none bg-white"
              >
                <option value="">Rank</option>
                {rankOptions.map((rank) => (
                  <option key={rank} value={rank}>
                    {rank}
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
        </div>

        <div
          className={`grid gap-6 mb-6 ${
            officer.department !== undefined ? 'grid-cols-2' : 'grid-cols-1'
          }`}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">NAME</label>
            <input
              type="text"
              placeholder="Full Name"
              disabled={viewMode}
              value={officer.name}
              onChange={(e) => handleOfficerDataChange(officerType, 'name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#22A08E]"
            />
          </div>
          {officer.department !== undefined && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">DEPARTMENT</label>
              <input
                type="text"
                placeholder="Department"
                disabled={viewMode}
                value={officer.department}
                onChange={(e) => handleOfficerDataChange(officerType, 'department', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#22A08E]"
              />
            </div>
          )}
        </div>

        {includeTimeFields && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                TIME REPORTED FOR DUTY
              </label>
              <input
                type="text"
                placeholder="Time Reported for Duty"
                disabled={viewMode}
                value={officer.timeReportedForDuty || ''}
                onChange={(e) =>
                  handleOfficerDataChange(officerType, 'timeReportedForDuty', e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#22A08E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                TIME REPORTED FIELD OFFICER TIME
              </label>
              <input
                disabled={viewMode}
                type="text"
                placeholder="Time Reported for Duty"
                value={officer.timeReportedFieldOfficer || ''}
                onChange={(e) =>
                  handleOfficerDataChange(officerType, 'timeReportedFieldOfficer', e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#22A08E]"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">DATE</label>
            <input
              disabled={viewMode}
              type="text"
              placeholder="DD/MM/YY"
              value={officer.date}
              onChange={(e) => handleOfficerDataChange(officerType, 'date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#22A08E]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SIGNATURE</label>
            <div className="relative">
              <input
                type="file"
                disabled={viewMode}
                accept="image/*"
                onChange={(e) => handleSignatureUpload(officerType, e.target.files?.[0] || null)}
                className="hidden"
                id={`signature-${officerType}`}
              />
              <label
                htmlFor={`signature-${officerType}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#22A08E] cursor-pointer flex items-center justify-between bg-white"
              >
                <span className="text-gray-400">
                  {officer.signature ? officer.signature.name : 'Upload signature'}
                </span>
              </label>
            </div>
          </div>
        </div>

        {showInvite && !viewMode && (
          <div className="flex justify-center">
            <button
              onClick={() => handleInvite(inviteKey)}
              disabled={inviteStates[inviteKey]}
              className="px-6 py-3 text-sm cursor-pointer bg-[#22A08E] text-white rounded-md hover:bg-[#22A08E] disabled:bg-gray-400 transition-colors"
            >
              {inviteStates[inviteKey] ? 'Invited' : inviteText}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`p-6 ${viewMode && 'mb-[5rem]'}`}>
      {/* Header */}
      {viewMode ? (
        <div className="flex justify-between items-center mb-14">
          <div className="text-xs text-gray-600">
            <span>Date created: {mockDutyReport.dateCreated}</span>
            <span className="ml-4">{mockDutyReport.timeCreated}</span>
          </div>
          <button className={`px-4 cursor-pointer text-sm py-2 flex`}>
            <span className="p-2 border border-[#D9D9D9] text-xs">PDF</span>
            <span className="p-2 border border-[#D9D9D9] border-l-0 text-xs">Print</span>
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold text-center flex-1">
            44 NARHK DUTY OFFICERS' DAILY REPORT FORM
          </h1>
          <button
            onClick={handlePrint}
            className="cursor-pointer flex items-center space-x-2 hover:scale-95 duration-300 text-xs"
          >
            <img src="/dutyReport/print-icon.svg" alt="Print" className="w-4" />
            <span>Print form</span>
          </button>
        </div>
      )}

      {/* Duty Officer Section */}
      <div className={`mb-8 ${viewMode ? 'max-w-6xl mx-auto' : ''}`}>
        <h2 className="text-sm font-semibold mb-6 pb-2">
          1 <span className="underline">DUTY OFFICER</span>
        </h2>

        <div className="flex-col flex gap-6 mb-6">
          <div className="grid grid-cols-3 gap-10 items-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">P/NO</label>
            <input
              type="text"
              placeholder="P/No"
              disabled={viewMode}
              value={formData.dutyOfficer.pNo}
              onChange={(e) => handleOfficerDataChange('dutyOfficer', 'pNo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#22A08E]"
            />
          </div>
          <div className="grid grid-cols-3 gap-10 items-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">RANK</label>
            <div className="relative">
              <select
                value={formData.dutyOfficer.rank}
                onChange={(e) => handleOfficerDataChange('dutyOfficer', 'rank', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#22A08E] appearance-none bg-white"
              >
                <option value="">Rank</option>
                {rankOptions.map((rank) => (
                  <option key={rank} value={rank}>
                    {rank}
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

          <div className="grid grid-cols-3 gap-10 items-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">NAME</label>
            <input
              type="text"
              placeholder="Full Name"
              disabled={viewMode}
              value={formData.dutyOfficer.name}
              onChange={(e) => handleOfficerDataChange('dutyOfficer', 'name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#22A08E]"
            />
          </div>
          <div className="grid grid-cols-3 gap-10 items-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">DEPARTMENT</label>
            <input
              type="text"
              disabled={viewMode}
              placeholder="Department"
              value={formData.dutyOfficer.department}
              onChange={(e) => handleOfficerDataChange('dutyOfficer', 'department', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#22A08E]"
            />
          </div>

          <div className="grid grid-cols-3 gap-10 items-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              TIME REPORTED FOR DUTY
            </label>
            <input
              type="text"
              disabled={viewMode}
              placeholder="Time Reported for Duty"
              value={formData.dutyOfficer.timeReportedForDuty}
              onChange={(e) =>
                handleOfficerDataChange('dutyOfficer', 'timeReportedForDuty', e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#22A08E]"
            />
          </div>
          <div className="grid grid-cols-3 gap-10 items-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              TIME REPORTED FIELD OFFICER TIME
            </label>
            <input
              type="text"
              disabled={viewMode}
              placeholder="Time Reported for Duty"
              value={formData.dutyOfficer.timeReportedFieldOfficer}
              onChange={(e) =>
                handleOfficerDataChange('dutyOfficer', 'timeReportedFieldOfficer', e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#22A08E]"
            />
          </div>
        </div>

        {/* Duty Posts Table */}
        <div className="my-8">
          <h3 className="text-md font-medium border-b pb-4 border-[#D9D9D9] mb-4">
            DUTY POST VISITED WITH TIMING
          </h3>

          <div className="grid grid-cols-3">
            <div></div>
            <p className="text-right">Day</p>
            <p className="text-right">Night</p>
          </div>

          <div className="flex flex-col gap-5 mt-8">
            {formData.dutyPosts.map((post, index) => (
              <div key={post.id} className="grid grid-cols-3">
                <div className="flex items-center gap-3">
                  {['I.', 'II.', 'III.', 'IV.', 'V.', 'VI.', 'VII.', 'VIII.', 'IX.'][index]}
                  <p>{post.name}</p>
                </div>

                <div className="flex justify-end">
                  <input
                    type="text"
                    placeholder="Hr"
                    disabled={viewMode}
                    value={post.dayHours}
                    onChange={(e) => handleDutyPostChange(post.id, 'dayHours', e.target.value)}
                    className="w-[40%] px-3 py-2 rounded-md border text-right border-[#B1B8B7] focus:outline-none focus:ring-1 focus:ring-[#22A08E]"
                  />
                </div>

                <div className="flex justify-end">
                  <input
                    type="text"
                    placeholder="Hr"
                    value={post.nightHours}
                    disabled={viewMode}
                    onChange={(e) => handleDutyPostChange(post.id, 'nightHours', e.target.value)}
                    className="w-[40%] px-3 py-2 rounded-md border text-right border-[#B1B8B7] focus:outline-none focus:ring-1 focus:ring-[#22A08E]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 flex items-center">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            DUTY OFFICER'S COMMENT
          </label>

          <textarea
            placeholder="Time Reported for Duty"
            rows={4}
            value={formData.dutyOfficer.comments}
            disabled={viewMode}
            onChange={(e) => handleOfficerDataChange('dutyOfficer', 'comments', e.target.value)}
            className="w-[90%] px-3 py-2 border border-gray-300 rounded-md placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-[#22A08E] resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between gap-10">
            <label className="block text-sm font-medium text-gray-700 mb-2">DATE</label>
            <input
              type="text"
              disabled={viewMode}
              placeholder="DD/MM/YY"
              value={formData.dutyOfficer.date}
              onChange={(e) => handleOfficerDataChange('dutyOfficer', 'date', e.target.value)}
              className="w-[70%] px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#22A08E]"
            />
          </div>
          <div className="flex items-center justify-between gap-10">
            <label className="block text-sm font-medium text-gray-700 mb-2">SIGNATURE</label>
            <div className="relative w-[70%]">
              <input
                type="file"
                accept="image/*"
                disabled={viewMode}
                onChange={(e) => handleSignatureUpload('dutyOfficer', e.target.files?.[0] || null)}
                className="hidden"
                id="signature-duty-officer"
              />
              <label
                htmlFor="signature-duty-officer"
                className="w-full px-3 py-7 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#22A08E] cursor-pointer flex items-center justify-between bg-white"
              >
                <span className="text-gray-400">
                  {formData.dutyOfficer.signature
                    ? formData.dutyOfficer.signature.name
                    : 'Upload signature'}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Other Officer Sections */}
      {renderOfficerSection(
        '2 FIELD OFFICER',
        'fieldOfficer',
        true,
        'Invite Field Officer',
        false,
        true
      )}

      {renderOfficerSection('3 CO ADMIN', 'coAdmin', true, 'Invite CO ADMIN', false, false)}

      {renderOfficerSection('4 CMD', 'cmd', true, 'Invite CMD', false, false)}

      {/* Save Button */}
      {!viewMode && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleSave}
            className="px-9 cursor-pointer hover:scale-95 duration-300 transition-all py-4 bg-[#22A08E] text-white rounded-md hover:bg-[#22A08E] focus:outline-none focus:ring-1 focus:ring-[#22A08E] focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default AddDutyReport;
