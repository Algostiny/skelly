const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const path = require('path')
var votes = {}
var votados = {}

let loaded = require('../../database/voteBestWizkka.json')
if (loaded.votes && loaded.votados) {
    votes = loaded.votes
    votados = loaded.votados
}

const dbPath = path.join(__dirname, '../../database/voteBestWizkka.json')
setInterval(() => {
    require('../../functions/databaseManager.js').writeJson(dbPath, { votes, votados })
}, 3000)

module.exports = {
    data: new SlashCommandBuilder()
    .setName('votebest')
    .setNameLocalization('pt-BR','votarbest')
    .setDescription('Vote em algum membro para BEST MEMBER WIZKKA')
    .addUserOption(o =>
        o.setName('membro')
        .setDescription('O membro para votar')
        .setRequired(true)
    ),

    async execute (client, interaction) {
        let member = interaction.options.getUser('membro')
        
        if(member.bot) return interaction.reply({content: 'Você não pode botar em bots, infelizmente.. Podia votar em mim :(', flags: [MessageFlags.Ephemeral]})
        if(votados[interaction.user.id]) return interaction.reply({content: 'Você já fez o seu voto!', flags: [MessageFlags.Ephemeral]})

        if(votes[member.id]) votes[member.id] += 1
        else votes[member.id] = 1

        votados[interaction.user.id] = true
        interaction.reply({content: 'Parabéns! Você fez seu voto para BEST MEMBER WIZKKA', flags: [MessageFlags.Ephemeral]})
    },

    getVotes() {return votes}
}