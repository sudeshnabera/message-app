import multer from "multer";
import path from "path";
import fs from "fs";

export function photoUpload(targetFolder) {
  const uploadPath = path.join(process.cwd(), "src", "uploads", targetFolder);

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      const uniqueName = `${formattedDate}-${Math.round(
        Math.random() * 1e9
      )}${path.extname(file.originalname)}`;

      cb(null, uniqueName);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (
      ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
        file.mimetype
      )
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  });
}
