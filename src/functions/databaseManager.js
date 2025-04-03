const fs = require('fs')
const db = new (require('better-sqlite3'))('src/database/users.db')

const tableCreated = false

module.exports = {
    writeJson(dir, data) {
        return new Promise(async (resolve, reject) => {
            if (dir && data) {
                await fs.writeFileSync(dir, JSON.stringify(data))
                resolve(200)
            }
            else reject('Parâmetros faltando - ' + dir)
        })
    },

    startDb() {
        try {
            db.exec(`
            CREATE TABLE IF NOT EXISTS users (
              id TEXT PRIMARY KEY,
              username TEXT,
              created_at TIMESTAP DEFAULT CURRENT_TIMESTAMP
            );

            -- Tabela de poderes (catalogo fixo)
            CREATE TABLE IF NOT EXISTS powers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL,
                prefix TEXT UNIQUE NOT NULL,
                description TEXT,
                obtain_method INTEGER DEFAULT 0,

                base_hp INTEGER DEFAULT 1,
                base_str INTEGER DEFAULT 1,
                base_def INTEGER DEFAULT 1,
                base_spd INTEGER DEFAULT 1
            );

            -- Tabela de relação usuário<->poderes
            CREATE TABLE IF NOT EXISTS users_powers (
                user_id TEXT NOT NULL,
                power_id TEXT NOT NULL,
                id INTEGER NOT NULL DEFAULT 0,

                mod_hp INTEGER DEFAULT 1,
                mod_str INTEGER DEFAULT 1,
                mod_def INTEGER DEFAULT 1,
                mod_spd INTEGER DEFAULT 1,
                nature INTEGER DEFAULT 1,

                atk1_mty INTEGER DEFAULT 0,
                atk2_mty INTEGER DEFAULT 0,
                atk3_mty INTEGER DEFAULT 0,
                atk4_mty INTEGER DEFAULT 0,
                atk5_mty INTEGER DEFAULT 0,
                lvl INTEGER DEFAULT 1,
                xp INTEGER DEFAULT 0,

                obtained_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, power_id, id),
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (power_id) REFERENCES powers(id)
            );
            `) // create all tables

            // db.exec(`INSERT INTO powers (name,prefix,description) VALUES ('star platinum', 'sp', 'ora')`)

            console.log('Database started with sucess')
        }
        catch (error) {
            console.log('Database not initialized')
            console.error(error)
        }
    },

    addUser(user) {
        try {
            let query = db.prepare(`
                INSERT INTO users (id) VALUES (?)
            `)

            query.run(user.id)
        }
        catch (err) {
            console.error(err)
        }
    },

    addPowerToUser(user, powerPrefix, attributs = {}) {
        try {
            let userInDb = db.prepare('SELECT id FROM users WHERE id = ?').get(user.id)
            if (!userInDb) {
                let query = db.prepare(`
                    INSERT INTO users (id) VALUES (?)
                `)

                query.run(user.id)
            }

            let powerId = db.prepare('SELECT id FROM powers WHERE prefix = ?').get(powerPrefix)
            if (!powerId) throw new Error(`Poder ${powerPrefix} não encontrado`)

            let maxPowerId = db.prepare('SELECT MAX(id) FROM users_powers WHERE user_id = ? AND power_id = ?').pluck().get(user.id,powerId.id) + 1|| 0
            let q = db.prepare(`
                INSERT INTO users_powers (user_id, power_id, id) VALUES (?, ?, ?)
            `)

            q.run(user.id, powerId.id, maxPowerId)
        }
        catch (err) {
            console.error(err)
        }
    },

    getUser(user) {
        try {
            let r = db.prepare('SELECT * FROM users WHERE id = ?').get(`${user.id}`)

            return r;
        }
        catch (err) {
            console.error(err)
        }
    },

    getUserPowers(user) {
        try {
            let powers = db.prepare('SELECT * FROM users_powers WHERE user_id = ?').all(`${user.id}`)

            return powers
        }
        catch (err) {
            console.error(err)
        }
    },

    getPowerList() {
        try {
            let powers = db.prepare('SELECT * FROM powers').all()

            return powers
        }
        catch (err) {
            console.error(err)
        }
    },

    updateUserPower(user, powerId, attributs = {}) {
        try {
            let { mod_hp, mod_str, mod_def, mod_spd, nature, atk1_mty, atk2_mty, atk3_mty, atk4_mty, atk5_mty, xp, lvl } = attributs
            let q = db.prepare(`
                UPDATE users_powers SET
                ${mod_hp  ? `mod_hp    = ${mod_hp}`   : ''}
                ${mod_str  ? `mod_str  = ${mod_str}`  : ''}
                ${mod_def  ? `mod_def  = ${mod_def}`  : ''}
                ${mod_spd  ? `mod_spd  = ${mod_spd}`  : ''}
                ${nature   ? `nature   = ${nature}`   : ''}
                ${atk1_mty ? `atk1_mty = ${atk1_mty}` : ''}
                ${atk2_mty ? `atk2_mty = ${atk2_mty}` : ''}
                ${atk3_mty ? `atk3_mty = ${atk3_mty}` : ''}
                ${atk4_mty ? `atk4_mty = ${atk4_mty}` : ''}
                ${atk5_mty ? `atk5_mty = ${atk5_mty}` : ''}
                ${xp       ? `xp       = ${xp}`       : ''}
                ${lvl      ? `lvl      = ${lvl}`      : ''}
                WHERE user_id = ? AND power_id = ?
            `)

            q.run(user.id, powerId)
        } catch (error) {
            console.error(error)
        }
    },

    removePowerFromUser(user, powerId) {
        try {
            let q = db.prepare('DELETE FROM users_powers WHERE id = ?')
        } catch (error) {
            console.error(error)
        }
    }
}