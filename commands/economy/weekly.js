const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
  name: "weekly",
  aliases: ["week"],
  category: "economy",
  description: "Gives You 5000 per Day",
  usage: " ",
  accessableby: "everyone",
  run: async (bot, message, args) => {
    let user = message.author;
    let timeout = 604800000;
    let amount = Math.floor(Math.random() * 2000);

        let x = await db.fetch(`x_${user.id}`);

        if (x !== null && timeout - (Date.now() - x) > 0) {
           

            let timeEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You've already collected your weekly reward`);
            message.channel.send(timeEmbed)
        } else {
      let moneyEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(
          `✅ You've collected your weekly reward of ${amount} coins`
        );
      message.channel.send(moneyEmbed);
      db.add(`money_${user.id}`, amount);
      db.set(`x_${user.id}`, Date.now());
    }
  }
};
