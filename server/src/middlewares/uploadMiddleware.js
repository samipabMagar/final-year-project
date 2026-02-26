// Middleware to handle multer errors
export const handleUploadError = (err, req, res, next) => {
  if (err) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size too large. Maximum size is 5MB.",
      });
    }

    if (
      err.message === "Only image files are allowed (jpeg, jpg, png, gif, webp)"
    ) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message || "Error uploading file",
    });
  }
  next();
};
