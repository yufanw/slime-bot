const Commando = require('discord.js-commando');
const bot = new Commando.Client({
    commandPrefix: '!',
    owner: '151152121780109312',
    unknownCommandResponse: false
});

const config = require('./config.json')
const Enmap = require('enmap');
const fs = require('fs');
const CronJob = require('cron').CronJob;
const cron = require('node-cron');

//registering commands
bot.registry
    .registerGroups([
        ['forge', 'Forge Commands'],
        ['configs', 'Config Commands'],
        ['team', 'Team Commands'],
        ['misc', 'Misc Commands']
    ])
    .registerCommandsIn((__dirname + '/commands'));


// enmap settings back-end
enmap = new Enmap({
    name: "settings",
    fetchAll: true,
    autoFetch: true,
    cloneLevel: 'deep'
  })


// enmap settings front-end  
defaultSettings = {		
    adminRole: "GM",	
    privateMessage: "Hi there, welcome to our discord! \n\n Please change your nickname to your in-game IGN. \n\n Type !help for my list of commands!",
    expoChannel: "general",
    expoMessage: "@everyone Expeditions are starting in 15 minutes! Good luck!",
    banquetTime: "00 18",
    banquetChannel: "general",
    banquetMessage: "@everyone Banquet is starting in 15 minutes!",
    fortMessage: '@everyone Guild fort in 15 minutes! Good luck!',
    fortChannel: 'general',
    checkInChannel: 'general',
    team1: {
        name: "Team 1",
        team: []
    },
    team2: {
        name: "Team 2",
        team: []
    },
    team3: {
        name: "Team 3",
        team: []
    },
    region: "na",
}


// This loop reads the /events/ folder and attaches each event file to the appropriate event.
// fs.readdir("./events/", (err, files) => {
//     if (err) return console.error(err);
//     files.forEach(file => {
   
//       if (!file.endsWith(".js")) return;
      
//       const event = require(`./events/${file}`);
     
//       let eventName = file.split(".")[0];
     
//       bot.on(eventName, event.bind(null, bot));
//     });
//   });




bot.on('ready', () => {
    console.log(`Serving ${bot.guilds.size} servers`);
    console.log('Ready boss!');

    bot.guilds.forEach((guild) => {

        enmap.ensure(guild.id, defaultSettings);
        let banquetTime = enmap.get(guild.id, 'banquetTime');
            
             // NA CRONJOBS //
            
            // expedition reminder
            
            cron.schedule('00 45 11,19 * * *', () => {
            
            
                    let expoChannel = enmap.get(guild.id, "expoChannel");
                        
                    let expoMessage = enmap.get(guild.id, "expoMessage");
            
                        
                    guild.channels
                        .find((channel) => {
                            if (channel.name === expoChannel) {
                                channel
                                    .send(expoMessage)
                                    .catch(console.error);
                            } else {
                                return;
                            }
                        })
            
                });

               
            // exped auto clear
            cron.schedule('00 01 13,21 * * *', () => {
        
                enmap.ensure(guild.id, defaultSettings);
        
                enmap.set(guild.id, [], 'team1.team');
                enmap.set(guild.id, [], 'team2.team');
                enmap.set(guild.id, [], 'team3.team');
            });

             // guild fort reminder
            cron.schedule('00 45 20 * * *', () => {
       
                let fortChannel = enmap.get(guild.id, "fortChannel");
                
                let fortMessage = enmap.get(guild.id, "fortMessage");
        
                    
                guild.channels
                .find((channel) => {
                    if (channel.name === fortChannel) {
                        channel
                            .send(fortMessage)
                            .catch(console.error);
                    } else {
                        return;
                    }
                })
            });

         
            // banquet reminder
            cron.schedule(`00 ${banquetTime} * * *`, () => {
        
                let banquetChannel = enmap.get(guild.id, 'banquetChannel');
                let banquetMessage = enmap.get(guild.id, 'banquetMessage');
    
                guild.channels
                    .find(channel => channel.name === banquetChannel)
                    .send(banquetMessage)
                    .catch(console.error);
            });

          
        })
    })




// logs unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
})

// bot login
bot.login(config.token);