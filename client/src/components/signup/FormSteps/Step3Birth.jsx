import React from "react";

const Step3Birth = ({ formData, updateFormData, prevStep, nextStep }) => {
  return (
    <div className="space-y-6">
      {/* <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-left">Contact Info:</h2> */}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => updateFormData({ dob: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004953] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>

          <select
            value={formData.gender}
            onChange={(e) => updateFormData({ gender: e.target.value })}
            className="
                w-full px-4 py-3
                border border-gray-300 rounded-lg
                bg-white text-gray-700
                 focus:ring-[#004953]
                focus:border-transparent
                appearance-none"
                
            >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={prevStep}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-all duration-200"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          className="flex-1 bg-[#004953] hover:bg-[#004953] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3Birth;
