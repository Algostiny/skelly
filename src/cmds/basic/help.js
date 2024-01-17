const { SlashCommandBuilder, EmbedBuilder, ButtonStyle, ActionRowBuilder, ComponentType, ButtonBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get a help with commands')
        .setNameLocalization('pt-BR', 'ajuda')
        .setDescriptionLocalization('pt-BR', 'Ganhe uma ajuda com os comandos')
        .addStringOption(option => option
            .setName('command')
            .setDescription('Command to get info')
            .setNameLocalization('pt-BR', 'comando')
            .setDescriptionLocalization('pt-BR', 'Comando para ver informações')),
    execute: async function (interaction, client) {
        const optionString = interaction.options.getString('command')
        if (optionString) {
            const cmd = client.commands.get(optionString) || client.commands.get(client.aliases.get(cmd))

            if (!cmd) { // caso o comando n exista
                let emb = new EmbedBuilder()
                .setTitle('Esse comando não existe')
                .setDescription(`Use \`/help\` para ver a lista de comandos`)
                .setColor('Red')

                return interaction.reply({ embeds: [emb], ephemeral: true })
            }
            
            var embed = new EmbedBuilder()
            // prefixed
            if (cmd.data.prefixed) {
                embed.setTitle(cmd.data.name.toUpperCase())
                .setDescription(cmd.data.description)
            }
            // not prefixed
            else {
                embed.setTitle(cmd.data.name_localizations['pt-BR'].toUpperCase())
                .setDescription(cmd.data.description_localizations['pt-BR'])
            }

            // send msg
            return interaction.reply({ embeds: [emb], ephemeral: true })
        }
        
        // creating fields
        const commandsArr = Array.from(client.commands)
        const commandsLength = commandsArr.length

        var fieldsPages = []
        var pageNow = 0;
        
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
                        name: `${cmd.data.prefixed?process.env.PREFIX:'/'}${cmd.data.name}`,
                        value: `${cmd.data.description}`
                    })
                }
            }

            fieldsPages.push(page)
        }

        // creating the embed
        var emb = new EmbedBuilder()
        .setTitle('Help')
        .addFields(fieldsPages[pageNow])
        .setColor('Purple')
        .setFooter({ text: `Pg 1/${pagesLength}` })

        // create page system...
        let btBack = new ButtonBuilder()
        .setCustomId('back')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('◀️')

        let btStop = new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('stop')
        .setEmoji('❌')

        let btFoward = new ButtonBuilder()
        .setCustomId('foward')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('▶️')

        let rowBt = new ActionRowBuilder()
        .addComponents(btBack, btStop, btFoward)

        //
        const r = await interaction.reply({ embeds: [emb], ephemeral: true, components: [rowBt] })
        let collectorFilter = m => m.user.id === interaction.user.id
        const collector = r.createMessageComponentCollector({componentType: ComponentType.Button, filter: collectorFilter, time: 60_000})

        collector.on('collect', i => {
            i.deferUpdate()
            if (i.customId == 'back') {
                pageNow -= 1
                if (pageNow < 0) pageNow = pagesLength-1
            }
            else if(i.customId == 'foward') {
                pageNow += 1
                if (pageNow > pagesLength-1) pageNow = 0
            }
            else{ 
                collector.stop()
                return
            }

            emb = new EmbedBuilder()
            .setTitle('Help')
            .addFields(fieldsPages[pageNow])
            .setColor('Purple')
            .setFooter({ text: `Pg ${pageNow+1}/${pagesLength}` })

            r.edit({ embeds: [emb], ephemeral: true, components: [rowBt] })
        })

        collector.on('end', () => {
            r.edit({ embeds: [emb], ephemeral: true, components: [] })
        })
    }
}