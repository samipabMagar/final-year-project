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

  async updateBrand(req, res){
    try {
      const brand = await brandService.updateBrand(req.params.id, req.body);

      return res.status(200).json({
        success: true,
        message: "Brand updated successfully",
        data:  brand,
      })
    } catch(error){
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to update brand",
      })
    }
  }
}

export default new BrandController();
