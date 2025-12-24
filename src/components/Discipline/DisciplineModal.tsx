import { useContext, useState, useEffect } from 'react';
import Modal from '../Modal';
import { AppContext } from '../../context/AppContext';
import { mockOrderData } from '../../utils/constants';
import DisciplineForm from './DisciplineForm';
import {
  useGetChargeSheet,
  useUpdateChargeSheet
} from '../../hooks/dashboardhooks/useDasboardData';
import { showSuccess, showError } from '../../utils/toast';

const DisciplineModal = () => {
  const [orderData, setOrderData] = useState(mockOrderData);
  const [editMode, setEditMode] = useState(false);

  const { setShowDisciplineModal, selectedDisciplineRecord } = useContext(AppContext);
  const { data: chargeSheetData, isLoading } = useGetChargeSheet(selectedDisciplineRecord);
  const updateMutation = useUpdateChargeSheet();

  // Update orderData when charge sheet data is fetched
  useEffect(() => {
    if (chargeSheetData) {
      setOrderData(chargeSheetData);
    }
  }, [chargeSheetData]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSave = async (submissionData: any) => {
    try {
      await updateMutation.mutateAsync(submissionData);
      setOrderData(submissionData);
      setEditMode(false);
      showSuccess('Charge sheet updated successfully');
    } catch (error) {
      showError('Failed to update charge sheet');
      console.error('Update error:', error);
    }
  };

  const handleCancel = () => {
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
              onClick={() => setShowDisciplineModal(false)}
            >
              <img src="/department/chevron-left.svg" alt="chevron-left" />
            </button>

            <h1>{selectedDisciplineRecord}</h1>
          </div>

          <button
            className="hover:scale-95 duration-300 transition-all cursor-pointer"
            type="button"
            onClick={() => setShowDisciplineModal(false)}
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
        <DisciplineForm
          isEdit={editMode}
          mockData={orderData}
          onSave={handleSave}
          isLoading={isLoading}
        />
      </div>
    </Modal>
  );
};

export default DisciplineModal;
