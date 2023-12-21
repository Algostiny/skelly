const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const fs = require('fs')
const path = require('path')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reload a comand')
        .setNameLocalization('pt-BR', 'recarregar')
        .setDescriptionLocalization('pt-BR', 'Recarregue algum comando')
        // command option
        .addStringOption(option =>
            option
                .setName('command')
                .setNameLocalization('pt-BR', 'comando')
                .setDescription('The command to reload')
                .setDescriptionLocalization('pt-BR', 'O comando para recarregar')
        ),
    execute: function (interaction, client) {
        // check if user is the owner
        if (interaction.user.id != process.env.OWNER) {
            let emb = new EmbedBuilder()
                .setTitle('Você não possui permissão')
                .setDescription(`Esse comando pode ser utilizado exclusivamente por <@${process.env.OWNER}>`)
                .setColor('Red')

            return interaction.reply({ embeds: [emb], ephemeral: true })
        }

        // if has no command option
        if (!interaction.options._hoistedOptions[0]) {
            let emb = new EmbedBuilder()
                .setTitle('Um comando deve ser especificado')
                .setDescription(`Exemplo: \`/reload inventory\``)
                .setColor('Red')

            return interaction.reply({ embeds: [emb], ephemeral: true })
        }

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
}