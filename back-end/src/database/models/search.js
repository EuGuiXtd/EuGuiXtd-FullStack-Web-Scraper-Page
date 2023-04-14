module.exports = (sequelize, DataTypes) => {
  const Search = sequelize.define(
    "Search",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      search: DataTypes.STRING,
      category: DataTypes.STRING,
      site: DataTypes.STRING(1234),
      link: DataTypes.STRING(1234),
      price: DataTypes.STRING,
      image: DataTypes.STRING(1234),
      description: DataTypes.STRING,
    },
    {
      timestamps: false,
      underscored: true,
      force: true,
    }
  );

  return Search;
};
