const commando = require('discord.js-commando');
const config = require('../../config.json');

class ShowConf extends commando.Command{
    constructor(client){
        super(client, {
            name: 'showconf',
            group: 'configs',
            memberName: 'showconf',
            description: 'Reset configs to default settings'
        });
    }

    async run(message) {

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(config.prefix.length).toLowerCase();

        if (!message.guild || message.author.bot) return;
    
        if (message.content.indexOf(config.prefix) !== 0) return;

        const guildConf = enmap.ensure(message.guild.id, defaultSettings);
       
     // shows current configuration
     if(command === "showconf") {

        const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);
        if(!adminRole) return message.reply("Administrator Role Not Found");
        
        
        if(!message.member.roles.has(adminRole.id)) {
          return message.reply("You're not an admin, sorry!");
        }
        let configProps = Object.keys(guildConf).map(prop => {
          return `▶ ${prop} ▶  :  ${guildConf[prop]}\n\n`;
        });
        let configPropsJoin = configProps.join(" ")
        
        message.channel.send(`The following are the server's current configuration:
        \`\`\`${configPropsJoin}\`\`\``).catch(console.error);
    }
    }
}

module.exports = ShowConf;