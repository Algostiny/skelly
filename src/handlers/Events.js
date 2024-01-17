// import area
const usersBlocked = {}

// export exec property

module.exports.run = (client) => {
    // READY
    client.on('ready', () => {
        console.log(`\x1b[32mLOGGED AS \x1b[36m${client.user.tag}\x1b[0m`)
        // client.channels.cache.get('950470900296323155').send('eu tenho depressao profunda')
    })
    console.log(`\x1b[32m[SUCESS]\x1b[0m ready`)

    // INTERACTION CREATE
    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand() || usersBlocked[interaction.user.id]) return // filter slash command and users blocked
        const cmd = client.commands.get(interaction.commandName)

        if (cmd) cmd.execute(interaction, client)
        else interaction.reply({ content: `Comando \`${interaction.commandName}\` não encontrado`, ephemeral: true})
    })

    // MESSAGE CRATE
    client.on('messageCreate', async msg => {
        if (!msg.content.startsWith(process.env.PREFIX)) return // check if the msg starts with the prefix
        if (msg.author.bot || usersBlocked[msg.author.id]) return // return if the author is a bot or user blocked

        let msg_array = msg.content.slice(1).split(' ')
        let cmd = msg_array[0]
        let args = msg_array.slice(1)

        const cmd_file = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
        if(cmd_file && cmd_file.data.prefixed){
            cmd_file.execute(msg, args, client)
        }
    })

    process.on('uncaughtException', function (err) {
        console.log('Caught exception: ', err);
    })

    console.log(`\x1b[32m[SUCESS]\x1b[0m interactionCreate`)

    require('../functions/db.js').exportAllBlock((err,r) => {
        if(err) process.exit()
        
        for (let user of r) {
            usersBlocked[user.id] = true;    
        }

        console.log(`\x1b[32m[SUCESS]\x1b[0m usersBlocked`)
    })
}

module.exports.blockUser = (id) => {usersBlocked[id] = true}
module.exports.unblockUser = (id) => {usersBlocked[id] = false}