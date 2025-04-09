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
    1: { // normal
        name: 'Normal',
        description: 'O básico, as vezes bem feito',
        effect: (power) => {
            return power
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
    sp: require('./powers/Star_Platinum.js'),
    bigmom: require('./powers/Big_Mom.js'),
}

function getPowerInfo(powerPrefix) {
    return Powers[powerPrefix] || null;
}

function getUserPowerInfo(power) {
    let power_info = Powers[power.power_id]
    if(!power_info) return null;

    let data = new Date(power.obtained_at)
    let atks = []

    let k = Object.keys(power_info.attacks)
    for (let i = 0; i < k.length; i++) {
        let atk = power_info.attacks[k[i]]
        atks.push(atk)
    }

    let updated_power = {
        id: power.id,
        name: power_info.name,
        description: power_info.description,
        prefix: power_info.prefix,

        hp: power.mod_hp + calcHP(power_info.stats,power.lvl),
        str: power.mod_str + power_info.stats.str,
        def: power.mod_def + power_info.stats.def,
        spd: power.mod_spd + power_info.stats.spd,
        pre: 0,//power.mod_pre + power_info.stats.pre,

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