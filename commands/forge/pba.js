const commando = require('discord.js-commando');
const config = require('../../config.json');

class Pba extends commando.Command{
    constructor(client){
        super(client, {
            name: 'pba',
            group: 'forge',
            memberName: 'pba',
            description: 'Weapon PBA data'
        });
    }

    async run(message) {

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(config.prefix.length).toLowerCase();

        if (!message.guild || message.author.bot) return;
    
        if (message.content.indexOf(config.prefix) !== 0) return;
        
        // pba sheet
        if (command === 'pba') {
            return message.reply(`https://imgur.com/a/1lotika`)
        }
        
    }
}

module.exports = Pba;