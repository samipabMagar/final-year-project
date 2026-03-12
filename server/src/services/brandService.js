import brandModel from "../models/brandModel.js";

class BrandService {
  async createBrand(brandData) {
    const existingBrand = await brandModel.findOne({
      where: { name: brandData.name },
    });

    if (existingBrand) {
      throw new Error("Brand with this name already exists");
    }

    const brand = await brandModel.create(brandData);
    return brand;
  }

  async updateBrand(id, brandData) {
    const brand = await brandModel.findByPk(id);

    if (!brand) {
      throw new Error("Brand not found");
    }

    if (brandData.name && brandData.name !== brand.name) {
      const existingBrand = await brandModel.findOne({
        where: { name: brandData.name },
      });

      if(existingBrand){
        throw new Error("Brand with this name already exists");
      }
    }

    await brand.update(brandData);
    return brand;
  }
}

export default new BrandService();
