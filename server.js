const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const {prefix, token } = require("./config.json")
const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();
const db = require("quick.db"); 

const discord = require("discord.js");
const client = new discord.Client({
  disableEveryone: true
});
// below const client, k?
require('discord-buttons')(client)
// go to package to update some stuff
client.commands = new Collection();
client.aliases = new Collection();


// Run the command loader
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    client.user.setPresence("I am Devil") 
})

client.on("message", async message => {


    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args);
});
client.on("guildMemberAdd", async member => {
  let chx = db.get(`welchannel_${member.guild.id}`);

  if (chx === null) {
    return;
  }


  if (chx === null) {
    return;
  }
   let data = await canva.welcome(member, { link: "https://mk0simplefreeth0abkj.kinstacdn.com/wp-content/uploads/2017/04/Beautiful-Norway.jpg" })
 
    const attachment = new discord.MessageAttachment(
      data,
      "welcome-image.png"
    );
 


  client.channels.cache.get(chx).send(`✅ Welcome to the server ` + member.user.username  + `\n✅ Now we have ${member.guild.memberCount} users!` + `✅ Make sure to read the #rules `, attachment);
  member.roles.add("850691598156431380")
});
client.login(process.env.token);