require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');

const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const delimiter = '!';
const texts = require('./stringResources.json');

var settings = {};

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  settings = require('./settings.json');
});

bot.on('message', msg => {

  if (msg.content.startsWith(delimiter)) {
    var str = msg.content.toLowerCase().substring(1);
    var args = msg.content.toLowerCase().substring(1).split(" ");
    if (args == undefined || args[0] == null || args[0] == undefined) {
      sendDenyText(msg);
      return;
    }
    try {
      switch (args[0]) {
        case ('a'):
        case ('am'):
        case ('addmeeting'):
          break;


        case ('art'):
        case ('addticket'):

          break;
        case ('crt'):
        case ('check'):
        case ('checktickets'):

          break;

        case ('h'):
        case ('help'):
          msg.channel.send(texts.helpText);
          break;

        case ('l'):
        case ('leaderboard'):
          break;

        case ('n'):
        case ('next'):
        case ('nextmeeting'):

          break;
        case ('s'):
        case ('set'):
        case ('setalert'):
          if (args[0] != null) {
            if (parseInt(args[1]) == undefined || parseInt(args[1]) > 1111 || parseInt(args[1]) <= 0000) {
              sendDenyText(msg);
              break;
            }
            settings.alerts = args[1];
            settings.alertText = getAlertText(args[1]);

            console.log(settings);

            write(settings);
            msg.channel.send(settings.alertText);
          } else
            sendDenyText(msg);
          break;
        case ('p'):
        case ('poll'):
          msg.channel.send("poll handling");

          break;

      };
    }
    catch (error) {             
      sendDenyText(msg);
    }
  }
});

function sendDenyText(msg) {
  msg.channel.send(texts.denyText);
}

function getAlertText(alerts) {
  var alertText = texts.alertText0;
  var daysBefore = "";

  if (alerts[0] != 0) { daysBefore += "8 "; }
  if (alerts[1] != 0) { daysBefore += "4 "; }
  if (alerts[2] != 0) { daysBefore += "2 "; }
  if (alerts[3] != 0) { daysBefore += "1"; }

  return alertText + daysBefore + " day(s) before the next meeting!";

}

// function writeSettings(name,content) {
//   console.log(name +"," + content);
//   var obj = fs.readFile('/settings.json',(err)=>({if(err){console.log(err)}}));
//   console.log(fs.readdir());
//   obj[name] =content;
//   fs.writeFile('/settings.json', obj, (err) => ({ if(err) { console.log(err) } }));
// }



// function read() {
//   fs.readFile('./settings.json', 'utf8', (err, jsonString) => {
//     if (err) {
//       console.log("File read failed:", err)
//       return
//     }
//     console.log('File data:', jsonString)
//     return jsonString;
//   })
// }
function write(jsonString) {
  fs.writeFile('./settings.json', JSON.stringify(jsonString, null, 2), err => {
    if (err) {
      console.log('Error writing to settings file', err)
    } else {
      console.log('Successfully wrote to settings file')
    }
  })
}