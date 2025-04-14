module.exports = (sequelize, DataTypes) => {
    return sequelize.define('CartRow', {
      // Unikt ID för varje rad i varukorgen, autoinkrementeras och är primärnyckel
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // Antal av produkten i varukorgen
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      // Referens till produkten som lagts till i varukorgen
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      // Referens till vilken varukorg raden tillhör
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      // Skapar timestamps (created_at, updated_at) automatiskt
      timestamps: true,
      // Använder understrykning i kolumnnamn istället för camelCase
      underscored: true
    });

  };