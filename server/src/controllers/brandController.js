import brandService from "../services/brandService.js";

class BrandController {
  async createBrand(req, res) {
    try {
      const brand = await brandService.createBrand(req.body);

      return res.status(201).json({
        success: true,
        message: "Brand created successfully",
        data: brand,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to create brand",
      });
    }
  }
}

export default new BrandController();
