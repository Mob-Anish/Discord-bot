exports.reply = (message) => {
  const hours = new Date().getHours();

  if (hours <= 12) return message.reply(` Umm Heyy Goodmorning!!`);
  if (hours > 12 && hours <= 16) return message.reply(` Umm Heyy GoodAfternoon!!`);
  if (hours > 16) return message.reply(` Umm Heyy GoodEvening!!`);
};
