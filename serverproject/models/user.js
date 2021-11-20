'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ToDo, Token}) {
      // define association here

      this.hasMany(ToDo, {foreignKey: 'userId'})
      this.hasMany(Token, {foreignKey: 'userId'})

    }

                  // никто не хочет чтобы твой реальный индентификатор в бд знали, поэтому мы его скроем
      toJSON(){     //это нужно чтобы скрыть индентификатор то есть id 
      return {...this.get(), id:undefined}
    }
  };
  
  //модель
  User.init({
    //Атрибуты модели определены здесь
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    login: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notNull: {msg: 'User have a login'},   // проверка на отправку нулевых значений которое выводит сообщение об ошибке
        notEmpty:{msg: 'Login must not be empty'}, //проверка на отправку пустой строки
        notIn:[['login', 'user', 'admin']] //проверьте, что значение не является одним из этих
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {msg: 'User have a password'},   
        notEmpty:{msg: 'Password must not be empty'},
        notIn: [['password', 'root', 'admin']]     //проверьте, что значение не является одним из этих
      }
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {msg: 'User have a email'},   
        notEmpty:{msg: 'Email must not be empty'},
        isEmail: {msg: 'Must be a valid email address'} // проверяет формат электронной почты (foo@bar.com)
      }
    },
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};