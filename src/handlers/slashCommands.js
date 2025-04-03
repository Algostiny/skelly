const fs = require('fs')
const path = require('path')

const {REST, Routes, Collection} = require('discord.js')
const rest = new REST().setToken(process.env.TOKEN)

module.exports.run = (client) => {
    fs.readdir(path.join(__dirname, '../cmds/'), (err, folders) => {
        if (err) return console.error(err);

        var commands = []
        client.commands = new Collection()

        for (let folder of folders) {
            let files = fs.readdirSync(path.join(__dirname, '../cmds/' + folder))

            for (let file of files) {
                if (!file.endsWith('.js')) continue;
                if (file.endsWith('_.js')) continue;

                let info = require(path.join(`../cmds/${folder}/${file}`))
                commands.push(info.data.toJSON())
                info['category'] = folder
                client.commands.set(info.data.name, info)
            }
        }
        
        (async () => {
            try {
                console.log(`Started refreshing ${commands.length} application (/) commands.`);
                // The put method is used to fully refresh all commands in the guild with the current set
                const data = await rest.put(
                    Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID),
                    { body: commands },
                );                
        
                console.log(`Successfully reloaded ${data.length} application (/) commands.`);
            } catch (error) {
                // And of course, make sure you catch and log any errors!
                console.error(error);
            }
        })();
    })
}