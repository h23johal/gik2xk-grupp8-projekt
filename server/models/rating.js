module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Rating', {
    // Unikt ID för betyget, autoinkrementeras och är primärnyckel
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Själva betyget (exempelvis 1-5 stjärnor), får inte vara null
    rating: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    // Valfri kommentar som användaren kan lämna tillsammans med betyget
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    // ID för produkten som betyget tillhör
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // ID för användaren som lämnar betyget (kan vara null om anonymt)
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Indikerar om betyget lämnades anonymt (true/false), standardvärde är false
    anonymous: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    timestamps: true, // Skapar timestamps (created_at, updated_at) automatiskt
    underscored: true // Använder understrykning i kolumnnamn istället för camelCase
  });
};