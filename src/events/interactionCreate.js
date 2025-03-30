const { Events, MessageFlags } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	execute(client, interaction) {
        let cmd = client.commands.get(interaction.commandName)
        if (!cmd) return interaction.reply({flags: MessageFlags.Ephemeral, content: 'Parece que houve um problema com esse comando :('})

        cmd.execute(client,interaction)
	}
};