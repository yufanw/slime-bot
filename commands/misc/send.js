const commando = require('discord.js-commando');
const config = require('../../config.json');

class Send extends commando.Command{
    constructor(client){
        super(client, {
            name: 'send',
            group: 'misc',
            memberName: 'send',
            description: 'Send DM to every guild owner'
        });
    }

    async run(message) {

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(config.prefix.length).toLowerCase();

        if (!message.guild || message.author.bot) return;
    
        if (message.content.indexOf(config.prefix) !== 0) return;
        
       // if (command === 'send') {
            // bot.guilds.forEach(guild => guild.owner.send(`Hi all! Thanks for adding Slime Bot! Please join my discord server to ask any questions and keep up with updates! https://discord.gg/DVjQ39K`))
        // }
        
    }
}

module.exports = Send;