const TemplateAttack = require('./TemplateMove.js');

class GenericAttack extends TemplateAttack {
    constructor ({name, description, id, lvlRequired=0, power=0, critChance=0.01, quotes, precision}) {
        super({
            name, description, id, lvlRequired, critChance, quotes, precision, type:"attack", precision
        })
    }

    execute(me, target, battle) {
        let hit = this.calcHit(this, me, target)
        if (!hit.sucess) return { sucess: false, log: this.quotes.fail[Math.floor(Math.random()*this.quotes.fail.length)], hit }

        let dmg = this.calcDmg(this, me, target)
        target.hp -= dmg

        return { sucess: true, log: [this.quotes.sucess_atk[Math.floor(Math.random()*this.quotes.sucess_atk.length)].replace('%DMG%',dmg), this.quotes.sucess_def[Math.floor(Math.random()*this.quotes.sucess_def.length)].replace('%DMG%',dmg)] }
    }
}

module.exports = GenericAttack