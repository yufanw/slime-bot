const commando = require('discord.js-commando');
const config = require('../../config.json');

class AddConf extends commando.Command{
    constructor(client){
        super(client, {
            name: 'addconf',
            group: 'configs',
            memberName: 'addconf',
            description: 'Adds new config to all guilds'
        });
    }

    async run(message) {

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(config.prefix.length).toLowerCase();

        if (!message.guild || message.author.bot) return;
    
        if (message.content.indexOf(config.prefix) !== 0) return;
        
        // adding config to all guilds
    if (command === 'addconf') {
        enmap.forEach( (val, key) => enmap.set(key, "na", "region") );
    }
        
    }
}

module.exports = AddConf;