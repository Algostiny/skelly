//importing
const { Collection } = require('discord.js')
const fs = require('fs')
const path = require('path')

module.exports.run = (client) => {
    // create commands collection and starts itering all files
    client.commands = new Collection()
    
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
                client.commands.set(cmd.data.name, cmd)
            }
            else {
                console.log(`\x1b[31m[WARNING]\x1b[0m ${file}`)
            }
        }
    }
}