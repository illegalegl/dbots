require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const delimiter = '!';
const texts = require('./stringResources.json');

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
if (msg.content.startsWith(delimiter)) {
    switch(msg.content.toLowerCase().substring(1)){
      case('h'):
      case('help'):
          msg.channel.send(texts.helpText);
      break;
    };
  }
});
