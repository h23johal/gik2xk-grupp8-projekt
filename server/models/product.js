module.exports = (sequelize, DataTypes) => {
  return sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        isDecimal: true,
        isValidPriceFormat(value) {
          if (!/^\d+(\.\d{2})$/.test(value.toString())) {
            throw new Error('Pris måste ha formatet *.** (t.ex. 9.99)');
          }
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: "Sökvägen måste vara en giltig URL till en bild"
        },
        isImageUrl(value) {
          if (!/\.(jpeg|jpg|gif|png|webp|svg)$/i.test(value)) {
            throw new Error('URL:en måste länka till en bild (jpeg, jpg, gif, png, webp, svg)');
          }
        }
      }
    }
  }, {
    paranoid: true, //soft delete
    timestamps: true,
    underscored: true
  });
};
