import productService from "../services/productService.js";

class ProductController {
  async getAllProducts(req, res) {
    try {
      const filters = {
        category: req.query.category,
        skinType: req.query.skinType,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
        search: req.query.search,
        isActive: req.query.isActive,
        brandId: req.query.brandId,
      };

      const products = await productService.getAllProducts(filters);

      return res.status(200).json({
        success: true,
        message:
          products.length > 0
            ? "Products retrieved successfully"
            : "No products found",
        data: products,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to retrieve products",
      });
    }
  }

  // Create new product (Admin only)
  async createProduct(req, res) {
    try {
      const productData = req.body;

      // Handle uploaded images - normalize paths to use forward slashes
      if (req.files && req.files.length > 0) {
        productData.images = req.files.map((file) => file.path.replace(/\\/g, '/'));
      }

      const newProduct = await productService.createProduct(productData);

      return res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: newProduct,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to create product",
      });
    }
  }
}

export default new ProductController();
