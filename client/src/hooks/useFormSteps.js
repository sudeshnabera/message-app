import { useState, useCallback } from 'react';
import { registerUser } from '../services/auth.services.js';


export const useFormSteps = (formData) => {
  const [currentStep, setCurrentStep] = useState(1);
  const stepNames = ['Name', 'Contact', 'Birth', 'Submit'];

  const nextStep = useCallback(() => {
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  }, [currentStep]);

  const canGoNext = () => {
    switch (currentStep) {
      case 1: return formData.name.trim();
      case 2: return formData.email.trim() && formData.phone.trim();
      case 3: return formData.dob && formData.gender;
      case 4: return formData.username.trim() && formData.password.trim();
      default: return true;
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await registerUser(formData);
      alert('Sign up successful!');
      localStorage.setItem('token', res.data.token);
      window.location.href = '/login';
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Sign up failed!');
    }
  };

  return { currentStep, nextStep, prevStep, stepNames, canGoNext, handleSubmit };
};
