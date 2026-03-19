const getFirstImagePath = (images) => {
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

const resolveImageUrl = (imagePath) => {
  if (!imagePath) return null;

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api";
  const apiOrigin = apiBaseUrl.replace(/\/api\/?$/, "");

  let normalizedPath = imagePath.replace(/\\/g, "/");
  const uploadsIndex = normalizedPath.toLowerCase().indexOf("uploads/");

  if (uploadsIndex >= 0) {
    normalizedPath = normalizedPath.slice(uploadsIndex);
  }

  const cleanedPath = normalizedPath.replace(/^\/+/, "");
  return `${apiOrigin}/${cleanedPath}`;
};

const formatCategory = (category = "") => {
  return category
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const ProductCard = ({ product }) => {
  const imagePath = getFirstImagePath(product.images);
  const imageUrl = resolveImageUrl(imagePath);

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative mb-4 overflow-hidden rounded-xl bg-slate-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-52 items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 text-sm font-medium text-slate-500">
            No image
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
          {formatCategory(product.category)}
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="line-clamp-1 text-base font-semibold text-slate-900">
          {product.name}
        </h3>
        <p className="line-clamp-2 min-h-10 text-sm text-slate-600">
          {product.description || "No description available"}
        </p>

        <div className="flex items-center justify-between pt-1">
          <p className="text-lg font-bold text-[#2FA4A9]">Rs {Number(product.price).toFixed(2)}</p>
          <p className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
            Rating: {product.rating ?? 0}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{product.brand?.name || "No brand"}</span>
          <span>Stock: {product.stock_quantity ?? 0}</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
