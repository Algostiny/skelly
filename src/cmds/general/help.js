const { SlashCommandBuilder, EmbedBuilder, MessageFlags, Embed, SlashCommandStringOption, SlashCommandIntegerOption, SlashCommandSubcommandBuilder, SlashCommandUserOption } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get some help with the commands')
        .setNameLocalization('pt-BR', 'ajuda')
        .setDescriptionLocalization('pt-BR', 'Consiga ajuda com os comandos')
        .addStringOption(o =>
            o.setName('command')
                .setNameLocalization('pt-BR', 'comando')
                .setDescription('If you need help with a specific command')
                .setDescriptionLocalization('pt-BR', 'Caso queira ajuda com algum comando específico')
        ),

    execute(client, interaction) {
        let cmd_choice = interaction.options.getString('command')
        if (cmd_choice) {
            let cmd_info = client.commands.find(item => item.data.name == cmd_choice.toLowerCase() || item.data.name_localizations && item.data.name_localizations['pt-BR'] == cmd_choice.toLowerCase())
            if (!cmd_info) return interaction.reply({ content: `O comando \`${cmd_choice}\` não existe ou esta indisponível`, flags: [MessageFlags.Ephemeral] })

            let fields = []
            if (cmd_info.data.options) {
                for (let i = 0; i < cmd_info.data.options.length; i++) {
                    let option = cmd_info.data.options[i]
                    let type = {
                        SlashCommandStringOption: 'Texto',
                        SlashCommandIntegerOption: 'Número Inteiro',
                        SlashCommandSubcommandBuilder: 'Subcomando',
                        SlashCommandUserOption: 'Usuário'
                    }[option.constructor.name]

                    fields.push({name:'Opção '+(i+1), value: `Nome: ${option.name.name_localizations ? option.name.name_localizations['pt-BR']: option.name}\nTipo: ${type}\nObrigatório: ${type!='Subcomando' ? (option.required ? 'Sim' : 'Não') : '-'}`, inline:true})
                }
            }

            let emb = new EmbedBuilder()
                .setTitle(cmd_info.data.name.charAt(0).toUpperCase() + cmd_info.data.name.slice(1))
                .setDescription(cmd_info.data.description_localizations ? cmd_info.data.description_localizations['pt-BR'] : (cmd_info.data.description || "Descrição indisponível"))
                .setFields(fields)
            return interaction.reply({ embeds: [emb], flags: [MessageFlags.Ephemeral] })
        }

        let fields = []

        let cmds = [...client.commands.first(10).entries()]
        for (let i = 0; i < cmds.length; i++) {
            let cmd = cmds[i]
            fields.push({ name: cmd[0], value: cmd[1].data.description_localizations ? cmd[1].data.description_localizations['pt-BR'] : (cmd[1].data.description || "Descrição indisponível") })
            if (i >= 10) break;
        }

        let emb = new EmbedBuilder()
            .setTitle('Ajuda')
            .setDescription(`Caso queira ajuda com algum comando, utilize \`/ajuda <comando>\``)
            .setFields(fields)

        interaction.reply({ embeds: [emb], flags: [MessageFlags.Ephemeral] })
    }
}