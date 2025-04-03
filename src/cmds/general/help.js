const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get some help with the commands')
    .setNameLocalization('pt-BR', 'ajuda')
    .setDescriptionLocalization('pt-BR', 'Consiga ajuda com os comandos')
    .addStringOption(o =>
        o.setName('command')
        .setNameLocalization('pt-BR','comando')
        .setDescription('If you need help with a specific command')
        .setDescriptionLocalization('pt-BR','Caso queira ajuda com algum comando específico')
    ),

    execute (client, interaction) {
        let fields = []

        let emb = new EmbedBuilder()
        .setTitle('Ajuda')
        .setDescription(`Caso queira ajuda com algum comando, utilize \`/ajuda <comando>\``)
        .addFields()

        interaction.reply({ embeds: [emb] })
    }
}