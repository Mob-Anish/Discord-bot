const ytdl = require('ytdl-core');

// Play song
exports.play = (message, song, queue) => {
  const serverStack = queue.get(message.guild.id);
  if (!song) {
    message.reply('Sorry there is no song to play!!');
    serverStack.voiceChannel.leave();
    queue.delete(message.guild.id);
    return;
  }

  const docker = serverStack.connection
    .play(ytdl(song.url, {quality: 'highestaudio'}))
    .on('finish', () => {
      serverStack.songs.shift();
      play(message, serverStack.songs[0], queue);
    })
    .on('error', (err) => console.log(err));
  message.channel.send(`Start playing: **${song.title}**`);
};
