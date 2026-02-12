import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import Step1Basic from "./FormSteps/Step1Basic";
import Step2Contact from "./FormSteps/Step2Contact";
import Step3Birth from "./FormSteps/Step3Birth";
import Step4Login from "./FormSteps/Step4Login";
import { useFormSteps } from "../../hooks/useFormSteps.js";
import { useImagePreview } from "../../hooks/useImagePreview.js";
import "./signup.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    username: "",
    password: "",
    profilePhoto: "",
  });

  const {
    currentStep,
    nextStep,
    prevStep,
    stepNames,
    canGoNext,
    handleSubmit,
  } = useFormSteps(formData);
  const { previewImage, imageRef, fileInputRef } = useImagePreview(setFormData);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Basic
            formData={formData}
            updateFormData={updateFormData}
            previewImage={previewImage}
            imageRef={imageRef}
            fileInputRef={fileInputRef}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <Step2Contact formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
        );
      case 3:
        return (
          <Step3Birth formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
        );
      case 4:
        return (
          <Step4Login formData={formData} updateFormData={updateFormData} handleSubmit={handleSubmit} prevStep={prevStep} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8 border border-gray-200 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Signup Form</h1>

      <ProgressBar current={currentStep} stepNames={stepNames} />

      <div className="w-full mt-8 fade-slide-container">
        <div className={`page fade-slide current-step-${currentStep}`}>
          {renderStep()}
        </div>
      </div>

      <div className="mt-8 text-center">
        <a
          href="/login"
          className="text-sm text-gray-600 hover:text-[#004953] font-medium transition-all duration-300 hover:-translate-y-0.5"
        >
          Already have an account?{" "}
          <span className="text-[#004953]-500 font-semibold">Login</span>
        </a>
      </div>
    </div>
  );
};

export default SignupForm;
