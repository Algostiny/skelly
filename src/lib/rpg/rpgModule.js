const PowerTypeFlags = {
    1: 'Stand',
    2: 'Shikai',
    3: 'Akuma no Mi',
    4: 'Cursed Energy'
}

const ObtainMethodFlags = {
    0: 'Unob',
    1: 'Arrow'
}
const NatureFlags = {
    1: {
        name: 'Abissal',
        description: 'Utiliza as energias do vazio e..',
        effect: (power) => {
            let newPower = power
            newPower.str *= 1.25
            newPower.def /= 1.25

            newPower.str = Math.round(newPower.str)
            newPower.def = Math.round(newPower.def)
            return newPower
        }
    },
    2: 'Cursed',
    3: 'Blessed',
    4: 'Infernal',
    5: 'Angelical',
    6: 'Berserk',
    7: 'Akuma',
    8: 'Kami',
    9: 'Vagabond',
    10: 'Guardian',
}

function calcHP(stats,lvl) {
    let q = Math.round(lvl*Math.pow(stats.def, 0.8)*0.1+ Math.pow(stats.def, 0.9))
    return 50 + Math.floor(q * 0.2) * 5
}

const Powers = {
    sp: require('./powers/Star_Platinum.js')
}

function getPowerInfo(powerPrefix) {
    return Powers[powerPrefix] || null;
}

function getUserPowerInfo(power) {
    let power_info = powers[power.power_id]
    if(!power_info) return null;

    let data = new Date(power.obtained_at)
    let atks = []
    for (let i = 0; i < Object.keys(power_info.attacks).length; i++) {
        let atk = power_info.attacks[i]
        atks.push(atk)
    }

    let updated_power = {
        id: power.id,
        name: power_info.name,
        description: power_info.description,
        prefix: power_info.prefix,

        hp: power.mod_hp + power_info.status.hp,
        str: power.mod_str + power_info.status.str,
        def: power.mod_def + power_info.status.def,
        spd: power.mod_spd + power_info.status.spd,
        pre: power.mod_pre + power_info.status.pre,

        atks,
        color: power_info.color,
        imgs: power_info.imgs,

        nature: power.nature,
        lvl: power.lvl,
        xp: power.xp,
        need_xp: power.lvl * 5,
        obtained_at: `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}/${data.getFullYear()}`
    }

    updated_power = NatureFlags[updated_power.nature].effect(updated_power)
    return updated_power
}

module.exports = {
    Powers,
    NatureFlags,
    PowerTypeFlags,

    calcHP,

    getPowerInfo,
    getUserPowerInfo
}