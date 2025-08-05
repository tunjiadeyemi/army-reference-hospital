/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react';
import Modal from '../Modal';
import { AppContext } from '../../context/AppContext';
import { mockOrderData } from '../../utils/constants';

const RecordModal = () => {
  const [orderData, setOrderData] = useState(mockOrderData);
  const [editMode, setEditMode] = useState(false);
  const [editDraft, setEditDraft] = useState(orderData);

  const { setShowRecordModal, selectedRecord } = useContext(AppContext);

  // Handle input changes for edit mode
  const handleEditChange = (section: string, field: string, value: string, subIndex?: number) => {
    setEditDraft((prev: any) => {
      const updated = { ...prev };
      if (section === 'routineActivities' && typeof subIndex === 'number') {
        updated.routineActivities = [...updated.routineActivities];
        updated.routineActivities[subIndex] = {
          ...updated.routineActivities[subIndex],
          [field]: value
        };
      } else if (section.includes('.')) {
        // For nested fields like 'noticeBoardInfo.signatory.name'
        const [main, sub, subfield] = section.split('.');
        updated[main] = { ...updated[main] };
        if (subfield) {
          updated[main][sub] = { ...updated[main][sub], [field]: value };
        } else {
          updated[main][sub] = value;
        }
      } else {
        updated[section] = { ...updated[section], [field]: value };
      }
      return updated;
    });
  };

  const handleEditClick = () => {
    setEditDraft(orderData);
    setEditMode(true);
  };

  const handleSave = () => {
    setOrderData(editDraft);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditDraft(orderData);
    setEditMode(false);
  };

  return (
    <Modal>
      <div className="bg-white w-[85%] h-[90vh] rounded-md shadow-md overflow-y-scroll overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between border-b p-6 border-[#D9D9D9]">
          <div className="flex items-center gap-7">
            <button
              className="hover:scale-95 duration-300 transition-all cursor-pointer"
              type="button"
              onClick={() => setShowRecordModal(false)}
            >
              <img src="/department/chevron-left.svg" alt="chevron-left" />
            </button>

            <h1>{selectedRecord}</h1>
          </div>

          <button
            className="hover:scale-95 duration-300 transition-all cursor-pointer"
            type="button"
            onClick={() => setShowRecordModal(false)}
          >
            <img src="/department/x-close-icon.svg" alt="x-close-icon" />
          </button>
        </div>

        <div className="flex justify-between items-center mb-5 px-10 pr-5">
          <div className="text-xs text-gray-600">
            <span>Date created: {orderData.dateCreated}</span>
            <span className="ml-4">{orderData.timeCreated}</span>
          </div>
          {!editMode ? (
            <button className={`px-4 cursor-pointer text-sm py-2 flex`} onClick={handleEditClick}>
              <span className="p-2 border border-[#D9D9D9] text-xs">PDF</span>
              <span className="p-2 border border-[#D9D9D9] border-l-0 text-xs">Print</span>
              <span className="p-2 border border-[#D9D9D9] border-l-0 text-xs">Edit</span>
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                className="p-2 border border-[#D9D9D9] text-xs"
                onClick={handleSave}
                type="button"
              >
                Save
              </button>
              <button
                className="p-2 border border-[#D9D9D9] text-xs"
                onClick={handleCancel}
                type="button"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* body */}
        <div className="max-w-6xl mx-auto p-8 bg-white font-sans">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-sm font-medium text-gray-800 mb-4">{orderData.header.title}</h1>
            <h2 className="text-sm font-bold text-gray-800 mb-6">
              {orderData.header.commandingOfficer}
            </h2>
          </div>

          {/* Personal Details Grid */}
          <div className="mb-8">
            <div className="grid grid-cols-6 gap-4 text-sm">
              <div className="flex">
                <span className="font-medium text-gray-800 mr-2">RANK:</span>
                {editMode ? (
                  <input
                    className="text-gray-700 border border-gray-200 rounded px-2 py-1 text-sm"
                    value={editDraft.personalDetails.rank}
                    onChange={(e) => handleEditChange('personalDetails', 'rank', e.target.value)}
                  />
                ) : (
                  <span className="text-gray-700">{orderData.personalDetails.rank}</span>
                )}
              </div>
              <div className="flex">
                <span className="font-medium text-gray-800 mr-2">NAME:</span>
                {editMode ? (
                  <input
                    className="text-gray-700 border border-gray-200 rounded px-2 py-1 text-sm"
                    value={editDraft.personalDetails.name}
                    onChange={(e) => handleEditChange('personalDetails', 'name', e.target.value)}
                  />
                ) : (
                  <span className="text-gray-700">{orderData.personalDetails.name}</span>
                )}
              </div>
              <div className="flex">
                <span className="font-medium text-gray-800 mr-2">SERVICE NO.:</span>
                {editMode ? (
                  <input
                    className="text-gray-700 border border-gray-200 rounded px-2 py-1 text-sm"
                    value={editDraft.personalDetails.serviceNo}
                    onChange={(e) =>
                      handleEditChange('personalDetails', 'serviceNo', e.target.value)
                    }
                  />
                ) : (
                  <span className="text-gray-700">{orderData.personalDetails.serviceNo}</span>
                )}
              </div>
              <div className="flex">
                <span className="font-medium text-gray-800 mr-2">DECORATIONS:</span>
                {editMode ? (
                  <input
                    className="text-gray-700 border border-gray-200 rounded px-2 py-1 text-sm"
                    value={editDraft.personalDetails.decorations}
                    onChange={(e) =>
                      handleEditChange('personalDetails', 'decorations', e.target.value)
                    }
                  />
                ) : (
                  <span className="text-gray-700">{orderData.personalDetails.decorations}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-6 gap-4 text-sm mt-4">
              <div className="flex">
                <span className="font-medium text-gray-800 mr-2">ISSUE NO:</span>
                <span className="text-gray-700">{orderData.personalDetails.issueNo}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-800 mr-2">UNIT:</span>
                {editMode ? (
                  <input
                    className="text-gray-700 border border-gray-200 rounded px-2 py-1 text-sm"
                    value={editDraft.personalDetails.unit}
                    onChange={(e) => handleEditChange('personalDetails', 'unit', e.target.value)}
                  />
                ) : (
                  <span className="text-gray-700">{orderData.personalDetails.unit}</span>
                )}
              </div>
              <div className="flex">
                <span className="font-medium text-gray-800 mr-2">APPOINTMENT:</span>
                {editMode ? (
                  <input
                    className="text-gray-700 border border-gray-200 rounded px-2 py-1 text-sm"
                    value={editDraft.personalDetails.appointment}
                    onChange={(e) =>
                      handleEditChange('personalDetails', 'appointment', e.target.value)
                    }
                  />
                ) : (
                  <span className="text-gray-700">{orderData.personalDetails.appointment}</span>
                )}
              </div>
              <div className="flex">
                <span className="font-medium text-gray-800 mr-2">DATE:</span>
                {editMode ? (
                  <input
                    className="text-gray-700 border border-gray-200 rounded px-2 py-1 text-sm"
                    value={editDraft.personalDetails.date}
                    onChange={(e) => handleEditChange('personalDetails', 'date', e.target.value)}
                  />
                ) : (
                  <span className="text-gray-700">{orderData.personalDetails.date}</span>
                )}
              </div>
            </div>
          </div>

          {/* Routine Activities Section */}
          <div className="mb-8">
            <div className="border-t border-gray-300 mb-4"></div>
            <h3 className="text-center text-sm font-medium text-gray-800 mb-6">
              ROUTINE ACTIVITIES
            </h3>

            <div className="overflow-hidden">
              <div className="grid grid-cols-3 gap-8 mb-4">
                <div className="text-center">
                  <span className="font-medium text-gray-800 text-sm">TIME</span>
                </div>
                <div className="text-center">
                  <span className="font-medium text-gray-800 text-sm">ACTIVITIES</span>
                </div>
                <div className="text-center">
                  <span className="font-medium text-gray-800 text-sm">DAYS</span>
                </div>
              </div>

              {orderData.routineActivities.map((activity, index) => (
                <div key={index} className="grid grid-cols-3 gap-8 py-2 text-sm">
                  <div className="text-center text-gray-700">{activity.time}</div>
                  <div className="text-center text-gray-700">{activity.activity}</div>
                  <div className="text-center text-gray-700">{activity.days}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Duty/Department Section */}
          <div className="mb-8">
            <div className="grid grid-cols-4 gap-4 text-sm mb-4">
              <div className="flex">
                <span className="font-medium text-gray-800 mr-2">DUTY/DEPARTMENT:</span>
                <span className="text-gray-700">{orderData.dutyDepartment.department}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-800 mr-2">DATE:</span>
                <span className="text-gray-700">{orderData.dutyDepartment.date}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-800 mr-2">RANK:</span>
                <span className="text-gray-700">{orderData.dutyDepartment.rank}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-800 mr-2">SERVICE NO:</span>
                <span className="text-gray-700">{orderData.dutyDepartment.serviceNo}</span>
              </div>
            </div>

            <div className="text-sm">
              <div className="flex">
                <span className="font-medium text-gray-800 mr-2">NAME:</span>
                <span className="text-gray-700">{orderData.dutyDepartment.name}</span>
              </div>
            </div>
          </div>

          {/* Fire Piquet and Guard Duty */}
          <div className="mb-8">
            <div className="border-t border-gray-300 mb-4"></div>
            <h3 className="text-center text-sm font-medium text-gray-800 mb-6">
              FIRE PIQUET AND GUARD DUTY
            </h3>

            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="flex">
                <span className="font-medium text-gray-800 mr-2">DUTY DURATION:</span>
                <span className="text-gray-700">{orderData.firePicketGuardDuty.dutyDuration}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-800 mr-2">LOCATION:</span>
                <span className="text-gray-700">{orderData.firePicketGuardDuty.location}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-800 mr-2">SERVICE NO.:</span>
                <span className="text-gray-700">{orderData.firePicketGuardDuty.serviceNo}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-800 mr-2">NAME:</span>
                <span className="text-gray-700">{orderData.firePicketGuardDuty.name}</span>
              </div>
            </div>
          </div>

          {/* Notice Board and Information */}
          <div className="mb-8">
            <div className="border-t border-gray-300 mb-4"></div>
            <h3 className="text-center text-sm font-medium text-gray-800 mb-6">
              NOTICE BOARD AND INFORMATION
            </h3>

            <div className="grid grid-cols-2 gap-8 mb-4 text-sm">
              <div className="flex">
                <span className="font-medium text-gray-800 mr-2">SUBJECT:</span>
                <span className="text-gray-700">{orderData.noticeBoardInfo.subject}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-800 mr-2">TIME OUT:</span>
                <span className="text-gray-700">{orderData.noticeBoardInfo.timeOut}</span>
              </div>
            </div>

            <div className="mb-6 text-sm">
              <div className="flex flex-col">
                <span className="font-medium text-gray-800 mb-2">COMMENT:</span>
                <span className="text-gray-700 leading-relaxed">
                  {orderData.noticeBoardInfo.comment}
                </span>
              </div>
            </div>

            {/* Signatory Information */}
            <div className="flex justify-end">
              <div className="text-right text-sm space-y-2">
                <div className="flex">
                  <span className="font-medium text-gray-800 mr-4">NAME:</span>
                  <span className="text-gray-700">{orderData.noticeBoardInfo.signatory.name}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-800 mr-4">RANK:</span>
                  <span className="text-gray-700">{orderData.noticeBoardInfo.signatory.rank}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-800 mr-4">APPT:</span>
                  <span className="text-gray-700">
                    {orderData.noticeBoardInfo.signatory.appointment}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RecordModal;
