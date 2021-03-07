const ytdl = require('ytdl-core'); // =>ytdl library which gets the song information from the youtube link
const execute = require('./play');

// Execution before play function
exports.execute = async (message, args, serverStack, queue) => {
  try {
    // Voice Channel
    const voiceChannel = message.member.voice.channel;

    // No name
    if (!args[1]) return message.reply('Oops! you need to provide the link');

    // Not present in voice channel
    if (!voiceChannel)
      return message.channel.send(
        'Oops! you need to be in a voice channel to play music '
      );

    // Getting Song Info using ytdl.
    const songData = await ytdl.getInfo(args[1]);
    const song = {
      title: songData.videoDetails.title,
      url: songData.videoDetails.video_url,
    };

    // If ServerQueue is empty, add song to the queue and play
    // If not add the song to existing serverQueue and send a success message
    if (!serverStack) {
      // Creating the construct for our queue
      const queueStack = {
        voiceChannel,
        connection: null,
        songs: [],
      };
      // Setting the queue using construct
      queue.set(message.guild.id, queueStack);
      // Pushing the song object to our songs array in queueConstruct
      queueStack.songs.push(song);

      try {
        // Here the bot join the voice channel
        var connection = await voiceChannel.join();
        queueStack.connection = connection;
        // Now calling the play function to play the song of queue.
        execute.play(message, queueStack.songs[0], queue);
      } catch (err) {
        // If the bot fails to join the voiceChat
        queue.delete(message.guild.id);
        console.log(err);
      }
    } else {
      serverStack.songs.push(song);
      message.channel.send(`${song.title} has been added to the queue`);
    }
  } catch (error) {
    console.log(`${error}`);
  }
};
