module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Cart', {
    // Unikt ID för varukorgen, autoinkrementeras och är primärnyckel
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Indikerar om varukorgen är betald (true) eller obetald (false)
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // Referens till användaren som äger varukorgen
    user_id: {
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
