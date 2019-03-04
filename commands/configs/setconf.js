const commando = require('discord.js-commando');
const config = require('../../config.json');

class SetConf extends commando.Command{
    constructor(client){
        super(client, {
            name: 'setconf',
            group: 'configs',
            memberName: 'setconf',
            description: 'Reset configs to default settings'
        });
    }

    async run(message) {

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(config.prefix.length).toLowerCase();

        if (!message.guild || message.author.bot) return;
    
        if (message.content.indexOf(config.prefix) !== 0) return;

        const guildConf = enmap.ensure(message.guild.id, defaultSettings);
       
     // setting configurations command
     if(command === "setconf") {

        // grabbing value of admin
        const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

        if(!adminRole) return message.reply("Administrator Role Not Found");
        
        // exits if user is not admin
        if(!message.member.roles.has(adminRole.id)) {
          return message.reply("Hey, you're not the boss of me!");
        }
        
        const [prop, ...value] = args;

      
        if (prop === 'help') {
            message.author.send({embed: {
                color: 3447003,
                title: '**__Configuration Help__**',
                description: `Hey GM! I'm here to teach you how to set up your own guild-specific configurations.`,
                fields: [{
                    name: "**__Why do I need to set configurations?__**",
                    value: "Every guild discord is different - they have their own specific channels, banquet times, GMs want their own reminder messages, etc etc. \n\n By setting configs, you are able to edit all of these to your liking."
                  },
                  {
                      name: "**__Configuration Keys and Value__**",
                      value: "There are 2 parts to my configurations: **keys and values**. \n\n The **key** is the type of configuration. \n\n Some examples of **keys** include 'expoMessage', 'expoChannel' & 'banquetTime'. \n\n The **value** is the value of that particular **key**, and it is what you will be changing. \n\n For example, the default **value** of the **key** 'expoChannel' is set to 'general'. This means that my expedition reminders will be sent to the channel called 'general' by default. \n\n If you don't have a channel called 'general', or want me to send exped reminders to a different channel, let's say to a channel called 'expedition-reminders', you would change the **value** of expoChannel to 'expedition-reminders'."
                  },
                  {
                    name: "**__Changing values__**",
                    value: "To change the value of a key, type !setconf followed by the **key** and then the **value** you want. \n\n For the example above, simply type **!setconf expoChannel expedition-reminders**. This will set my expedition reminder messages to send only to the channel **expedition-reminders**. \n\n You can then type **!showconf** to view your changes. \n\n Simple enough, right? \n\n If you're not getting reminders from me, there is probably an error in your configs (check spelling and/or letter casing). \n\n Now go edit your configs! "
                  },
                  {
                    name: "**__Keys and their functions__**",
                    value: "**privateMessage**: I will send this private DM to new guild members. \n\n **expoChannel**: The channel I will send my expedition reminders to. \n\n **expoMessage**: This message will be sent to the expoChannel 15 minutes prior to expeditions. \n\n **banquetTime**: the time you want me to remind your guild about banquet. You must enter time in this format: [minute][hour] military time. IE: 30 18 = 6:30pm \n\n **banquetChannel**: the channel I will send the banquetMessage to. \n\n **banquetMessage**: the message I will send to banquetChannel."
                  }
                ]
              }
            })

            return message.reply(`Check your DM!`)
        }

        // if invalid key is entered
        if(!enmap.has(message.guild.id, prop)) {
            return message.reply("This key is not in the configuration. Type !showconf to see your current keys.")
            .catch(console.error);
        }

        else if (prop === 'team1' || prop === 'team2' || prop === 'team3') {
            return message.reply(`You cannot set these configurations. Use the '!team' command`)
        }


        if (prop !== 'banquetTime') {

            // if blank value is entered
            if (prop === undefined ) {
                return message.reply("You cannot enter a blank key. Type '!setconf help' for configuration help, or '!showconf' for your current configurations.")
                .catch(console.error);
            }

            else if (value === undefined || value === null || value == '') {
                return message.reply(`You cannot enter a blank value. Type '!setconf help' for configuration help, or '!showconf' for your current configurations.`)
            }

            else if (prop === 'expoChannel' || prop === 'banquetChannel' || prop === 'fortChannel' || prop === 'checkInChannel') {
                enmap.ensure(message.guild.id, defaultSettings)
            
                enmap.set(message.guild.id, value.join("-").toLowerCase(), prop);
            
                return message.channel
                    .send(`Guild configuration item **${prop}** has been changed to:\n\`${value.join("-").toLowerCase()}\``)
            }

            else {
                enmap.ensure(message.guild.id, defaultSettings)
            
                enmap.set(message.guild.id, value.join(" "), prop);
            
                return message.channel
                    .send(`Guild configuration item **${prop}** has been changed to:\n\`${value.join(" ")}\``)
                    
            }
                
        
        }
       
        //settings banquet configs
        if (prop === 'banquetTime') {

            let minute = Number(value[0]);
            let hour = Number(value[1]);

            if (isNaN(minute) || isNaN(hour)) {
                return message.channel.send(`Please enter a valid time.`);
            }

            if ( minute > 60 || hour > 24) {
                return message.channel.send(`Please enter a valid time, with minute first and hour second, in military time. \n For example: 30 18 = 6:30pm.`)
            }

            if (minute < 0 || hour < 0) {
                return message.channel.send(`Please enter a valid time, with minute first and hour second, in military time. \n For example: 30 18 = 6:30pm`)
            }

            if (value[2]) {
               return message.channel.send(`Please enter a valid time, with minute first and hour second, in military time. \n For example: 30 18 = 6:30pm.`)
            }

            else {

                enmap.set(message.guild.id, value.join(" "), 'banquetTime');

                message.channel
                .send(`Your banquet reminder time has been changed to ${value[1]}:${value[0]}.`)
                .catch(err => console.log(err))
                .then(process.exit);
    
            } 
        }

        
    }
    }
}

module.exports = SetConf;