require('dotenv').config(); // initiate the .env file with sensitive info

const {Client, GatewayIntentBits} = require('discord.js'); // require discord.js necessary things
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] }); // initiate a client with permissions

require('./src/handlers/slashCommands.js').run(client)
require('./src/handlers/events.js').run(client)

// require('./src/functions/soccerApi.js')
// require('./src/functions/geminiApi.js').sendPost('ola')
require('./src/functions/databaseManager.js').startDb()

// require('./src/functions/databaseManager.js').addUser({id:'algostiny'})
// require('./src/functions/databaseManager.js').addPowerToUser({id:'algostiny'},'sp')
// console.log(require('./src/functions/databaseManager.js').getPowerList())
// require('./src/functions/databaseManager.js').updateUserPower({id:'algostiny'},1,{ mod_hp: 1 })
// console.log(require('./src/functions/databaseManager.js').getUserPowers({id:'algostiny'}))

client.login(process.env.TOKEN); // make login

//

const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('skelly.')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})