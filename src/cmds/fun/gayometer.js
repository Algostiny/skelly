const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gayometer')
        .setDescription('Test how many someone burns the rosca')
        .setNameLocalization('pt-BR', 'gayometro')
        .setDescriptionLocalization('pt-BR', 'Teste quanto alguém queima a rosca')
        .addUserOption(option =>
            option.setName('target')
            .setNameLocalization('pt-BR', 'alvo')
            .setDescription('The user to test')
            .setDescriptionLocalization('pt-BR', 'O usuário a ser testado')
        ),
    execute: function (interaction, client) {
        const gayPics = [
            "https://media.discordapp.net/attachments/950528767837741096/1193335196670492792/dante.gif",
            "https://media.discordapp.net/attachments/950528767837741096/1193334932907511818/jojoGay.gif",
            "https://media.discordapp.net/attachments/950528767837741096/1193335197408694333/bonchan.gif"
        ]
        
        const specialPics = {
            "636006100834975754": "https://media.discordapp.net/attachments/950470900296323155/1193334852292980827/Snapchat-1890474190.jpg?ex=65b5912f&is=65a31c2f&hm=a23946d8fc1579e2941f527ca5abc253d1e7864d9b3ca59cd093d63e52d407db&=&format=webp&width=400&height=180",
            "652948763987410944": "https://media1.tenor.com/m/hHwMQpLGCcQAAAAd/kermit-gay-kermit-potion.gif"
        }

        const target = interaction.options.getUser('target') ?? interaction.user

        // calc the percentage
        const randomness_multiplier = 6;

        let result = `${target.id}`
        result = parseInt(`${result[0]}${result[2]}${result[5]}${result[1]}`) * randomness_multiplier * Math.floor(Date.now() / (1000 * 3600 * 24 * 7))
        result = `${result}`
        result = parseInt(`${result[0]}${result[1]}`)
        if (result == 38) result = 100

        // set the image
        let img = gayPics[Math.floor((result * gayPics.length)/100)]

        let emb = new EmbedBuilder()
        .setTitle('Gayômetro')
        .setDescription(`O usuário <@!${target.id}> é \`${result}%\` gay`)
        .setImage(specialPics[target.id] ?? img)
        .setColor('Random')
        
        console.log(emb)
        interaction.reply({ embeds: [emb]})
    }
}