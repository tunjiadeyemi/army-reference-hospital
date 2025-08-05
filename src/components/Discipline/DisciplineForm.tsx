/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

// Mock data for view mode

interface DisciplineFormProps {
  isEdit?: boolean;
  mockData?: any;
}

export default function DisciplineForm({ isEdit = true, mockData }: DisciplineFormProps) {
  const [formData, setFormData] = useState({
    // The Accused
    accusedRank: isEdit ? '' : mockData?.accusedRank,
    accusedName: isEdit ? '' : mockData?.accusedName,
    accusedArmyNo: isEdit ? '' : mockData?.accusedArmyNo,
    accusedUnit: isEdit ? '' : mockData?.accusedUnit,
    statementOfOffence: isEdit ? '' : mockData?.statementOfOffence,
    punishableUnderSection: isEdit ? '' : mockData?.punishableUnderSection,
    particularsOfOffence: isEdit ? '' : mockData?.particularsOfOffence,

    // Offence Reported By
    reporterRank: isEdit ? '' : mockData?.reporterRank,
    reporterName: isEdit ? '' : mockData?.reporterName,
    reporterArmyNo: isEdit ? '' : mockData?.reporterArmyNo,
    reporterUnit: isEdit ? '' : mockData?.reporterUnit,

    // Witness
    witnessRank: isEdit ? '' : mockData?.witnessRank,
    witnessName: isEdit ? '' : mockData?.witnessName,
    witnessArmyNo: isEdit ? '' : mockData?.witnessArmyNo,
    witnessUnit: isEdit ? '' : mockData?.witnessUnit,

    // To Be Tried By
    trialRank: isEdit ? '' : mockData?.trialRank,
    trialName: isEdit ? '' : mockData?.trialName,
    trialArmyNo: isEdit ? '' : mockData?.trialArmyNo,
    trialUnit: isEdit ? '' : mockData?.trialUnit,

    // Company or Equivalent Commander
    coFindings: isEdit ? '' : mockData?.coFindings,
    coAward: isEdit ? '' : mockData?.coAward,
    coRecommendations: isEdit ? '' : mockData?.coRecommendations,
    coDate: isEdit ? '' : mockData?.coDate,
    coRank: isEdit ? '' : mockData?.coRank,
    coName: isEdit ? '' : mockData?.coName,
    coNumber: isEdit ? '' : mockData?.coNumber,
    coSignature: isEdit ? '' : mockData?.coSignature,

    // BN Commander or Equivalent
    bnFinding: isEdit ? '' : mockData?.bnFinding,
    bnAward: isEdit ? '' : mockData?.bnAward,
    bnRecommendations: isEdit ? '' : mockData?.bnRecommendations,
    bnDate: isEdit ? '' : mockData?.bnDate,
    bnRank: isEdit ? '' : mockData?.bnRank,
    bnName: isEdit ? '' : mockData?.bnName,
    bnNumber: isEdit ? '' : mockData?.bnNumber,
    bnSignature: isEdit ? '' : mockData?.bnSignature,

    // BDE/GAR Commander or Equivalent
    bdeFindings: isEdit ? '' : mockData?.bdeFindings,
    bdeAward: isEdit ? '' : mockData?.bdeAward,
    bdeRecommendations: isEdit ? '' : mockData?.bdeRecommendations,
    bdeDate: isEdit ? '' : mockData?.bdeDate,
    bdeRank: isEdit ? '' : mockData?.bdeRank,
    bdeName: isEdit ? '' : mockData?.bdeName,
    bdeNumber: isEdit ? '' : mockData?.bdeNumber,
    bdeSignature: isEdit ? '' : mockData?.bdeSignature,

    // General Officer Commanding or Equivalent
    gocFindings: isEdit ? '' : mockData?.gocFindings,
    gocAward: isEdit ? '' : mockData?.gocAward,
    gocRecommendations: isEdit ? '' : mockData?.gocRecommendations,
    gocDate: isEdit ? '' : mockData?.gocDate,
    gocRank: isEdit ? '' : mockData?.gocRank,
    gocName: isEdit ? '' : mockData?.gocName,
    gocNumber: isEdit ? '' : mockData?.gocNumber,
    gocSignature: isEdit ? '' : mockData?.gocSignature
  });

  const handleInputChange = (e: any) => {
    if (!isEdit) return; // Only allow changes when in edit mode

    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Form saved successfully!');
  };

  const rankOptions = [
    'Rank',
    'General',
    'Lieutenant General',
    'Major General',
    'Brigadier',
    'Colonel',
    'Lieutenant Colonel',
    'Major',
    'Captain',
    'Lieutenant',
    '2nd Lieutenant',
    'Warrant Officer',
    'Staff Sergeant',
    'Sergeant',
    'Corporal',
    'Lance Corporal',
    'Private'
  ];

  return (
    <div className="p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-gray-600">NA FORM 252</p>
            <p className="text-sm text-gray-600">SECTION 123</p>
          </div>
          <div className="flex gap-2">
            <button
              disabled={!isEdit}
              className={`px-4 py-1 text-sm border border-gray-300 rounded ${
                !isEdit ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'
              }`}
            >
              PDF
            </button>
            <button
              disabled={!isEdit}
              className={`px-4 py-1 text-sm border border-gray-300 rounded ${
                !isEdit ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'
              }`}
            >
              Print
            </button>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-4">CHARGE SHEET</h1>
        <p className="text-center text-gray-700 mb-8">MADE UNDER AFA CAP A20 LFN 2004</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: The Accused */}
        <div>
          <h2 className="text-lg font-semibold mb-4 underline">1 THE ACCUSED</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">RANK</label>
              <select
                name="accusedRank"
                value={formData.accusedRank}
                onChange={handleInputChange}
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              >
                {rankOptions.map((rank) => (
                  <option key={rank} value={rank === 'Rank' ? '' : rank}>
                    {rank}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">NAME</label>
              <input
                type="text"
                name="accusedName"
                value={formData.accusedName}
                onChange={handleInputChange}
                placeholder="Full name"
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">ARMY NO.</label>
              <input
                type="text"
                name="accusedArmyNo"
                value={formData.accusedArmyNo}
                onChange={handleInputChange}
                placeholder="Army no"
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">UNIT</label>
              <input
                type="text"
                name="accusedUnit"
                value={formData.accusedUnit}
                onChange={handleInputChange}
                placeholder="Army no"
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>

          <p className="mb-4">Being a person subject to military law is charge with</p>

          <div className="mb-4">
            <div className="flex items-start gap-4 mb-4">
              <span className="font-medium">a.</span>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">A STATEMENT OF OFFENCE</label>
                <textarea
                  name="statementOfOffence"
                  value={formData.statementOfOffence}
                  onChange={handleInputChange}
                  placeholder="write here"
                  rows={4}
                  disabled={!isEdit}
                  className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                  }`}
                />
              </div>
            </div>

            <div className="ml-8">
              <label className="block text-sm font-medium mb-2">PUNISHABLE UNDER SECTION</label>
              <input
                type="text"
                name="punishableUnderSection"
                value={formData.punishableUnderSection}
                onChange={handleInputChange}
                placeholder="Punishable under section"
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="font-medium">b.</span>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">PARTICULARS OF OFFENCE</label>
              <textarea
                name="particularsOfOffence"
                value={formData.particularsOfOffence}
                onChange={handleInputChange}
                placeholder="Write here"
                rows={4}
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Offence Reported By */}
        <div>
          <h2 className="text-lg font-semibold mb-4 underline">2 OFFENCE REPORTED BY</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">RANK</label>
              <select
                name="reporterRank"
                value={formData.reporterRank}
                onChange={handleInputChange}
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              >
                {rankOptions.map((rank) => (
                  <option key={rank} value={rank === 'Rank' ? '' : rank}>
                    {rank}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">NAME</label>
              <input
                type="text"
                name="reporterName"
                value={formData.reporterName}
                onChange={handleInputChange}
                placeholder="Full name"
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ARMY NO.</label>
              <input
                type="text"
                name="reporterArmyNo"
                value={formData.reporterArmyNo}
                onChange={handleInputChange}
                placeholder="Army no"
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">UNIT</label>
              <input
                type="text"
                name="reporterUnit"
                value={formData.reporterUnit}
                onChange={handleInputChange}
                placeholder="Army no"
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Witness */}
        <div>
          <h2 className="text-lg font-semibold mb-4 underline">3 WITNESS</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">RANK</label>
              <select
                name="witnessRank"
                value={formData.witnessRank}
                onChange={handleInputChange}
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              >
                {rankOptions.map((rank) => (
                  <option key={rank} value={rank === 'Rank' ? '' : rank}>
                    {rank}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">NAME</label>
              <input
                type="text"
                name="witnessName"
                value={formData.witnessName}
                onChange={handleInputChange}
                placeholder="Full name"
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ARMY NO.</label>
              <input
                type="text"
                name="witnessArmyNo"
                value={formData.witnessArmyNo}
                onChange={handleInputChange}
                placeholder="Army no"
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">UNIT</label>
              <input
                type="text"
                name="witnessUnit"
                value={formData.witnessUnit}
                onChange={handleInputChange}
                placeholder="Army no"
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>
        </div>

        {/* Section 4: To Be Tried By */}
        <div>
          <h2 className="text-lg font-semibold mb-4 underline">4 TO BE TRIED BY</h2>
          <p className="text-sm mb-4">IN CASE OF OF COURT MARTIAL ONLY, STATE TYPE</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">RANK</label>
              <select
                name="trialRank"
                value={formData.trialRank}
                onChange={handleInputChange}
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              >
                {rankOptions.map((rank) => (
                  <option key={rank} value={rank === 'Rank' ? '' : rank}>
                    {rank}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">NAME</label>
              <input
                type="text"
                name="trialName"
                value={formData.trialName}
                onChange={handleInputChange}
                placeholder="Full name"
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ARMY NO.</label>
              <input
                type="text"
                name="trialArmyNo"
                value={formData.trialArmyNo}
                onChange={handleInputChange}
                placeholder="Army no"
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">UNIT</label>
              <input
                type="text"
                name="trialUnit"
                value={formData.trialUnit}
                onChange={handleInputChange}
                placeholder="Army no"
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>
        </div>

        {/* Company or Equivalent Commander */}
        <div>
          <h3 className="text-base font-semibold mb-4">a. COMPANY OR EQUIVALENT COMMANDER</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">FINDINGS</label>
              <textarea
                name="coFindings"
                value={formData.coFindings}
                onChange={handleInputChange}
                placeholder="findings"
                rows={3}
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">AWARD</label>
              <input
                type="text"
                name="coAward"
                value={formData.coAward}
                onChange={handleInputChange}
                placeholder="Punishable under section"
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">RECOMMENDATIONS</label>
              <input
                type="text"
                name="coRecommendations"
                value={formData.coRecommendations}
                onChange={handleInputChange}
                placeholder="Punishable under section"
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">DATE</label>
                <input
                  type="text"
                  name="coDate"
                  value={formData.coDate}
                  onChange={handleInputChange}
                  placeholder="DD/MM/YY"
                  disabled={!isEdit}
                  className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">RANK</label>
                <select
                  name="coRank"
                  value={formData.coRank}
                  onChange={handleInputChange}
                  disabled={!isEdit}
                  className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                  }`}
                >
                  {rankOptions.map((rank) => (
                    <option key={rank} value={rank === 'Rank' ? '' : rank}>
                      {rank}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">NAME</label>
                <input
                  type="text"
                  name="coName"
                  value={formData.coName}
                  onChange={handleInputChange}
                  placeholder="Full name"
                  disabled={!isEdit}
                  className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">NUMBER</label>
                <input
                  type="text"
                  name="coNumber"
                  value={formData.coNumber}
                  onChange={handleInputChange}
                  placeholder="Number"
                  disabled={!isEdit}
                  className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">SIGNATURE</label>
              <textarea
                name="coSignature"
                value={formData.coSignature}
                onChange={handleInputChange}
                placeholder="signature"
                rows={3}
                disabled={!isEdit}
                className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>
        </div>

        {/* BN Commander or Equivalent */}
        <div>
          <h3 className="text-base font-semibold mb-4">b. BN COMMANDER OR EQUIVALENT</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">FINDING</label>
              <textarea
                name="bnFinding"
                value={formData.bnFinding}
                onChange={handleInputChange}
                placeholder="Write here"
                rows={3}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">AWARD</label>
              <input
                type="text"
                name="bnAward"
                value={formData.bnAward}
                onChange={handleInputChange}
                placeholder="Write here"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">RECOMMENDATIONS</label>
              <textarea
                name="bnRecommendations"
                value={formData.bnRecommendations}
                onChange={handleInputChange}
                placeholder="Write here"
                rows={3}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">DATE</label>
                <input
                  type="text"
                  name="bnDate"
                  value={formData.bnDate}
                  onChange={handleInputChange}
                  placeholder="Write here"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">RANK</label>
                <input
                  type="text"
                  name="bnRank"
                  value={formData.bnRank}
                  onChange={handleInputChange}
                  placeholder="Write here"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">NAME</label>
                <input
                  type="text"
                  name="bnName"
                  value={formData.bnName}
                  onChange={handleInputChange}
                  placeholder="Write here"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">NUMBER</label>
                <input
                  type="text"
                  name="bnNumber"
                  value={formData.bnNumber}
                  onChange={handleInputChange}
                  placeholder="Write here"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">SIGNATURE</label>
              <textarea
                name="bnSignature"
                value={formData.bnSignature}
                onChange={handleInputChange}
                placeholder="Write here"
                rows={3}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* BDE/GAR Commander or Equivalent */}
        <div>
          <h3 className="text-base font-semibold mb-4">c. BDE/GAR COMMANDER OR EQUIVALENT</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">FINDINGS</label>
              <textarea
                name="bdeFindings"
                value={formData.bdeFindings}
                onChange={handleInputChange}
                placeholder="findings"
                rows={3}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">AWARD</label>
              <input
                type="text"
                name="bdeAward"
                value={formData.bdeAward}
                onChange={handleInputChange}
                placeholder="Punishable under section"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">RECOMMENDATIONS</label>
              <input
                type="text"
                name="bdeRecommendations"
                value={formData.bdeRecommendations}
                onChange={handleInputChange}
                placeholder="Punishable under section"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">DATE</label>
                <input
                  type="text"
                  name="bdeDate"
                  value={formData.bdeDate}
                  onChange={handleInputChange}
                  placeholder="DD/MM/YY"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">RANK</label>
                <select
                  name="bdeRank"
                  value={formData.bdeRank}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {rankOptions.map((rank) => (
                    <option key={rank} value={rank === 'Rank' ? '' : rank}>
                      {rank}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">NAME</label>
                <input
                  type="text"
                  name="bdeName"
                  value={formData.bdeName}
                  onChange={handleInputChange}
                  placeholder="Full name"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">NUMBER</label>
                <input
                  type="text"
                  name="bdeNumber"
                  value={formData.bdeNumber}
                  onChange={handleInputChange}
                  placeholder="Number"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">SIGNATURE</label>
              <textarea
                name="bdeSignature"
                value={formData.bdeSignature}
                onChange={handleInputChange}
                placeholder="signature"
                rows={3}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* General Officer Commanding or Equivalent */}
        <div>
          <h3 className="text-base font-semibold mb-4">
            d. GENERAL OFFICER COMMANDING OR EQUIVALENT
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">FINDINGS</label>
              <textarea
                name="gocFindings"
                value={formData.gocFindings}
                onChange={handleInputChange}
                placeholder="findings"
                rows={3}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">AWARD</label>
              <input
                type="text"
                name="gocAward"
                value={formData.gocAward}
                onChange={handleInputChange}
                placeholder="Punishable under section"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">RECOMMENDATIONS</label>
              <input
                type="text"
                name="gocRecommendations"
                value={formData.gocRecommendations}
                onChange={handleInputChange}
                placeholder="Punishable under section"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">DATE</label>
                <input
                  type="text"
                  name="gocDate"
                  value={formData.gocDate}
                  onChange={handleInputChange}
                  placeholder="DD/MM/YY"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">RANK</label>
                <select
                  name="gocRank"
                  value={formData.gocRank}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {rankOptions.map((rank) => (
                    <option key={rank} value={rank === 'Rank' ? '' : rank}>
                      {rank}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">NAME</label>
                <input
                  type="text"
                  name="gocName"
                  value={formData.gocName}
                  onChange={handleInputChange}
                  placeholder="Full name"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">NUMBER</label>
                <input
                  type="text"
                  name="gocNumber"
                  value={formData.gocNumber}
                  onChange={handleInputChange}
                  placeholder="Number"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">SIGNATURE</label>
              <textarea
                name="gocSignature"
                value={formData.gocSignature}
                onChange={handleInputChange}
                placeholder="signature"
                rows={3}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="text-base font-semibold mb-4">NOTES</h3>

          <div className="text-sm space-y-2">
            <p>
              <strong>1.</strong> If charge is dismissed or dealt with summarily, enter the space
              provided the decision made eg:
            </p>
            <p className="ml-4">
              <strong>a.</strong> Remanded for further inquiries, remanded for CO
            </p>
            <p className="ml-4">
              <strong>b.</strong> Remanded for ( close/open arrest) for further inquiry
            </p>
            <p className="ml-4">
              <strong>c.</strong> (for summary/abstract of evidence) ( for trial or election
              accused) case referred to high authority)
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={!isEdit}
            className={`font-medium py-3 px-8 rounded transition-colors duration-200 ${
              !isEdit
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-700 text-white'
            }`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
