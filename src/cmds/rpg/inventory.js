const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { getUser, getUserPowers } = require('../../utils/databaseManager.js')
const { NatureFlags, PowerTypeFlags, getPowerInfo, getUserPowerInfo, calcHP } = require('../../lib/rpg/rpgModule.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('Display what you have')
        .setNameLocalization('pt-BR', 'inventario')
        .setDescriptionLocalization('pt-BR', 'Exiba o que você possui')
        .addSubcommand(o =>
            o.setName('powers')
                .setNameLocalization('pt-BR', 'poderes')
                .setDescription('Display the powers you have (Stands, Shikais, Etc.)')
                .setDescriptionLocalization('pt-BR', 'Exiba os poderes que você possui (Stands, Shikais, Etc.)')
                .addIntegerOption(o =>
                    o.setName('power')
                        .setNameLocalization('pt-BR', 'poder')
                        .setDescription('The id of power you posses')
                        .setDescriptionLocalization('pt-BR', 'O id de algum poder seu')
                )
        ),

    execute(client, interaction) {
        let cmd = interaction.options.getSubcommand('command')

        switch (cmd) {
            case 'powers':
                let db_user = getUser(interaction.user)
                if(!db_user)    return interaction.reply({ flags: [MessageFlags.Ephemeral], content: 'Parece que você não possui nenhum poder, tente começar usando `/inicio`'})

                let user_powers = getUserPowers(interaction.user)
                if (user_powers.length <= 0)    return interaction.reply({ flags: [MessageFlags.Ephemeral], content: 'Parece que você não possui nenhum poder, tente começar usando `/inicio`'})

                let idChoice = interaction.options.getInteger('power')
                if (idChoice) {
                    let power = user_powers.filter(i => i.id == idChoice)[0]
                    if (!power) {
                        return interaction.reply({ content: 'Parece que você não possui esse poder, utilize `/inventario poderes` para ver a sua lista de poderes e utilize o `ID` corretamente', flags: [MessageFlags.Ephemeral] })
                    }

                    let powerInfo = getUserPowerInfo(power)

                    let emb = new EmbedBuilder()
                    .setTitle(powerInfo.name)
                    .setDescription(powerInfo.description)
                    .setColor(powerInfo.color)
                    .addFields({ name: 'Status', value: `HP=\`${powerInfo.hp}\` STR=\`${powerInfo.str}\` DEF=\`${powerInfo.def}\` SPD=\`${powerInfo.spd}\`\nXP=\`${powerInfo.xp}\`/\`${powerInfo.need_xp}\` LVL=\`${powerInfo.lvl}\`\nNATURE=\`${NatureFlags[power.nature].name}\``, inline:true})
                    // .addFields({ name: 'Maestrias', value: `LVL=\`${powerInfo.lvl}\` XP=\`${powerInfo.xp}/${powerInfo.lvl*5}\`\n${powerInfo.atks.map(atk => `\`${atk.name}\`=\`${atk.maestry}\``).join('\n')}`, inline:true})
                    .addFields({ name: 'Ataques', value: 'Uma lista completa dos ataques:', inline:false})
                    
                    if(powerInfo.imgs && powerInfo.imgs.pose) emb.setImage(powerInfo.imgs.pose)
                    for(let atk of powerInfo.atks) {
                        emb.addFields({name: atk.name, value: `${atk.description}\n${atk.base_dmg ? `DMG=\`${atk.base_dmg+atk.rand_dmg/2}\`\n`:''}PRE=\`${atk.precision*100}\``,inline:true})
                    }
                    
                    return interaction.reply({ embeds: [emb], flags: [MessageFlags.Ephemeral]})
                }

                let fields = []

                for (let i = 0; i < user_powers.length; i++) {
                    let user_power = user_powers[i]
                    let power_info = getUserPowerInfo(user_power)
                    
                    fields.push({
                        name: `${power_info.name.toUpperCase()} - ${power_info.prefix.toUpperCase()}`,
                        value: `**HP**=\`${power_info.hp}\` **STR**=\`${power_info.str}\`\n**DEF**=\`${power_info.def}\`**SPD**=\`${power_info.spd}\`\n**LVL**=\`${power_info.lvl}\` **XP**=\`${power_info.xp}/${power_info.need_xp}\`\n**OBTIDO**=\`${power_info.obtained_at}\`\n**NATURE**=\`${NatureFlags[power_info.nature].name}\`\n**ID**=\`${power_info.id}\``,
                        inline: true
                    })
                }

                let emb = new EmbedBuilder()
                    .setTitle('Poderes')
                    .setDescription('Para se referenciar a algum poder, utilize sempre o seu ID representado aqui')
                    .setFields(fields)
                    .setFooter({ text: 'Informações adicionais use /inventory powers <id>' })

                interaction.reply({ embeds: [emb], flags: [MessageFlags.Ephemeral] })
                break;
            default:
                break;
        }
    }
}