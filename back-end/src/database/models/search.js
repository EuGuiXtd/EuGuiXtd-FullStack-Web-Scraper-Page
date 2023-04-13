const SearchModel = (sequelize, DataTypes) => {
    const Search = sequelize.define('Search', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      search: DataTypes.STRING,
      site: DataTypes.STRING(1234),
      link: DataTypes.STRING(1234),
      price: DataTypes.DECIMAL(10,2),
      image: DataTypes.STRING(1234),
      description: DataTypes.STRING,
    },
    {
        timestamps: false,
        underscored: true,
        force:true,
      },);
  
    return Search;
  };
  
  module.exports = SearchModel;