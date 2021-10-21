const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description:
    "Get list of all command and even get to know every command detials",
  usage: "help <cmd>",
  category: "overview",
  run: async (client, message, args) => {
    if (args[0]) {
      const command = await client.commands.get(args[0]);

      if (!command) {
        return message.channel.send("Unknown Command: " + args[0]);
      }

      let embed = new MessageEmbed()
        .setAuthor(command.name, client.user.displayAvatarURL())
        .addField("Description", command.description || "Not Provided :(")
        .addField("Usage", "`" + command.usage + "`" || "Not Provied")
      .setURL("https://discord.com/oauth2/authorize?client_id=785051290270302218&scope=bot&permissions=2147483639&redirect_uri=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCNoJ1OKC4J0rCsY6Hfh17bA")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      const commands = await client.commands;

      let emx = new MessageEmbed()
      .setURL("https://www.paypal.com/paypalme/icemakesstuff?locale.x=en_US")
        .setDescription(
          `TYPE !help <cmd> for details (some may not have, maybe because description was not set)
          [💸 Donate](https://www.paypal.com/paypalme/icemakesstuff?locale.x=en_US)
          [✉️ Do us a favour and invite me.](${await client.generateInvite()})`
        )
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL());

      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "Unknown";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for (const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("`, `") + "`";

        emx.addField(`${category.toUpperCase()}[${value.length}]`, desc);
        
      }

      return message.channel.send(emx);
    }
    let invite = await client.generateInvite()
    message.channel.send({embed:{ title:"Do us a favour and invite me to your server!", url: invite}})
  }
};
