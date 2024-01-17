const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require('../../functions/db.js')
const fs = require('fs')
const path = require('path')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('owner')
        .setDescription('Owner commands')
        .setNameLocalization('pt-BR', 'dev')
        .setDescriptionLocalization('pt-BR', 'Comandos de Dev')
        // command option
        .addSubcommand(subcommand => 
            subcommand
            .setName('reload')
            .setDescription('Reload a command')
            .setNameLocalization('pt-BR', 'recarregar')
            .setDescriptionLocalization('pt-BR', 'Recarregue algum comando')
            .addStringOption(option =>
                option
                    .setName('command')
                    .setNameLocalization('pt-BR', 'comando')
                    .setDescription('The command to reload')
                    .setDescriptionLocalization('pt-BR', 'O comando para recarregar')
                    .setRequired(true)
            ))
        .addSubcommand(subcommand => 
            subcommand
            .setName('blacklist')
            .setDescription('Remove someone permission to use commands')
            .setNameLocalization('pt-BR', 'block')
            .setDescriptionLocalization('pt-BR', 'Tire a permissão de alguém usar comandos')
            .addUserOption(option =>
                option
                    .setName('user')
                    .setNameLocalization('pt-BR', 'usuário')
                    .setDescription('The user to block')
                    .setDescriptionLocalization('pt-BR', 'O usuário para bloquear')
                    .setRequired(true)
            ))
        .addSubcommand(subcommand => 
            subcommand
            .setName('whitelist')
            .setDescription('Add someone permission to use commands')
            .setNameLocalization('pt-BR', 'unblock')
            .setDescriptionLocalization('pt-BR', 'Devolva a permissão de alguém usar comandos')
            .addUserOption(option =>
                option
                    .setName('user')
                    .setNameLocalization('pt-BR', 'usuário')
                    .setDescription('The user to unblock')
                    .setDescriptionLocalization('pt-BR', 'O usuário para desbloquear')
                    .setRequired(true)
        )),
    execute: function (interaction, client) {
        // check if user is the owner
        if (!process.env.OWNER.split('-').includes(interaction.user.id)) {
            let emb = new EmbedBuilder()
                .setTitle('Você não possui permissão')
                .setDescription(`Esse comando pode ser utilizado exclusivamente por los machos`)
                .setColor('Red')

            return interaction.reply({ embeds: [emb], ephemeral: true })
        }

        if (interaction.options.getSubcommand() == 'reload'){
                // itterate all commands to get the spechific command
            var commandsArr = []
            const commandsPath = path.join(__dirname, '../')
            const commandsFolders = fs.readdirSync(commandsPath).filter(f => !f.endsWith('.js') && !f.startsWith('_'))

            for (let folder of commandsFolders) {
                const folderPath = path.join(commandsPath, folder)
                const commandsFiles = fs.readdirSync(folderPath).filter(f => f.endsWith('.js') && !f.startsWith('_'))

                for (let file of commandsFiles) {
                    const filePath = path.join(folderPath, file)
                    const cmd = require(filePath)

                    // check if command has data and execute property
                    if (cmd.data && cmd.execute && cmd.data.name == interaction.options._hoistedOptions[0].value) {
                        commandsArr.push({ data: cmd.data, cmdPath: filePath })
                    }
                }
            }

            try {
                // reloading
                delete require.cache[require.resolve(`${commandsArr[0].cmdPath}`)]
                const newCmd = require(commandsArr[0].cmdPath)
                client.commands.set(newCmd.data.name, newCmd)

                // msg response
                let cmdPathArray = commandsArr[0].cmdPath.split('\\')
                let cmdPathOfc = `${cmdPathArray[cmdPathArray.length - 4]}/${cmdPathArray[cmdPathArray.length - 3]}/${cmdPathArray[cmdPathArray.length - 2]}/${cmdPathArray[cmdPathArray.length - 1]}`

                let emb = new EmbedBuilder()
                    .setTitle('Comando recarregado')
                    .setDescription(`Comando - \`${interaction.options._hoistedOptions[0].value}\`\nPath - \`${cmdPathOfc}\`\nDelay - \`${Date.now() - interaction.createdTimestamp}\``)
                    .setColor('Purple')

                interaction.reply({ embeds: [emb], ephemeral: true })
            }
            catch (err) {
                // err msg
                let emb = new EmbedBuilder()
                    .setTitle('Comando não recarregado com sucesso')
                    .setDescription(`Comando - \`${interaction.options._hoistedOptions[0].value}\`\nPath - \`${cmdPathOfc}\`\nDelay - \`${Date.now() - interaction.createdTimestamp}\``)
                    .setColor('Red')

                interaction.reply({ embeds: [emb], ephemeral: true })
            }
        }
        else if(interaction.options.getSubcommand() == 'blacklist') {
            db.blockUser(interaction.options.getUser('user'))

            let emb = new EmbedBuilder()
                .setTitle('Usuário bloqueado')
                .setDescription(`O usuário <@${interaction.options.getUser('user').id}> foi bloqueado de usar os comandos do bot`)
                .setColor('Red')
            
            interaction.reply({ embeds: [emb], ephemeral: true })
        }
        else if(interaction.options.getSubcommand() == 'whitelist') {
            db.unblockUser(interaction.options.getUser('user'))

            let emb = new EmbedBuilder()
                .setTitle('Usuário desbloqueado')
                .setDescription(`O usuário <@${interaction.options.getUser('user').id}> foi desbloqueado de usar os comandos do bot`)
                .setColor('Green')
            
            interaction.reply({ embeds: [emb], ephemeral: true })
        }
        else {
            interaction.reply('burro.')
        }
    }
}