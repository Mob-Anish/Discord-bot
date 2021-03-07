// Nodejs module inorder to interact with discord api
const Discord = require('discord.js');
const {prefix, BOT_TOKEN, channel_id} = require('./config.json');
const commandOne = require('./command/execute');
const commandTwo = require('./command/reply');
const commandThree = require('./command/skip');
const commandFour = require('./command/stop');

// It interact with Discord api.
const Bot = new Discord.Client();

// Queue for storing songs
const queue = new Map();

// client start working
Bot.once('ready', () => {
  console.log('Ready as ' + Bot.user.tag);

  // bot user's activity
  Bot.user.setActivity('your Message', {type: 'WATCHING'});

  // Bot may be connected to different server like guilds  console.log(bot.guilds);
  // So u want the bot to welcome once it become online.
  // There may be diff. channels on discord.
  Bot.channels
    .fetch(channel_id)
    .then((channel) =>
      channel.send(`Hello my gorgeous friend on the internet!`)
    )
    .catch(console.error);
});

// bot listening to the message.
Bot.on('message', (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverStack = queue.get(message.guild.id);

  // like !ping => ! is prefix and ping is command name
  const commandBody = message.content.slice(prefix.length);
  const command = commandBody.toLowerCase();

  // Editing the music commands
  const args = message.content.split(' ');
  const musicCom = args[0].slice(prefix.length);
  const com = musicCom.toLocaleLowerCase();

  // TimeStamp
  const timeTaken = Date.now() - message.createdTimestamp;

  if (command === 'ping') return message.reply(`Hey, This message had a latency of ${timeTaken}ms.`);
  if (command === 'my avatar?') return message.reply(message.author.displayAvatarURL());
  if (com === 'play') return commandOne.execute(message, args, serverStack, queue);
  if (command === 'hi') return commandTwo.reply(message);
  if (com === 'skip') return commandThree.skip(message, serverStack);
  if (com === 'stop') return commandFour.stop(message, serverStack);
  if (command || com) return message.reply('Bruh that command is not in my fort!!');
});

// Connecting to the bot using tokens
Bot.login(BOT_TOKEN);
