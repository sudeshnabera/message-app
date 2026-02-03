const Step2Contact = ({ formData, updateFormData,prevStep, nextStep }) => (
  <div className="space-y-6">
    {/* <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-left">Contact Info:</h2> */}
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <input 
          type="email" 
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004953] focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
        <input 
          type="tel" 
          value={formData.phone}
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
        onClick={nextStep}
        className="flex-1 bg-[#004953] hover:bg-[#004953] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Next
      </button>
    </div>
  </div>
);

export default Step2Contact;
