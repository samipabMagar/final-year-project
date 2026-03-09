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
        message: products.length > 0 ? "Products retrieved successfully" : "No products found",
        data: products,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to retrieve products",
      });
    }
  }
}

export default new ProductController();
