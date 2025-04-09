require('dotenv').config(); // initiate the .env file with sensitive info

const {Client, GatewayIntentBits} = require('discord.js'); // require discord.js necessary things
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] }); // initiate a client with permissions

require('./src/handlers/slashCommands.js').run(client)
require('./src/handlers/events.js').run(client)
require('./src/utils/databaseManager.js').startDb()

// require('./src/functions/soccerApi.js')
// require('./src/functions/geminiApi.js').sendPost('ola')

// require('./src/functions/databaseManager.js').addUser({id:'algostiny'})
// require('./src/utils/databaseManager.js').addPowerToUser({id:'712389918877286450'},'sp')
// console.log(require('./src/functions/databaseManager.js').getPowerList())
// require('./src/functions/databaseManager.js').updateUserPower({id:'algostiny'},1,{ mod_hp:  })
// require('./src/utils/databaseManager.js').updateUserPower({id:'712389918877286450'},"1",{lvl: 100})
// console.log(require('./src/functions/databaseManager.js').getUserPowers({id:'algostiny'}))

const Duel = require('./src/lib/rpg/Duel.js')
const Power1 = new (require('./src/lib/rpg/powers/Star_Platinum.js'))({lvl:5})
const Power2 = new (require('./src/lib/rpg/powers/Big_Mom.js'))({lvl:5})
const fight = new Duel(Power1,Power2)

fight.runTurn({ type: "move", id: fight.powers[0].attacks.barrage.id})
fight.runTurn({ type: "move", id: fight.powers[0].attacks.barrage.id})
fight.runTurn({ type: "move", id: fight.powers[0].attacks.barrage.id})
fight.runTurn({ type: "move", id: fight.powers[0].attacks.barrage.id})
fight.runTurn({ type: "move", id: fight.powers[0].attacks.barrage.id})
fight.runTurn({ type: "move", id: fight.powers[0].attacks.barrage.id})

console.log(fight.log)
// console.log(fight.log[fight.log.length-1])

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