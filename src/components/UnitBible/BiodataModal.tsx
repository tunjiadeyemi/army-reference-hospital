import { useContext } from 'react';
import Modal from '../Modal';
import { AppContext } from '../../context/AppContext';
import OfficerBioDataForm from './OfficerBiodataForm';

const BiodataModal = () => {
  const { setShowBiodataModal, selectedBiodata, selectedBiodataObj } = useContext(AppContext);
  console.log("Object passed: ", selectedBiodataObj)
  return (
    <Modal>
      <div className="bg-white w-[85%] h-[90vh] rounded-md shadow-md overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between border-b p-6 border-[#D9D9D9]">
          <div className="flex items-center gap-7">
            <button
              className="hover:scale-95 duration-300 transition-all cursor-pointer"
              type="button"
              onClick={() => setShowBiodataModal(false)}
            >
              <img src="/department/chevron-left.svg" alt="chevron-left" />
            </button>

            <h1>{selectedBiodata}</h1>
          </div>

          <button
            className="hover:scale-95 duration-300 transition-all cursor-pointer"
            type="button"
            onClick={() => setShowBiodataModal(false)}
          >
            <img src="/department/x-close-icon.svg" alt="x-close-icon" />
          </button>
        </div>

        {/* body */}
        <section className="overflow-y-auto overflow-hidden h-full">
          <OfficerBioDataForm selectedData={selectedBiodataObj}   viewMode={true}  />
        </section>
      </div>
    </Modal>
  );
};

export default BiodataModal;
