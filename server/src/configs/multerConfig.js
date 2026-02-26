import multer from "multer";
import fs from "fs";

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/profiles/"),
  filename: (req, file, cb) => {
    const userId = req.user?.id;
    const imageName = `profile_${userId}_${Date.now()}.${file.originalname.split(".").pop()}`;
    cb(null, imageName);
  },
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Create the multer instance
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Delete old profile image
export const deleteOldImage = (imagePath) => {
    if(imagePath) {
        try {
            fs.unlinkSync(imagePath);
        }catch (error) {
            console.error("Failed to delete old image:", error);
        }
    }
};
