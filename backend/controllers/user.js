const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { Telegraf } = require('telegraf');
const Administrateur = require('../models/Administrateurs.js');

const db = new Sequelize('affichage', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

exports.register = async (req, res) => {
  const { nom, prenom, email, password } = req.body; // Inclure nom et prenom dans la déstructuration
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await Administrateur.create({
      nom: nom,
      prenom: prenom,
      email: email,
      password: hashPassword,
    });

    await sendTelegramMessage(`Nouvel administrateur enregistré :\nNom : ${nom}\nPrénom : ${prenom}\nEmail : ${email}`);

    res.json({ msg: "Enregistrement réussi" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Erreur lors de l'enregistrement" });
  }
};
async function sendTelegramMessage(message) {
  const bot = new Telegraf('6458849292:AAE56GnbgRMS6kCGupexgY8yA7e79L69WxE'); 
  const chatId = '-4002352341'; 

  try {
    await bot.telegram.sendMessage(chatId, message);
  } catch (error) {
    console.error("Erreur lors de l'envoi du message Telegram:", error);
  }
}