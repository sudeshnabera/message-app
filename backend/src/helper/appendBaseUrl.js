import "dotenv/config";

const BASE_URL = process.env.BASE_URL;

export const appendBaseUrl = (data, imageFields = ["image"], folder = "") => {
  const fields = Array.isArray(imageFields) ? imageFields : [imageFields];

  const buildUrl = (img) => {
    if (!img || typeof img !== "string") return img;
    if (img.startsWith("http")) return img;

    return `${BASE_URL}/uploads/${folder ? folder + "/" : ""}${img}`;
  };

  const process = (obj) => {
    if (!obj || typeof obj !== "object") return obj;

    const newObj = obj?.toObject ? obj.toObject() : { ...obj };

    fields.forEach((field) => {
      if (!newObj[field]) return;

      if (Array.isArray(newObj[field])) {
        newObj[field] = newObj[field].map(buildUrl);
      } else {
        newObj[field] = buildUrl(newObj[field]);
      }
    });

    // ✅ Only manually handle known nested field
    if (newObj.sharedPost) {
      newObj.sharedPost = process(newObj.sharedPost);
    }

    return newObj;
  };

  return Array.isArray(data) ? data.map(process) : process(data);
};
