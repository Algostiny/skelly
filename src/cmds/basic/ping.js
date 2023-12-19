const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong...'),
    execute: function (interaction, client) {
        let emb = new EmbedBuilder()
        .setTitle('Pong 🏓')
        .setDescription(`Latency - \`${Date.now() - interaction.createdTimestamp}ms\`\nAPI - \`${Math.round(client.ws.ping)}ms\``)
        .setColor('Purple')

        interaction.reply({ embeds: [emb] })
    }
}