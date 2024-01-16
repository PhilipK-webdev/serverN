const express = require("express");
const router = express.Router();
const db = require("../models");
router.get("/api/v1/categories", async (req, res) => {
  try {
    const categoriesWithProducts = await db.Category.findAll({
      include: [db.Products],
    });

    res.json(categoriesWithProducts);
  } catch (error) {
    console.error("Error retrieving categories with products:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/api/create", async (req, res) => {
  try {
    db.Category.create({
      category_name: req.body.categoryName,
    });
    res.json({ message: "DONE" });
  } catch (error) {
    console.error("Error retrieving strings:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/api/createProduct", async (req, res) => {
  try {
    const { productName, categoryName } = req.body;

    const [category, created] = await db.Category.findOrCreate({
      where: { category_name: categoryName },
    });
    console.log("id=>", category.dataValues.category_id);
    const product = await db.Products.create({
      product_value: productName,
      category_id: category.category_id, // Assign the category id to the product's categoryId
    });

    res.json({ message: "Product created successfully", product });
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
router.post("/api/v1/create", async (req, res) => {
  try {
    const data = req.body;
    console.log("Data", data);
    res.json({ key: "YEAHHHH" });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
