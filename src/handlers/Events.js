// import area

// export exec property

module.exports.run = (client) => {
    // READY
    client.on('ready', () => {
        console.log(`\x1b[32mLOGGED AS \x1b[36m${client.user.tag}\x1b[0m`)
    })
    console.log(`\x1b[32m[SUCESS]\x1b[0m ready`)

    // INTERACTION CREATE
    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return // filter slash command

        const cmd = client.commands.get(interaction.commandName)
        if (cmd) cmd.execute(interaction, client)
        else interaction.reply({ content: `Comando \`${interaction.commandName}\` não encontrado`, ephemeral: true})
    })
    console.log(`\x1b[32m[SUCESS]\x1b[0m interactionCreate`)
}