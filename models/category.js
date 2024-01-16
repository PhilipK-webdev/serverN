module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define("Categories", {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Categories.associate = (models) => {
    Categories.hasMany(models.Product, { foreignKey: "category_id" });
  };
  return Categories;
};
