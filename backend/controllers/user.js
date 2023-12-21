const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const { Telegraf, Markup } = require('telegraf');
const Administrateur = require('../models/Administrateurs.js');

const db = new Sequelize('telegram', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const botToken = '6458849292:AAE56GnbgRMS6kCGupexgY8yA7e79L69WxE'; // Remplacez par le token de votre bot
const bot = new Telegraf(botToken);

// Commande /start
bot.start((ctx) => {
  // Création du clavier en ligne avec un bouton "Registre"
  const keyboard = Markup.inlineKeyboard([
    Markup.button.callback('Registre', 'register'),
    Markup.button.url('Visitez notre site web', 'http://example.com'),
  ]);

  // Envoi du message avec le clavier en ligne
  ctx.reply('Bienvenue ! Choisissez une action :', keyboard);
});

// Gestionnaire de bouton "Registre"
bot.action('register', (ctx) => {
  ctx.reply('Veuillez fournir les informations nécessaires pour l\'enregistrement (nom, prénom, email, mot de passe).');
});

// Gestionnaire de texte pour l'enregistrement de l'administrateur
bot.on('text', async (ctx) => {
  const { text } = ctx.message;
  const [nom, prenom, email, password] = text.split(' ');

  if (nom && prenom && email && password) {
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

      ctx.reply('Enregistrement réussi!');
    } catch (error) {
      console.error(error);
      ctx.reply('Erreur lors de l\'enregistrement.');
    }
  } else {
    ctx.reply('Veuillez fournir toutes les informations nécessaires.');
  }
});

async function sendTelegramMessage(message) {
  const chatId = '-4002352341';

  try {
    await bot.telegram.sendMessage(chatId, message);
  } catch (error) {
    console.error("Erreur lors de l'envoi du message Telegram:", error);
  }
}


bot.launch();
