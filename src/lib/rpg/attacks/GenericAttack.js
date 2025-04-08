const TemplateAttack = require('./TemplateAttack.js');

class GenericAttack extends TemplateAttack {
    constructor ({name, description, id, lvlRequired=0, power=0, critChance=0.01, quotes, precision}) {
        super({
            name, description, id, lvlRequired, critChance, quotes, precision, type:"physical"
        })
    }

    execute(me, target, battle) {
        if (!this.calcHit(this, me, target)) return { sucess: false, log: this.quotes.fail[Math.floor(Math.random()*this.quotes.fail.length)] }

        let dmg = this.calcDmg(this, me, target)
        target.hp -= dmg

        return { sucess: true, log: [this.quotes.sucess_atk[Math.floor(Math.random()*this.quotes.sucess.length)].replace('%DMG%',dmg), this.quotes.sucess_def[Math.floor(Math.random()*this.quotes.sucess.length)].replace('%DMG%',dmg)] }
    }
}

module.exports = GenericAttack