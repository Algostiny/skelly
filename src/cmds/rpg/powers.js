const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')
const { getInfo } = require('../../functions/db.js')
const powersInfo = require('../../../assets/Powers.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('powers')
        .setDescription('See all powers you own')
        .setNameLocalization('pt-BR', 'poderes')
        .setDescriptionLocalization('pt-BR', 'Veja todos poderes que você possui')
        // page option
        .addIntegerOption(option =>
            option
                .setName('page')
                .setDescription('Your exibition page')
                .setNameLocalization('pt-BR', 'pagina')
                .setDescription('pt-BR', 'A página de exibição dos seus poderes')
        )
        // private option
        .addBooleanOption(option =>
            option
                .setName('private')
                .setDescription('Make yours powers private')
                .setNameLocalization('pt-BR', 'privado')
                .setDescription('pt-BR', 'Deixe privado os seus poderes')
        ),
    execute: function (interaction, client) {
        // get arguments
        const private = interaction.options.getBoolean('private') ?? false
        const page = interaction.options.getInteger('page') ?? 1

        // get user info
        getInfo(interaction.user, async (err, userInfo) => {
            if (err) {
                let emb = new EmbedBuilder()
                    .setTitle('Houve algum problema')
                    .setDescription('Contate o suporte ou tente novamente')
                    .setColor('Red')
                console.log(err)
                return interaction.reply({ ephemeral: true, embeds: [emb] })
            }

            // if user has no inv items
            if (!userInfo) {
                let emb = new EmbedBuilder()
                    .setTitle('Você não possui nada')
                    .setDescription('Você não possui poder algum')
                    .setColor('Red')
                    .setImage('https://i.pinimg.com/originals/e1/8f/aa/e18faabc59cc16f590520c89b82ebc56.gif')

                return interaction.reply({ ephemeral: true, embeds: [emb] })
            }
            else {
                // check how many items user has
                const invSlots = userInfo.powSlots || 6
                const userInv = userInfo.powers
                const userInvArr = Object.entries(userInv)
                var manyItems = 0

                for (let qty of Object.values(userInv)) {
                    manyItems += qty
                }

                if (manyItems <= 0) {
                    let emb = new EmbedBuilder()
                        .setTitle('Você não possui nada')
                        .setDescription('Você não possui poder algum')
                        .setColor('Red')
                        .setImage('https://i.pinimg.com/originals/e1/8f/aa/e18faabc59cc16f590520c89b82ebc56.gif')

                    return interaction.reply({ ephemeral: true, embeds: [emb] })
                }

                // define pages of inv
                var pages = []
                let pagesLength = Math.floor(userInvArr.length / 6) + 1
                var slotsUsed = 0

                for (let i = 0; i < pagesLength; i++) {
                    var paged = []

                    for (let j = 0; j < 6; j++) {
                        let item = userInvArr[i * 6 + j]

                        if (item) {
                            slotsUsed += 1
                            let item_info = powersInfo[item[0]] ?? { name: item[0], description: 'Um poder desconhecido....' }
                            paged.push({ name: item_info.name, value: `LVL \`${item[1].lvl}\``, inline: true })
                        }
                    }

                    pages.push(paged)
                }

                // buttons
                if (pagesLength > 1) {
                    var backBt = new ButtonBuilder()
                        .setCustomId('b')
                        .setLabel('<')
                        .setStyle(ButtonStyle.Primary)

                    var nextBt = new ButtonBuilder()
                        .setCustomId('n')
                        .setLabel('>')
                        .setStyle(ButtonStyle.Primary)

                    var buttonRow = [new ActionRowBuilder()
                        .addComponents(backBt, nextBt)]
                }

                // first embed
                let emb = new EmbedBuilder()
                    .setTitle('Poderes')
                    .setColor('Purple')
                    .addFields(pages[page - 1] ?? pages[0])
                    .setFooter({ text: `${slotsUsed}/${invSlots}` })

                var response = await interaction.reply({ ephemeral: private, embeds: [emb], components: buttonRow ?? []})
                var actualPage = page;

                const collector = response.createMessageComponentCollector({ time: 1000*30 })
                collector.on('collect', async i => {
                    if(i.customId == 'b'){
                        actualPage = actualPage - 1
                        if(actualPage < 1) actualPage = pagesLength
                    }
                    else if(i.customId == 'n'){
                        actualPage = actualPage + 1
                        if(actualPage > pagesLength) actualPage = 1
                    }

                    var embed = new EmbedBuilder()
                    .setTitle('Poderes')
                    .setColor('Purple')
                    .addFields(pages[actualPage - 1] ?? pages[0])
                    .setFooter({ text: `${slotsUsed}/${invSlots}` })

                    i.deferUpdate()
                    interaction.editReply({ ephemeral: private, embeds: [embed], components: buttonRow })
                })

                collector.on('end', ()=>{
                    var embed = new EmbedBuilder()
                    .setTitle('Poderes')
                    .setColor('Purple')
                    .addFields(pages[actualPage - 1] ?? pages[0])
                    .setFooter({ text: `${slotsUsed}/${invSlots}` })

                    interaction.editReply({ ephemeral: private, embeds: [embed], components: [] })
                })
            }
        })
    }
}