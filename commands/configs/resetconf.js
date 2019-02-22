const commando = require('discord.js-commando');
const config = require('../../config.json');

class ResetConf extends commando.Command{
    constructor(client){
        super(client, {
            name: 'resetconf',
            group: 'configs',
            memberName: 'resetconf',
            description: 'Reset configs to default settings'
        });
    }

    async run(message) {

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(config.prefix.length).toLowerCase();
        const guildConf = enmap.ensure(message.guild.id, defaultSettings);

        if (!message.guild || message.author.bot) return;
    
        if (message.content.indexOf(config.prefix) !== 0) return;
        
       
     // resets configurations to default
     if(command === 'resetconf') {

        const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);
        if(!adminRole) return message.reply("Administrator Role Not Found");
        
        
        if(!message.member.roles.has(adminRole.id)) {
          return message.reply("You're not an admin, sorry!");
        }

        enmap.delete(message.guild.id);
        message.channel.send(`You're configurations have been reset to default settings`)

    }
    }
}

module.exports = ResetConf;