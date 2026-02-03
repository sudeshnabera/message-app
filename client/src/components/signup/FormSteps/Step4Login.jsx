import React from 'react'

const Step4Login = ({ formData, updateFormData, prevStep, handleSubmit }) => {
  return (
     <div className="space-y-6">
    {/* <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-left">Contact Info:</h2> */}
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
        <input 
          type="text" 
          value={formData.username}
          onChange={(e) => updateFormData({ email: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004953] focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <input 
          type="password" 
          value={formData.password}
          onChange={(e) => updateFormData({ phone: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004953] focus:border-transparent"
        />
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
        onClick={handleSubmit}
        className="flex-1 bg-[#004953] hover:bg-[#004953] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Submit
      </button>
    </div>
  </div>
  )
}

export default Step4Login