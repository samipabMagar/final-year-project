import { Op } from "sequelize";
import connection from "../configs/db.js";
import productModel from "../models/productModel.js";
import brandModel from "../models/brandModel.js";

class ProductService {
  async getAllProducts(filters = {}) {
    const {
      category,
      skinType,
      minPrice,
      maxPrice,
      search,
      isActive,
      brandId,
    } = filters;
    const whereClause = {};

    if (category) {
      whereClause.category = category;
    }

    if (brandId) {
      whereClause.brand_id = brandId;
    }

    if (skinType) {
      whereClause[Op.and] = connection.literal(
        `JSON_CONTAINS(skin_type, "${skinType}")`,
      );
    }

    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price[Op.gte] = minPrice;
      if (maxPrice) whereClause.price[Op.lte] = maxPrice;
    }

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { ingredients: { [Op.like]: `%${search}%` } },
      ];
    }
    if (isActive !== undefined) {
      whereClause.is_active = isActive;
    }

    const products = await productModel.findAll({
      where: whereClause,
      include: [
        {
          model: brandModel,
          as: "brand",
          attributes: ["brand_id", "name", "logo_url"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    return products;
  }

  async createProduct(productData) {
    const newProduct = await productModel.create(productData);
    return newProduct;
  }

  async updateProduct(productId, updateData) {
    const product = await productModel.findByPk(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    await product.update(updateData);

    return product;
  }

  async deleteProduct(productId) {
    const product = await productModel.findByPk(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    await product.destroy();

    return { message: "Product deleted successfully" };
  }
}

export default new ProductService();
