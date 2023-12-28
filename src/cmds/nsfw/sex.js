const { SlashCommandBuilder, EmbedBuilder, EmbedAssertions } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sex')
        .setDescription('DO SEX')
        .setNameLocalization('pt-BR', 'sexo')
        .setDescriptionLocalization('pt-BR', 'FAÇA SEXO')
        .setNSFW(true),
    execute: function (interaction, client) {
        let emb = new EmbedBuilder
    }
}