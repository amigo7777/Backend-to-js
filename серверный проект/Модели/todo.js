'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      // userId
      this.belongsTo(User, {foreignKey: 'userId'}) // здесь создается связ или ассоциация к таблице User


    }
  };
  ToDo.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    tittle: {
      type: DataTypes.STRING,
      allowNull: false
  },
    description: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: 'todos',
    modelName: 'ToDo',
  });
  return ToDo;
};
