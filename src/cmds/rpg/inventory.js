const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('See all items you own')
        .setNameLocalization('pt-BR', 'inventario')
        .setDescriptionLocalization('pt-BR', 'Veja todos itens que você possui')
        .addIntegerOption(option => 
            option
            .setName('page')
            .setDescription('Your inventory page')
            .setNameLocalization('pt-BR', 'pagina')
            .setDescription('pt-BR', 'A página do seu inventário')
        )
        .addBooleanOption(option =>
            option
            .setName('private')
            .setDescription('Make your inventory private')
            .setNameLocalization('pt-BR', 'privado')
            .setDescription('pt-BR', 'Deixe privado o seu inventário')
        ),
    execute: function (interaction, client) {

    }
}