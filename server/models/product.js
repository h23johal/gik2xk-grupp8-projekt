module.exports = (sequelize, DataTypes) => {
  return sequelize.define('product', {
    // Unikt ID för produkten, autoinkrementeras och är primärnyckel
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Produktens titel, får inte vara null
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Beskrivning av produkten (valfritt fält)
    description: {
      type: DataTypes.STRING
    },
    // Produktens pris, får inte vara null och måste vara i decimalformat
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        isDecimal: true,
        // Anpassad validering för att säkerställa korrekt prisformat (två decimaler)
        isValidPriceFormat(value) {
          if (!/^\d+(\.\d{2})$/.test(value.toString())) {
            throw new Error('Pris måste ha formatet *.** (t.ex. 9.99)');
          }
        }
      }
    },
    // Anpassad validering för att kontrollera att URL:en pekar på en bildfil
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
    paranoid: true, // Aktiverar "soft delete", vilket innebär att poster markeras som raderade istället för att tas bort helt
    timestamps: true, // Lägger automatiskt till created_at och updated_at
    underscored: true // Använder understrykning i kolumnnamn istället för camelCase
  });
};
