"use strict";

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Document extends Model {
    static associate(models) {
      Document.belongsTo(models.User);
    }
  }

  Document.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER,
      },
      fileName: DataTypes.STRING,
      fileURL: DataTypes.STRING,
      status: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Document",
    }
  );
  return Document;
};
