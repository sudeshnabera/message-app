const ProgressBar = ({ current, stepNames }) => (
  <div className="flex w-full justify-between mb-12 select-none">
    {stepNames.map((name, index) => {
      const stepNum = index + 1;
      const isActive = current >= stepNum;
      const isCompleted = current > stepNum;
      
      return (
        <div key={stepNum} className="flex-1 text-center relative">
          <p 
            className={`text-sm font-medium mb-2 transition-colors duration-200 ${
              isActive ? 'text-[#004953] font-bold' : 'text-gray-500'
            }`}
          >
            {name}
          </p>
          <div className="relative inline-block">
            <div 
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mx-auto font-medium text-sm transition-all duration-200 shadow-md ${
                isActive 
                  ? 'bg-[#004953] text-white border-[#004953] shadow-blue-200' 
                  : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
              }`}
            >
              {isCompleted ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                stepNum
              )}
            </div>
          </div>
          {stepNum < stepNames.length 
          // && (
            // <div 
            //   className={`absolute top-4 right-0 h-1 bg-liner-to-r transition-all duration-300 ${
            //     isActive ? 'bg-[#004953] w-3/4 transform scale-x-100' : 'bg-gray-300 w-3/4 transform scale-x-0'
            //   }`}
            // />
          // )
          }
        </div>
      );
    })}
  </div>
);

export default ProgressBar;
