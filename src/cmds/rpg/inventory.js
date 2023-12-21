const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { getInfo, updateInfo, addInfo } = require('../../functions/db.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('See all items you own')
        .setNameLocalization('pt-BR', 'inventario')
        .setDescriptionLocalization('pt-BR', 'Veja todos itens que você possui')
        // page option
        .addIntegerOption(option =>
            option
                .setName('page')
                .setDescription('Your inventory page')
                .setNameLocalization('pt-BR', 'pagina')
                .setDescription('pt-BR', 'A página do seu inventário')
        )
        // private option
        .addBooleanOption(option =>
            option
                .setName('private')
                .setDescription('Make your inventory private')
                .setNameLocalization('pt-BR', 'privado')
                .setDescription('pt-BR', 'Deixe privado o seu inventário')
        ),
    execute: function (interaction, client) {
        // get arguments
        const private = interaction.options.getBoolean('private') ?? false
        const page = interaction.options.getInteger('page') ?? 1

        // get user info
        getInfo(interaction.user, async (err, r) => {
            if (err) {
                let emb = new EmbedBuilder()
                    .setTitle('Houve algum problema')
                    .setDescription('Contate o suporte ou tente novamente')
                    .setColor('Red')

                return interaction.reply({ ephemeral: true, embeds: [emb] })
            }

            // if user has no inv items
            const userInfo = r[0]
            if (!userInfo) {
                let emb = new EmbedBuilder()
                    .setTitle('Você não possui nada')
                    .setDescription('Seu inventário está completamente vazio')
                    .setColor('Purple')
                    .setImage('https://i.pinimg.com/originals/e1/8f/aa/e18faabc59cc16f590520c89b82ebc56.gif')

                return interaction.reply({ ephemeral: true, embeds: [emb] })
            }
            else {
                // check how many items user has
                const userInv = JSON.parse(userInfo.inv.replace(/'/g, '"'))
                const userInvArr = Object.entries(userInv)
                var manyItems = 0

                for (let qty of Object.values(userInv)) {
                    manyItems += qty
                }

                if (manyItems <= 0) {
                    let emb = new EmbedBuilder()
                        .setTitle('Você não possui nada')
                        .setDescription('Seu inventário está completamente vazio')
                        .setColor('Purple')
                        .setImage('https://i.pinimg.com/originals/e1/8f/aa/e18faabc59cc16f590520c89b82ebc56.gif')

                    return interaction.reply({ ephemeral: true, embeds: [emb] })
                }

                // define pages of inv
                var pages = []
                let pagesLength = Math.floor(userInvArr.length/6)+1

                for (let i = 0; i < pagesLength; i++){
                    var page = []

                    for (let j = 0; j < 6; j++){
                        let item = userInvArr[i*6 + j]
                        if(item){
                            page.push({name: item[0], value: `${item[1]}`, inline: true })
                        }
                    }

                    pages.push(page)
                }
                
                // first embed
                let emb = new EmbedBuilder()
                .setTitle('Inventário')
                .setColor('Purple')
                .addFields(pages[page-1] ?? pages[0])
                
                const resMsg = await interaction.reply({ ephemeral: private, embeds:[emb] })
            }
        })
    }
}