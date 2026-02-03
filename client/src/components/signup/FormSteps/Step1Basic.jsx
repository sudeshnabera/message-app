const Step1Basic = ({ formData, updateFormData, previewImage, imageRef, fileInputRef, nextStep }) => (
  <div className="space-y-6">
    <div className="text-left">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Basic Info:</h2>
    </div>
    
    <label 
      htmlFor="file-input" 
      className="flex flex-col items-center gap-3 cursor-pointer group"
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        id="file-input" 
        type="file" 
        ref={fileInputRef}
        onChange={previewImage}
        className="hidden"
        accept="image/*"
      />
      <img 
        ref={imageRef}
        src={formData.profilePhoto}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover border-4 border-[#004953] hover:border-8 transition-all duration-200 shadow-lg hover:shadow-xl group-hover:scale-105"
      />
      <p className="text-sm text-gray-600 group-hover:text-[#004953] transition-colors">Click to upload</p>
    </label>

    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
        <input 
          type="text" 
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004953] focus:border-transparent transition-all duration-200"
          placeholder="Enter your full name"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
        <input 
          type="text" 
          value={formData.bio}
          onChange={(e) => updateFormData({ bio: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004953] focus:border-transparent transition-all duration-200"
          placeholder="Tell us about yourself"
        />
      </div>
    </div>

    <button 
       onClick={nextStep}
      className="w-full bg-[#004953] hover:bg-[#004953] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
    >
      Next
    </button>
  </div>
);

export default Step1Basic;
