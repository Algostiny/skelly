// import all things
const { Client, GatewayIntentBits } = require('discord.js')
require('dotenv').config()
//

// create client and login with token
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(process.env.TOKEN)

console.clear()
console.log('\x1b[31mskelly')

// handling
console.log(' ')
console.log('\x1b[34mHANDLING ALL EVENTS\x1b[0m')
require('./handlers/Events.js').run(client)

console.log('\x1b[34mHANDLING ALL COMMANDS\x1b[0m')
require('./handlers/Commands.js').run(client)

console.log('\x1b[34mHANDLING ALL SLASH COMMANDS\x1b[0m')
require('./handlers/SlashCommands.js').run(client)
console.log(' ')