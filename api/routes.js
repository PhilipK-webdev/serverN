const express = require("express");
const router = express.Router();
const db = require("../models");
router.get("/api/v1/categories", async (req, res) => {
  try {
    const categoriesWithProducts = await db.Categories.findAll({
      include: [db.Product],
    });

    res.json(categoriesWithProducts);
  } catch (error) {
    console.error("Error retrieving categories with products:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/api/v1/create", async (req, res) => {
  try {
    db.Categories.create({
      category_name: req.body.categoryName,
    });
    res.json({ message: "DONE" });
  } catch (error) {
    console.error("Error retrieving strings:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/api/v1/createProduct", async (req, res) => {
  try {
    const { productName, categoryName } = req.body;

    const [category, created] = await db.Categories.findOrCreate({
      where: { category_name: categoryName },
    });
    const product = await db.Product.create({
      product_value: productName,
      category_id: category.category_id, // Assign the category id to the product's categoryId
    });
    const categoriesWithProducts = await db.Categories.findAll({
      include: [db.Product],
    });

    res.json(categoriesWithProducts);
  } catch (error) {
    console.error("Error retrieving strings:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/api/products", async (req, res) => {
  try {
    const categoryWithProducts = await db.Category.findByPk(1, {
      include: [db.Products],
    });

    if (categoryWithProducts) {
      // Access category and associated products
      res.json({ categoryWithProducts });
    } else {
      console.log(`Category with id ${category_id} not found.`);
    }
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
