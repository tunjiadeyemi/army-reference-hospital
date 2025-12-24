import { useContext, useState, useEffect } from 'react';
import Modal from '../Modal';
import { AppContext } from '../../context/AppContext';
import { mockTrialFormData } from '../../utils/constants';
import TrialForm from './TrialForm';
import {
  useCreateTrialForm,
  useUpdateTrialForm,
  useGetTrialForms
} from '../../hooks/dashboardhooks/useDasboardData';

const TrialModal = () => {
  const [formData, setFormData] = useState(mockTrialFormData);
  const [editMode, setEditMode] = useState(false);

  const { setShowTrialModal, selectedTrialRecord } = useContext(AppContext);

  // Fetch all trial forms and filter for the selected one
  const { data: trialForms = [], isLoading: isFetching } = useGetTrialForms();

  const createMutation = useCreateTrialForm();
  const updateMutation = useUpdateTrialForm();

  // Find and update formData when trial forms are fetched or selection changes
  useEffect(() => {
    if (selectedTrialRecord && trialForms.length > 0) {
      const selectedForm = trialForms.find((form: any) => form.id === selectedTrialRecord);
      if (selectedForm) {
        console.log('[Trial Modal] Found selected form:', selectedForm);
        // Map API's 'id' to form's 'officer_id'
        const mappedForm = {
          ...selectedForm,
          officer_id: selectedForm.officer_id || selectedForm.id
        };
        console.log('[Trial Modal] Form officer_id after mapping:', mappedForm.officer_id);
        setFormData(mappedForm);
      } else {
        console.warn('[Trial Modal] Selected form not found in list');
      }
    }
  }, [selectedTrialRecord, trialForms]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSave = async (data: any) => {
    try {
      console.log('[Trial Modal] Saving form data:', data);

      // Build payload with only required fields - NEVER include id in the payload
      const payload = {
        officer_id: String(data.officer_id),
        unit: data.unit,
        q1: data.q1,
        q2: data.q2,
        q3: data.q3,
        q4: data.q4,
        q5: data.q5,
        q6: data.q6,
        q7: data.q7,
        finding: data.finding,
        award: data.award,
        date: data.date,
        rank_officer: data.rank_officer,
        appointment: data.appointment,
        upload: data.upload || null
      };

      const isUpdate = !!selectedTrialRecord;

      if (isUpdate) {
        // For updates, pass id separately - don't include it in payload body
        await updateMutation.mutateAsync({ ...payload, id: selectedTrialRecord });
      } else {
        // For creates, just send the payload without id
        await createMutation.mutateAsync(payload);
      }

      console.log('[Trial Modal] Mutation succeeded');
      setEditMode(false);
      setShowTrialModal(false);
    } catch (error) {
      console.error('[Trial Modal] Save failed:', error);
    }
  };

  const handleCancel = () => {
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
              onClick={() => setShowTrialModal(false)}
              disabled={isLoading}
            >
              <img src="/department/chevron-left.svg" alt="chevron-left" />
            </button>

            <h1>{formData?.name || 'Trial Form'}</h1>
          </div>

          <button
            className="hover:scale-95 duration-300 transition-all cursor-pointer"
            type="button"
            onClick={() => setShowTrialModal(false)}
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
              className={`px-4 cursor-pointer text-sm py-2 flex gap-1 ${
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
                className="p-2 border border-[#D9D9D9] text-xs bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50"
                type="button"
                disabled={isLoading}
              >
                Saving via form...
              </button>
              <button
                className="p-2 border border-[#D9D9D9] text-xs disabled:opacity-50"
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
        <TrialForm
          isEdit={editMode}
          mockData={formData}
          onSave={handleSave}
          isLoading={isLoading}
        />
      </div>
    </Modal>
  );
};

export default TrialModal;
