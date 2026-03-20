export const getFirstImagePath = (images) => {
  if (!images) return null;

  if (Array.isArray(images)) {
    return images[0] || null;
  }

  if (typeof images === "string") {
    try {
      const parsed = JSON.parse(images);
      if (Array.isArray(parsed)) {
        return parsed[0] || null;
      }
    } catch {
      return images;
    }

    return images;
  }

  return null;
};

export const resolveImageUrl = (imagePath) => {
  if (!imagePath) return null;

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
  const apiOrigin = apiBaseUrl.replace(/\/api\/?$/, "");

  let normalizedPath = imagePath.replace(/\\/g, "/");
  const uploadsIndex = normalizedPath.toLowerCase().indexOf("uploads/");

  if (uploadsIndex >= 0) {
    normalizedPath = normalizedPath.slice(uploadsIndex);
  }

  const cleanedPath = normalizedPath.replace(/^\/+/, "");
  return `${apiOrigin}/${cleanedPath}`;
};

export const formatCategory = (category = "") => {
  return category
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};
