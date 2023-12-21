const { DataTypes } = require('sequelize');
const db = require('../config/DataBase.js');

const Administrateur = db.define('Administrateurs', {
    id_adm: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false // Vous pouvez ajuster ceci en fonction de vos besoins
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false // Vous pouvez ajuster ceci en fonction de vos besoins
    },
    email: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

module.exports = Administrateur;
