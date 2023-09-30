"use strict";

module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define("Document", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    fileId: DataTypes.STRING,
    fileName: DataTypes.STRING,
    fileURL: DataTypes.STRING,
    fileSize: DataTypes.FLOAT,
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  });

  Document.associate = (models) => {
    Document.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Document;
};
