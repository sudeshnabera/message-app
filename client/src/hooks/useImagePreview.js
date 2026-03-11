import { useCallback, useRef, useEffect, useState } from "react";

export const useImagePreview = (setFormData) => {
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const previewImage = useCallback(
    (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        setFormData((prev) => ({ ...prev, profilePhoto: file }));

        // Use base64 only for preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrl(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    [setFormData],
  );

  // useEffect(() => {
  //   return () => {
  //     if (previewUrl) setPreviewUrl(null);
  //   };
  // }, [previewUrl]);

  return { previewImage, imageRef, fileInputRef, previewUrl };
};
