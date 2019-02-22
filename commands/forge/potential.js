const commando = require('discord.js-commando');
const config = require('../../config.json');

class Potential extends commando.Command{
    constructor(client){
        super(client, {
            name: 'potential',
            group: 'forge',
            memberName: 'potential',
            description: 'Equipment Potentials Data'
        });
    }

    async run(message) {

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(config.prefix.length).toLowerCase();

        if (!message.guild || message.author.bot) return;
    
        if (message.content.indexOf(config.prefix) !== 0) return;
        
        //Potentials data
        if (command === 'potential') {
            return message.reply(`https://imgur.com/a/zWIgBp9?`)
        }
       
        
    }
}

module.exports = Potential;