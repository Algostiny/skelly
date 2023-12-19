// importing and idk
const { REST, Routes } = require('discord.js')
const path = require('path')
const fs = require('fs')
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// try handling all slash commands and catching all errors
module.exports.run = async (client) => {
    try {
        // DELETE COMMANDS
        // for guild-based commands
        // rest.put(Routes.applicationGuildCommands(process.env.CLIENTID, process.env.WIZKKA), { body: [] })
	    // .then(() => console.log('Successfully deleted all guild commands.'))
	    // .catch(console.error)

        // // for global commands
        // rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: [] })
	    // .then(() => console.log('Successfully deleted all application commands.'))
	    // .catch(console.error)
        //

        //handling commands
        const commands = []

        const commandsPath = path.join(__dirname, '../cmds')
        const commandsFolders = fs.readdirSync(commandsPath).filter(f => !f.endsWith('.js') && !f.startsWith('_'))

        for (let folder of commandsFolders) {
            const folderPath = path.join(commandsPath, folder)
            const commandsFiles = fs.readdirSync(folderPath).filter(f => f.endsWith('.js') && !f.startsWith('_'))

            for (let file of commandsFiles) {
                const filePath = path.join(folderPath, file)
                const cmd = require(filePath)

                // check if command has data and execute property
                if (cmd.data && cmd.execute) {
                    console.log(`\x1b[32m[SUCESS]\x1b[0m ${file}`)
                    commands.push(cmd.data.toJSON())
                }
                else {
                    console.log(`\x1b[31m[WARNING]\x1b[0m ${file}`)
                }
            }
        }

        // await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands })  = GLOBAL COMMANDs

        const data = await rest.put(  // GUILD WIZKKA HANDLER
            Routes.applicationGuildCommands(process.env.CLIENTID, process.env.WIZKKA),
            { body: commands }
        )

        console.log(`\x1b[32m[SUCESS]\x1b[0m LOADED ${data.length} COMMANDS`)
    } catch (error) {
        console.log(`\x1b[31m[WARNING]\x1b[0m`)
        console.error(error)
    }
}