const Commando = require('discord.js-commando');
const bot = new Commando.Client({
    commandPrefix: '!',
    owner: '151152121780109312',
    unknownCommandResponse: false
});

const config = require('./config.json')
const Enmap = require('enmap');
const fs = require('fs');

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
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      // If the file is not a JS file, ignore it (thanks, Apple)
      if (!file.endsWith(".js")) return;
      // Load the event file itself
      const event = require(`./events/${file}`);
      // Get just the event name from the file name
      let eventName = file.split(".")[0];
      // super-secret recipe to call events with all their proper arguments *after* the `client` var.
      // without going into too many details, this means each event will be called with the client argument,
      // followed by its "normal" arguments, like message, member, etc etc.
      // This line is awesome by the way. Just sayin'.
      bot.on(eventName, event.bind(null, bot));
      delete require.cache[require.resolve(`./events/${file}`)];
    });
  });


// logs unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
})

// bot login
bot.login(config.token);