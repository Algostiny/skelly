const { SlashCommandBuilder, AttachmentBuilder, PermissionFlagsBits, MessageFlags, EmbedBuilder } = require('discord.js');
const triggers = {}

module.exports = {
    data: new SlashCommandBuilder()
    .setName('trigger')
    .setDescription('Send a custom message after a trigger in a specific moment')
    .setNameLocalization('pt-BR', 'tag')
    .setDescriptionLocalization('pt-BR', 'Envie uma mensagem customizada em um momento específico')
    // .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addSubcommand(subcmd => 
        subcmd.setName('add')
        .setDescription('Add a new trigger')
        .setDescriptionLocalization('pt-BR','Adicione uma nova tag')
        .addStringOption( option =>
            option.setName('trigger')
            .setNameLocalization('pt-BR','ativador')
            .setDescription('The text to trigger the msg')
            .setDescriptionLocalization('pt-BR','O texto para ativar a tag')
            .setRequired(true)
        )
        .addStringOption( option =>
            option.setName('msg')
            .setNameLocalization('pt-BR','mensagem')
            .setDescription('The message')
            .setDescriptionLocalization('pt-BR','A mensagem')
            .setRequired(true)
        )
        .addIntegerOption( option =>
            option.setName('probability')
            .setNameLocalization('pt-BR','probabilidade')
            .setDescription('The chance of activate the tag; DEFAULT = 100%')
            .setDescriptionLocalization('pt-BR','A chance de ativar a mensagem; DEFAULT = 100%')
        )
        .addIntegerOption( option =>
            option.setName('cooldown')
            .setDescription('Cooldown to activate; DEFAULT = 5s')
        )
        .addUserOption(option =>
            option.setName('user')
            .setDescription('Target')
        )
    )
    .addSubcommand(subcmd => 
        subcmd.setName('remove')
        .setNameLocalization('pt-BR','remover')
        .setDescription('Remove a trigger')
        .setDescriptionLocalization('pt-BR','Remova alguma tag')
        .addStringOption(option =>
            option.setName('trigger')
            .setNameLocalization('pt-BR','tag')
            .setDescription('The trigger to remove')
            .setDescriptionLocalization('pt-BR','A tag para remover')
            .setRequired(true)
        )
    )
    .addSubcommand(subcmd => 
        subcmd.setName('list')
        .setNameLocalization('pt-BR','listar')
        .setDescription('List all triggers')
        .setDescriptionLocalization('pt-BR','Liste todas tags')
    ),

    execute (client, interaction) {
        if (interaction.user.id != process.env.OWNERID) return interaction.reply({ flags: [MessageFlags.Ephemeral], content:'para'});
        
        let subcmd = interaction.options.getSubcommand()
        switch (subcmd) {
            case 'add':
                if(!triggers[interaction.guild.id]) triggers[interaction.guild.id] = {}
                triggers[interaction.guild.id][interaction.options.getString('trigger')] = {
                    creator: interaction.user.id,
                    msg: interaction.options.getString('msg'),
                    probability: interaction.options.getInteger('probability') || 100,
                    user: interaction.options.getUser('user')?.id || null,
                    cooldown: interaction.options.getInteger('cooldown')
                }
                interaction.reply({ flags: [MessageFlags.Ephemeral], content: 'Adicionado a tag com sucesso!'})
                break;
            case 'remove':
                triggers[interaction.guild.id][interaction.options.getString('trigger')] = null
                interaction.reply({ flags: [MessageFlags.Ephemeral], content: 'Removido a tag com sucesso!'})
                break;
            case 'list':
                let guild_triggers = triggers[interaction.guild.id]
                if(!guild_triggers) return interaction.reply({ flags:[MessageFlags.Ephemeral], content: 'Nesse servidor não há tags registradas'})
                let all_triggers = Object.keys(guild_triggers)
                let emb = new EmbedBuilder()
                .setTitle('Tags')
                .addFields(all_triggers.map(i => { return {name: i, value: `Autor: <@${guild_triggers[i].creator}>; Msg: ${guild_triggers[i].msg}; Prob.: ${guild_triggers[i].probability}%`}}))

                interaction.reply({ flags: [MessageFlags.Ephemeral], embeds:[emb] })
                break;
            default:
                break;
        }
    },

    exportTriggers(guildId) {
        return triggers[guildId];
    }
}