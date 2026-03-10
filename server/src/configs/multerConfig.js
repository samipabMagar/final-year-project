import multer from "multer";
import fs from "fs";
import path from "path";

// Profile image storage configuration
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/profiles/"),
  filename: (req, file, cb) => {
    const userId = req.user?.id;
    const imageName = `profile_${userId}_${Date.now()}.${file.originalname.split(".").pop()}`;
    cb(null, imageName);
  },
});

// Product images storage configuration
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/products/";
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    const imageName = `product_${uniqueSuffix}${ext}`;
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

// Create multer instances
export const upload = multer({
  storage: profileStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export const productUpload = multer({
  storage: productStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per image
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

// Delete product images
export const deleteProductImages = (imagePaths) => {
  if (Array.isArray(imagePaths)) {
    imagePaths.forEach((imagePath) => {
      if (imagePath) {
        try {
          fs.unlinkSync(imagePath);
        } catch (error) {
          console.error("Failed to delete product image:", error);
        }
      }
    });
  }
};
