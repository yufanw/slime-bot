const commando = require('discord.js-commando');
const config = require('../../config.json');

class Help extends commando.Command{
    constructor(client){
        super(client, {
            name: 'help',
            group: 'misc',
            memberName: 'help',
            description: 'Lists bot commands'
        });
    }

    async run(message) {

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(config.prefix.length).toLowerCase();

        if (!message.guild || message.author.bot) return;
    
        if (message.content.indexOf(config.prefix) !== 0) return;

    // list available bot commands
        if (command === 'help') {
            message.author.send({embed: {
                color: 3447003,
                fields: [{
                    name: "**__Public Commands__**",
                    value: "**!fuse** : fusing calc, cost, and various data \n **!jewel** : jewel data \n **!team** : expedition check-ins (can only be used in checkInChannel config) \n  **!exalt** : exalt data \n **!potential** : potentials data \n **!pba** : weapon pba data \n **!help** : list of commands"
                },
                {
                    name: "**__Admin Commands__**",
                    value: "**!showconf** : show current configurations \n**!setconf** : edit configurations \n **!resetconf** : resets configurations to default settings"
                }
                ]
            }
            })

            message.reply(`Check your DM!`)
        }

        
    }
}

module.exports = Help;