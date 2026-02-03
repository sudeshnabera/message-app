import { useCallback, useRef } from 'react';

export const useImagePreview = (setFormData) => {
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);

  const previewImage = useCallback((event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, profilePhoto: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  }, [setFormData]);

  return { previewImage, imageRef, fileInputRef };
};
