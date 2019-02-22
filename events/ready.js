const CronJob = require('cron').CronJob;

module.exports = (bot) => {
    console.log(`Serving ${bot.guilds.size} servers`);
    console.log('Ready boss!');

    bot.guilds.forEach((guild) => {

        enmap.ensure(guild.id, defaultSettings);
        let region = enmap.get(guild.id, 'region');
        let banquetTime = enmap.get(guild.id, 'banquetTime');
            
        // NA CRONJOBS //
        if (region === 'na') {
            
            // expedition reminder
            
            new CronJob('00 45 11,19 * * *', () => {
            
                    enmap.ensure(guild.id, defaultSettings);
            
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
            
                }, null, true, 'America/Los_Angeles');
            
            // exped auto clear
            new CronJob('00 01 13,21 * * *', () => {
        
                enmap.ensure(guild.id, defaultSettings);
        
                enmap.set(guild.id, [], 'team1.team');
                enmap.set(guild.id, [], 'team2.team');
                enmap.set(guild.id, [], 'team3.team');
            }, null, true, 'America/Los_Angeles');


             // guild fort reminder
            new CronJob('00 45 20 * * *', () => {
       
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
            }, null, true, "America/Los_Angeles");

            // banquet reminder
            new CronJob (`00 ${banquetTime} * * *`, () => {
        
                let banquetChannel = enmap.get(guild.id, 'banquetChannel');
                let banquetMessage = enmap.get(guild.id, 'banquetMessage');
    
                guild.channels
                    .find(channel => channel.name === banquetChannel)
                    .send(banquetMessage)
                    .catch(console.error);
            }
            , null, true, 'America/Los_Angeles');
            }

        // EU CRONJOBS //
        if (region === 'eu') {
            
            // expedition reminder
            
            new CronJob('00 45 11,19 * * *', () => {
       
                    enmap.ensure(guild.id, defaultSettings);
            
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
            }, null, true, 'Europe/London');

            // exped auto clear
            new CronJob('00 01 13,21 * * *', () => {
        
                enmap.ensure(guild.id, defaultSettings);
        
                enmap.set(guild.id, [], 'team1.team');
                enmap.set(guild.id, [], 'team2.team');
                enmap.set(guild.id, [], 'team3.team');
            }, null, true, 'Europe/London');

            // guild fort reminder
            new CronJob('00 45 20 * * *', () => {
       
            bot.guilds.forEach((guild) => {
        
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
            })
                   
            }, null, true, "Europe/London");

            // banquet reminder
            new CronJob (`00 ${banquetTime} * * *`, () => {
        
                let banquetChannel = enmap.get(guild.id, 'banquetChannel');
                let banquetMessage = enmap.get(guild.id, 'banquetMessage');
    
                guild.channels
                    .find(channel => channel.name === banquetChannel)
                    .send(banquetMessage)
                    .catch(console.error);
            }
            , null, true, 'Europe/London');
            }

        // ASIA CRONJOBS //
        if (region === 'asia') {
            
            // exped reminders
            
            new CronJob('00 45 11,19 * * *', () => {
       
                    enmap.ensure(guild.id, defaultSettings);
            
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
            
            }, null, true, 'Asia/Taipei');

            // exped auto clear
            new CronJob('00 01 13,21 * * *', () => {
        
                enmap.ensure(guild.id, defaultSettings);
        
                enmap.set(guild.id, [], 'team1.team');
                enmap.set(guild.id, [], 'team2.team');
                enmap.set(guild.id, [], 'team3.team');
            }, null, true, 'Asia/Taipei');


            // guild fort reminder
            new CronJob('00 45 20 * * *', () => {
       
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
          
               
                 
            }, null, true, "Asia/Taipei");
        
            // banquet reminder
            new CronJob (`00 ${banquetTime} * * *`, () => {
       
            let banquetChannel = enmap.get(guild.id, 'banquetChannel');
            let banquetMessage = enmap.get(guild.id, 'banquetMessage');
   
            guild.channels
                .find(channel => channel.name === banquetChannel)
                .send(banquetMessage)
                .catch(console.error);
            }
            , null, true, 'Asia/Taipei');
            }
    })
}
