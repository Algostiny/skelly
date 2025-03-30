require('dotenv').config(); // initiate the .env file with sensitive info

const {Client, GatewayIntentBits} = require('discord.js'); // require discord.js necessary things
const client = new Client({ intents: [GatewayIntentBits.Guilds] }); // initiate a client with permissions

require('./src/handlers/slashCommands.js').run(client)
require('./src/handlers/events.js').run(client)

require('./src/functions/soccerApi.js')
client.login(process.env.TOKEN); // make login

const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})