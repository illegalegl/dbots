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
      case('a'):
      case('am'):
      case('addmeeting'):
      break;

      case('art'):
      case('addticket'):

      break;
      case('crt'):
      case('check'):
      case('checktickets'):

      break;

      case('h'):
      case('help'):
          msg.channel.send(texts.helpText);
      break;

      case('l'):
      case('leaderboard'):
      break;

      case('n'):
      case('next'):
      case('nextmeeting'):

      break;
      case('s'):
      case('set'):
      case('setalert'):

      break;
      case('p'):
      case('poll'):
      

      break;

    };
  }
});
