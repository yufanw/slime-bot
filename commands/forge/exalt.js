const commando = require('discord.js-commando');
const config = require('../../config.json');

class Exalt extends commando.Command{
    constructor(client){
        super(client, {
            name: 'exalt',
            group: 'forge',
            memberName: 'exalt',
            description: 'Exalt data'
        });
    }

    async run(message) {

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(config.prefix.length).toLowerCase();

        if (!message.guild || message.author.bot) return;
    
        if (message.content.indexOf(config.prefix) !== 0) return;
        
        // exalt data
        if (command === 'exalt') {
            return message.reply(`https://imgur.com/a/Qp1eu9B`)
        }
        
    }
}

module.exports = Exalt;