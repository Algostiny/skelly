const { Events, MessageFlags, AttachmentBuilder } = require('discord.js');
const cooldownTrigger = {}

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(client, msg) {
        let triggers = require('../cmds/special/trigger.js').exportTriggers(msg.guild.id)
        if (msg.author.bot) return;
        if (triggers) {

            let triggers_keys = Object.keys(triggers)
            for (let i = 0; i < triggers_keys.length; i++) {
                let trigger = triggers[triggers_keys[i]]

                if ((!trigger.user || trigger.user==msg.author.id) && msg.content.indexOf(triggers_keys[i]) != -1 && Math.random() * 100 <= trigger.probability && (!cooldownTrigger[msg.author.id] || cooldownTrigger[msg.author.id] < Date.now())) {
                    msg.reply({ content: trigger.msg })
                    cooldownTrigger[msg.author.id] = Date.now() + (trigger.cooldown*1000 || 5*1000)
                    break;
                }
            }
        }

        //

        if (msg.author.id == process.env.OWNERID && msg.content.indexOf('<ia>') != -1) {
            return msg.reply(await require('../functions/geminiApi.js').sendPost(msg.content.replace('<ia>', '')))
        }
        else if (msg.author.id == process.env.OWNERID && msg.content.indexOf('<imageia>') != -1) {
            let attach = new AttachmentBuilder(await require('../functions/geminiApi.js').genImage(msg.content.replace('<imageia>','')), {name: 'teste.png'})
            return msg.reply({ files: [attach]} )
        }
    }
};