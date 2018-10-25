module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
      burger: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
  
      devoured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    });
    return Burger;
  };
  