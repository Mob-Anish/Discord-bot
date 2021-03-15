
// Import environment config
const {prefix, BOT_TOKEN, channel_id} = require('./config.json')

// Build global initiator
const G = {
    discord: new require(`discord.js`).Client(),
    command: {
        execute: require(`./command/execute`),
        reply: require(`./command/reply`),
        skip: require(`./command/skip`),
        stop: require(`./command/stop`)
    },
    queue = new Map()
}


// client start working
G.discord.once('ready', () => {

    console.log('Ready as ' + G.discord.user.tag)

    // G.discord user's activity
    G.discord.user.setActivity('your Message', {type: 'WATCHING'})

        // G.discord may be connected to different server like guilds  console.log(G.discord.guilds);
        // So u want the G.discord to welcome once it become online.
        // There may be diff. channels on discord.
        G.discord.channels
            .fetch(channel_id)
            .then((channel) =>
                channel.send(`Hello my gorgeous friend on the internet!`)
            )
            .catch(console.error)
})


// G.discord listening to the message.
G.discord.on('message', (message) => {

    // Content filter
    if (message.author.G.discord) return
    if (!message.content.startsWith(prefix)) return

    const serverStack = queue.get(message.guild.id)

    // like !ping => ! is prefix and ping is command name
    const commandBody = message.content.slice(prefix.length)
    const command = commandBody.toLowerCase()

    // Editing the music commands
    const args = message.content.split(' ')
    const musicCom = args[0].slice(prefix.length)
    const com = musicCom.toLocaleLowerCase()

    // TimeStamp
    const timeTaken = Date.now() - message.createdTimestamp

    // Command handler
    switch (command) {
        case `ping`: return message.reply(`Hey, This message had a latency of ${timeTaken}ms.`)
        case `my avatar?`: return message.reply(message.author.displayAvatarURL())
        case `hi`: return commandTwo.reply(message)
    }

    // Comm handler
    switch (com) {
        case `play`: return commandOne.execute(message, args, serverStack, queue)
        case `skip`: return commandThree.skip(message, serverStack)
        case `stop`: return commandFour.stop(message, serverStack)
    }

    // Return unknown command error
    if (command || com) return message.reply('Bruh that command is not in my fort!!')

});

// Connecting to the G.discord using tokens
G.discord.login(BOT_TOKEN)
