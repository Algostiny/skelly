const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get a help with commands')
        .setNameLocalization('pt-BR', 'ajuda')
        .setDescriptionLocalization('pt-BR', 'Ganhe uma ajuda com os comandos'),
    execute: function (interaction, client) {
        // creating fields
        const commandsArr = Array.from(client.commands)
        const commandsLength = commandsArr.length

        var fieldsPages = []
        
        const pagesLength = Math.floor(commandsLength/6)+1
        for(let i = 0; i < pagesLength; i++){
            var page = []

            if (i == 0) page.push({name:'LINKS', value:'[Owner Info](https://linktr.ee/algostiny)\n[Suporte Server](https://discord.gg/WQuc5czqx6/)', inline: true})
            if (i == 0) page.push({name:'INFO', value:`Cmd's - \`${commandsLength}\`\nRuntime - \`${Math.floor((Date.now() - client.startTimestamp)*0.000016666667)}min\``, inline: true})

            for (let j = 0; j < 6; j++){
                let cmd = commandsArr[i*6 + j]
                
                if(cmd) {
                    cmd = cmd[1]

                    page.push({
                        name: `/${cmd.data.name}`,
                        value: `${cmd.data.description}`
                    })
                }
            }

            fieldsPages.push(page)
        }

        // creating the embed
        var emb = new EmbedBuilder()
        .setTitle('Help')
        .addFields(fieldsPages[0])
        .setColor('Purple')
        .setFooter({ text: '[arg] opcional | (arg) obrigatório' })

        interaction.reply({ embeds: [emb], ephemeral: true })

        // create page system...
    }
}