# Slime Bot

![alt text](https://banner2.kisspng.com/20180403/yxe/kisspng-maplestory-2-maplestory-adventures-video-game-boss-slime-5ac4353af285a0.8111380015228081229934.jpg)

# A Maplestory M discord bot, built with discord.js. 

 - Utilizes Enmap for per-server configurations and node-cron/cron-job-manager for scheduled messages.
  

## Functionalities:

- 15 minute reminders for afternoon and nighttime expeditions! Customize message and channel it sends to.

- Set 15 minute banquet reminders at your own time. Customize message and channel it sends to.

- Greets new guild members. Customize welcome greeting and channel it sends to.

- !fuse command to help with fusing - includes cost and data.


## Commands: 

- !fuse - helps with fusing costs.

- !help - shows bot's commands.

- !showconf - shows current configurations

- !setconf - edit configurations (admin only)


# IMPORTANT - please read before using!

## Configuration Help:

### Why do I need to set configs?
 
- Every guild discord is different - they have their own specific channels, banquet times, GMs want their own welcome/reminder     messages, etc etc. 

- By setting configs, you are able to edit all of these to your liking.

### Configuration Keys and Value

- There are 2 parts to my configurations: **keys and values**.

- The **key** is the type of configuration. 

- Some examples of **keys** include: 'welcomeMessage', 'welcomeChannel', 'expoMessage', & 'banquetTime'. 

- The **value** is the value of that particular **key**, and it is what you will be changing. 

- For example, the default **value** of the **key** 'expoChannel' is set to 'general'. This means that my expedition reminders will be -sent to the channel called 'general' by default. 

- If you don't have a channel called 'general', or want me to send exped reminders to a different channel, let's say, 'expedition-reminders', you would change the **value** of expoChannel to 'expedition-reminders'."
                  
- Changing values of keys
- To change the value of keys, type !setconf followed by the **key** and then the **value** you want.

- For the example above, simply type **!setconf expoChannel expedition-reminders**. This will set my expedition reminder messages to send only to the channel **expedition-reminders**.

- You can then type **!showconf** to view your changes. Simple enough, right?

- If you're not getting reminders from me, there is probably an error in your configs (check spelling and/or letter casing). 

- Now go edit your configs!
  

### Default Configurations

- **adminRole** : GM <-- **important: make sure to assign 'GM' role to yourself so you can use !setconf.**
  
- **welcomeChannel** : welcome

- **welcomeMessage** : Say hello to @{{user}}, everyone! We all need a warm welcome sometimes :D

- **privateMessage** : Hi there, welcome to our discord! Please change your nickname to your in-game IGN. Type !help for my list of commands!

- **expoChannel** : general

- **expoMessage** : @everyone Expeditions are starting in 15 minutes! Good luck!

- **banquetTime** : 00 18 <-- **important: banquetTime is formatted by [minute][hour] in PST, so 00 18 = 6pm PST. Keep this in mind when setting your own banquetTime!**

- **banquetChannel** : general

- **banquetMessage** : @everyone Banquet is starting in 15 minutes!

                 
### Keys and their functionalities

- **adminRole** : name of admin role. Only people with this role can use !setconf.

- **welcomeChannel**: My welcome message will be sent to this channel. 

- **welcomeMessage**: This message will be sent to the welcomeChannel when a new guild member joins the discord. Note that {{user}} will be replaced by the new guild member's username. 

- **privateMessage**: I will send this private DM to new guild members. 

- **expoChannel**: The channel I will send my expedition reminders to. 

- **expoMessage**: This message will be sent to the expoChannel 15 minutes prior to expeditions. 

- **banquetTime**: the time you want me to remind your guild about banquet. 

- **banquetChannel**: the channel I will send the banquetMessage to. 

- **banquetMessage**: the message I will send to banquetChannel.

