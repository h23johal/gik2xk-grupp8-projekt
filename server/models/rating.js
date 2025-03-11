module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Rating', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      rating: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      timestamps: true,
      tableName: 'ratings',
      underscored: true
    });
  };
  