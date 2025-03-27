module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    // Unikt ID för användaren, autoinkrementeras och är primärnyckel
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Användarens förnamn, får inte vara null
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Användarens efternamn, får inte vara null
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Användarens e-postadress, måste vara unik och i korrekt e-postformat
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // Användarens lösenord, får inte vara null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true, // Skapar timestamps (created_at, updated_at) automatiskt
    underscored: true // Använder understrykning i kolumnnamn istället för camelCase
  });
};
