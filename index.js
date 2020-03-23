require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');

const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const delimiter = '!';
const texts = require('./stringResources.json');
const settingsFile = './settings.json';
const meetingsFile = './meetings.txt';


var settings = {};

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  settings = require(settingsFile);
});

bot.on('message', msg => {

  if (msg.content.startsWith(delimiter)) {
    var str = msg.content.toLowerCase().substring(1);
    var args = msg.content.toLowerCase().substring(1).split(" ");

    try {
      console.log(args);
      switch (args[0]) {

        case ('a'):
        case ('am'):
        case ('add'):
        case ('addmeeting'):

          if (() => { checkParams(args, 2) }) {

            var dateReg = /^\d{2}[./-/\\/\/]\d{2}[./-/\\/\/]\d{2}$/

            if (args[1].match(dateReg) == false || parseInt(args[1].substring(args[1].length - 2)) < 20) {
              msg.channel.send("Please add a future meeting in mm/dd/yy format!");
              break;
            }

            if (args[2] == undefined) {
              sendDenyText(msg);
              break;
            }

            var meetingDate = args[1];
            var meetingTime = args[2];
            write(meetingsFile, meetingDate + " at " + meetingTime, true);
            msg.channel.send("The next meeting is set for " + meetingDate + " at " + meetingTime);
            break;
          }
          sendDenyText(msg);
          break;

        case ('alerts'):
          msg.channel.send(settings.alertText);
          break;

        case ('art'):
        case ('addticket'):

        var today = Date.now();
        
        if(args[1]!=null){

        

          break;
        }
        write("./users/"+msg.author.username, today )

          break;
        case ('b'):
        case ('book'):

          var bookTitle = "";
          var i = 1;
          while (args[i] != undefined) {
            bookTitle += args[i++] + " ";
          }
          settings.currentBook = bookTitle.trim();

          write(settingsFile, settings, false);
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

          fs.readFile(meetingsFile, function(err, data) {
            if(err) throw err;
            var array = data.toString().split("\n");
                msg.channel.send("The next meeting will be on " + array[array.length-2]);
            
        });
          break;
        case ('s'):
        case ('set'):
        case ('setalert'):
          if (() => { checkParams(args, 1) }) {
            if (parseInt(args[1]) > 1111 || parseInt(args[1]) <= 0000) {
              sendDenyText(msg);
              break;
            }
            settings.alerts = args[1];
            settings.alertText = getAlertText(args[1]);

            console.log(settings);

            write(settingsFile, settings, false);
            msg.channel.send(settings.alertText);
            break;
          }
          sendDenyText(msg);
          break;
        case ('p'):
        case ('poll'):
          msg.channel.send("poll handling");

          break;

      };
    }
    catch (error) {
      console.log(error);
      sendDenyText(msg);
    }
  }
});

function checkParams(args, num) {
  () => {
    var i = 0;
    console.log(args + "," + num);
    if (args == null || args == undefined) {
      return true;
    }

    for (i = 0; i <= num; i++) {
      if (args[i] == undefined || args[i] == null) {
        return false;
      }
    }
    return true;
  }
}


function sendDenyText(msg) {
  msg.channel.send(texts.denyText);
}

function getAlertText(alerts) {
  var alertText = texts.alertText0;
  var daysBefore = "";

  if (alerts[0] != 0) { daysBefore += "8, "; }
  if (alerts[1] != 0) { daysBefore += "4, "; }
  if (alerts[2] != 0) { daysBefore += "2, "; }
  if (alerts[3] != 0) { daysBefore += "1"; }

  return alertText + daysBefore + " day(s) before the next meeting!";

}


//  function read(filename) {
//   try{
//   return fs.readFile(filename, 'utf8', (err, jsonString) => {
//       if (err) {
//         console.log("File read failed:", err);
//         return;
//       }
//       console.log('File data:\n', jsonString);
//       return jsonString;
//     })}catch(error){}
// }


function write(filename, content, append) {
  var val = content;

  if (filename.indexOf('json') > -1) { val = JSON.stringify(content, null, 2); }

  if (append == true) {
    fs.appendFile(filename, val + "\n", err => {
      if (err) {
        console.log('Error appending to file: ' + filename, err)
      } else {
        console.log('Successfully appended to file: ' + filename)
      }
    })
  } else {
    fs.writeFile(filename, val, err => {
      if (err) {
        console.log('Error writing to file: ' + filename, err)
      } else {
        console.log('Successfully wrote to file: ' + filename)
      }
    })
  }
}