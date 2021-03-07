// Skipping song
exports.skip = (message, serverStack) => {
  if (!message.member.voice.channel) return message.reply(`Please join the voice channel`);
  if (!serverStack) return message.reply(`Oops there is no song to skip!!`);
  
  // It will finish the song
  serverStack.connection.docker.end();

  message.reply('You have skip the music bruh!');
};
