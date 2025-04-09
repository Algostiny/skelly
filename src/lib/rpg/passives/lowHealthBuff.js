const TemplatePassive = require("./TemplatePassive")

class lowHealthBoost extends TemplatePassive {
    constructor({ name, description, healthLimiarPercentage = 25, quotes, buff }) {
        super({ type: "buff" })

        this.name = name
        this.description = description
        this.quotes = quotes

        this.healthLimiarPercentage = healthLimiarPercentage
        this.active = false
        this.buff = buff
    }

    execute(me, target, fight) {
        if (me.hp / me.maxHp <= this.healthLimiarPercentage * 0.01) {
            if (!this.active) {
                this.active = true

                me.stats.str *= 1 + (this.buff.str || 0)
                me.stats.def *= 1 + (this.buff.def || 0)
                me.stats.spd *= 1 + (this.buff.spd || 0)

                return {log: [this.quotes.activation[Math.floor(Math.random() * this.quotes.activation.length)]]}
            }
        }
    }
}

module.exports = lowHealthBoost