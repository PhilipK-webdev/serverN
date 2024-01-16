module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_value: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categories",
        key: "category_id",
      },
    },
  });
  Product.associate = (models) => {
    Product.belongsTo(models.Categories, {
      foreignKey: "category_id",
      onDelete: "CASCADE", // Delete products associated with the category when the category is deleted
    });
  };

  return Product;
};
