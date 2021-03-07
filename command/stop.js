// Stopping the song
exports.stop = (message, serverStack) => {
  if (!message.member.voice.channel) return message.reply(`Please join the voice channel`);
  serverStack.voiceChannel.leave();
  message.reply(`You have stop the music!!`);
};


