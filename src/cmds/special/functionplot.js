const { SlashCommandBuilder, AttachmentBuilder, MessageFlags } = require('discord.js');

const executePython = require('../../functions/createPythonPromise.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('functionplot')
        .setDescription('Plot a math expression')
        .setNameLocalization('pt-BR','graficofuncao')
        .setDescription('Plote o gráfico de uma expressão matemática')
        .addStringOption(input =>
            input.setName('function')
            .setDescription('A função para plotar o gráfico')
            .setRequired(true)
        ),

    whitelist: [712389918877286450],

    async execute(client, interaction) {
        if(this.whitelist.includes(interaction.user.id)) return interaction.reply({content: 'Você não tem permissão para utilizar esse comando', flags: [MessageFlags.Ephemeral]})
        let funcao = interaction.options.getString('function');

        try {
            let r = await executePython('generatePlot', funcao)

            try {
                const base64Image = r.plot.split(';base64,').pop();
                const imageBuffer = Buffer.from(base64Image, 'base64');

                const attachment = new AttachmentBuilder(imageBuffer, { name: 'graph.png' });
                
                // Send the image in Discord
                await interaction.reply({
                    files: [attachment],
                    content: 'grafico',
                });
            } catch (error) {
                console.error('Error sending image:', error);
                await interaction.reply('falhou kk');
            }
        }
        catch (err) {console.log(err)}
    }
}