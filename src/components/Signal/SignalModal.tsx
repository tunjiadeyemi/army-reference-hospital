import { useContext, useState, useEffect } from 'react';
import Modal from '../Modal';
import { AppContext } from '../../context/AppContext';
import { mockSignalFormData } from '../../utils/constants';
import SignalForm from './SignalForm';
import {
  useCreateSignalForm,
  useUpdateSignalForm,
  useGetSignalForm
} from '../../hooks/dashboardhooks/useDasboardData';
import { showError } from '../../utils/toast';

const SignalModal = () => {
  const [orderData, setOrderData] = useState(mockSignalFormData);
  const [editMode, setEditMode] = useState(false);
  const [editDraft, setEditDraft] = useState(orderData);

  const { setShowSignalModal, selectedSignalRecord } = useContext(AppContext);

  // Fetch single signal form if ID is provided
  const { data: fetchedSignalForm, isLoading: isFetching } = useGetSignalForm(selectedSignalRecord);

  const createMutation = useCreateSignalForm();
  const updateMutation = useUpdateSignalForm();

  // Update orderData when fetched data arrives
  useEffect(() => {
    if (fetchedSignalForm) {
      console.log('[Signal Modal] Setting orderData from fetched form:', fetchedSignalForm);
      setOrderData(fetchedSignalForm);
      setEditDraft(fetchedSignalForm);
    }
  }, [fetchedSignalForm]);

  const handleEditClick = () => {
    setEditDraft(orderData);
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!editDraft.drafterName?.trim()) {
        showError('Drafter name is required');
        return;
      }

      console.log('[Signal Modal] handleSave called with:', editDraft);

      // Use the appropriate mutation based on if we're creating or updating
      const isUpdate = selectedSignalRecord;
      const mutation = isUpdate ? updateMutation : createMutation;

      console.log('[Signal Modal] Using mutation:', isUpdate ? 'UPDATE' : 'CREATE');
      console.log('[Signal Modal] Calling mutateAsync...');

      // Pass ID in payload for update
      const payload = isUpdate ? { ...editDraft, id: selectedSignalRecord } : editDraft;

      await mutation.mutateAsync(payload);

      console.log('[Signal Modal] Mutation succeeded');

      // Only close on successful save
      setOrderData(editDraft);
      setEditMode(false);
      setShowSignalModal(false);
    } catch (error) {
      console.error('[Signal Modal] Save failed:', error);
      // Error handling is already done in the mutation's onError callback
    }
  };

  const handleCancel = () => {
    setEditDraft(orderData);
    setEditMode(false);
  };

  const isLoading = createMutation.isPending || updateMutation.isPending || isFetching;

  return (
    <Modal>
      <div className="bg-white w-[85%] h-[90vh] rounded-md shadow-md overflow-y-scroll overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between border-b p-6 border-[#D9D9D9]">
          <div className="flex items-center gap-7">
            <button
              className="hover:scale-95 duration-300 transition-all cursor-pointer"
              type="button"
              onClick={() => setShowSignalModal(false)}
            >
              <img src="/department/chevron-left.svg" alt="chevron-left" />
            </button>

            <h1>{orderData?.drafterName || 'Signal Form'}</h1>
          </div>

          <button
            className="hover:scale-95 duration-300 transition-all cursor-pointer"
            type="button"
            onClick={() => setShowSignalModal(false)}
            disabled={isLoading}
          >
            <img src="/department/x-close-icon.svg" alt="x-close-icon" />
          </button>
        </div>

        <div className="flex justify-between items-center mb-5 px-10 pr-5">
          <div className="text-xs text-gray-600">
            <span>Date: {new Date().toLocaleDateString()}</span>
            <span className="ml-4">{new Date().toLocaleTimeString()}</span>
          </div>
          {!editMode ? (
            <button
              className={`px-4 cursor-pointer text-sm py-2 flex ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleEditClick}
              disabled={isLoading}
            >
              <span className="p-2 border border-[#D9D9D9] text-xs">PDF</span>
              <span className="p-2 border border-[#D9D9D9] border-l-0 text-xs">Print</span>
              <span className="p-2 border border-[#D9D9D9] border-l-0 text-xs">Edit</span>
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                className={`p-2 border border-[#D9D9D9] text-xs ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleSave}
                type="button"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
              <button
                className={`p-2 border border-[#D9D9D9] text-xs ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleCancel}
                type="button"
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* body */}
        <SignalForm
          isEdit={editMode}
          mockData={orderData}
          onSuccess={() => {
            setOrderData(editDraft);
            setEditMode(false);
          }}
          isLoading={isLoading}
        />
      </div>
    </Modal>
  );
};

export default SignalModal;
