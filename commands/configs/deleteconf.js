const commando = require('discord.js-commando');
const config = require('../../config.json');

class DeleteConf extends commando.Command{
    constructor(client){
        super(client, {
            name: 'deleteconf',
            group: 'configs',
            memberName: 'deleteconf',
            description: 'Delete existing config from all guilds'
        });
    }

    async run(message) {

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(config.prefix.length).toLowerCase();

        if (!message.guild || message.author.bot) return;
    
        if (message.content.indexOf(config.prefix) !== 0) return;
        
       
    // deleting config from all guilds

        // if (command === 'deleteconf') {
        //     enmap.forEach( (val, key) => enmap.delete(key, "banquetReminder") );
        // }
        
    }
}

module.exports = DeleteConf;