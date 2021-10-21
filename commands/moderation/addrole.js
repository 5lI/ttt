const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = "#00FFFF";

module.exports = {
  name: "addrole",
  category: "moderation",
  description: "Add a role!",
  usage: "addrole <role><user>",
  run: (client, message, args) => {
    if (message.member.hasPermission("MANAGE_ROLES")) {
      const givenrole = message.content
        .slice("".length)
        .trim()
        .split(/ +/);
      const member = message.mentions.members.first();
      givenrole
        .shift()
        .toLowerCase()
        .split(" ")[1];
      let warned = message.mentions.members.first();

      if (!warned)
        message.channel.send(
          "Please mention someone whom you want to give a role using **.giverole [member], [ROLE ID]**! Make sure the bot has Manage role permission and bot role is higher than the role you are giving."
        );
      if (!givenrole[1])
        return message.channel.send(
          ":x: Please insert a Role Id Also also :x:. **How to get Role Id**: https://support.discord.com/hc/en-us/community/posts/360048094171/comments/1500000318142"
        );
      else {
        member.roles.add(`${givenrole.slice(1).join(" ")}`);
        let embed = new Discord.MessageEmbed()
          .setTitle("Role Manager")
          .setDescription(
            `:name: ${warned} **was given a role (<@&${givenrole
              .slice(1)
              .join(" ")}>) by** **${message.author}.**`
          )

          .setColor("RED")
          .setFooter(
            `Role Giver: ${message.author.tag} • The message might be wrong if the bot role was lower than the given role or if the member already had the role.`
          );

        message.channel.send(embed);
      }
      const channel = warned.guild.channels.cache.find(
        ch => ch.name === "mod-log"
      );
    }
  }
};
