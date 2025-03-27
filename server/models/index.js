'use strict';
// Importera Sequelize och datatyper
const { Sequelize, DataTypes } = require('sequelize');

const fs = require('fs');
const path = require('path');
// const Sequelize = require('sequelize');
const process = require('process');
const { on } = require( 'events' );
const basename = path.basename(__filename); // Filnamnet för den aktuella filen
const env = process.env.NODE_ENV || 'development'; // Använd miljövariabel eller default till 'development'
const config = require(__dirname + '/../config/config.json')[env]; // Hämta databasinställningar från konfigurationsfilen
const db = {}; // Objekt för att lagra databasmodeller

let sequelize;
// Skapa en ny Sequelize-instans beroende på om en miljövariabel används
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Läser in alla modellfiler i denna katalog och laddar dem i db-objektet
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && // Ignorera dolda filer
      file !== basename && // Ignorera denna fil (index.js)
      file.slice(-3) === '.js' && // Endast .js-filer
      file.indexOf('.test.js') === -1 // Ignorera testfiler
    );
  })
  .forEach(file => {
    // Importera varje modell och koppla den till Sequelize-instansen
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Koppla samman modeller om associationer definieras
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.User = require('./user')(sequelize, DataTypes);
db.Product = require('./product')(sequelize, DataTypes);
db.Cart = require('./cart')(sequelize, DataTypes);
db.CartRow = require('./cartRow')(sequelize, DataTypes);
db.Rating = require('./rating')(sequelize, DataTypes);

// User → Cart (1:M)
db.User.hasMany(db.Cart, { foreignKey: 'user_id', as: 'carts', onDelete: 'CASCADE' });
db.Cart.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });

// User → Rating (1:M)
db.User.hasMany(db.Rating, { foreignKey: 'user_id', as: 'ratings' });
db.Rating.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });

// Cart → CartRow (1:M)
db.Cart.hasMany(db.CartRow, { foreignKey: 'cart_id', as: 'rows', onDelete: 'CASCADE' });
db.CartRow.belongsTo(db.Cart, { foreignKey: 'cart_id', as: 'cart' });

// Product → CartRow (1:M)
db.Product.hasMany(db.CartRow, { foreignKey: 'product_id', as: 'cart_rows', onDelete: 'CASCADE' });
db.CartRow.belongsTo(db.Product, { foreignKey: 'product_id', as: 'product' });

// Product → Rating (1:M)
db.Product.hasMany(db.Rating, { foreignKey: 'product_id', as: 'ratings', onDelete: 'CASCADE' });
db.Rating.belongsTo(db.Product, { foreignKey: 'product_id', as: 'product' });

// Lagra Sequelize-instansen och klassen i db-objektet
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Exportera db-objektet för att kunna användas i resten av applikationen
module.exports = db;