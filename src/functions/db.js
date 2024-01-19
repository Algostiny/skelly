// import all things and create db
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('assets/database.db')

db.serialize(() => {
    // db.run('CREATE TABLE users (id TEXT PRIMARY KEY, inv TEXT, powers TEXT)') //default table command
    // db.run('CREATE TABLE blacklist (id TEXT PRIMARY KEY)') //default table command
})

// exporting the db and all methods
module.exports = {
    db,
    /**
    * @param {Object} user - Somebody user
    * @param {Number} user.id - Somebody user id
    * @param {Object} inv - Inventory of user 
    * @param {Object} powers - Powers of user
    */
    addInfo: async (user, inv, powers) => {
        if (!user) return '!User'
    
        // add user info
        const q = db.prepare('INSERT INTO users VALUES (?,?,?)')
        q.run(user.id, inv || '{}', powers || '{}')
        q.finalize()

        return 200
    },
    /**
    * @param {Object} user - Somebody user
    * @param {Number} user.id - Somebody user id
    * @param {Function} cb - Callback 
    */
    getInfo: async (user, callback) => {
        if (!user) return '!User'
        if(process.env.OWNER.split('-').includes(user.id)) {

            var obj = {}
            obj.id = user.id
            obj.inv = {}
            obj.powers = {}

            for (let item of Object.keys(require('../../assets/Items.js'))) {
                obj.inv[item] = 1
            }

            for (let power of Object.keys(require('../../assets/Powers.js'))) {
                obj.powers[power] = { lvl: 999 }
            }

            return callback(false, obj)
        }

        // do all things and run callback
        db.all(`SELECT * FROM users WHERE id=${user.id}`, (err, r)=>{
            if(!r || !r[0]){
                var response = false;
            }
            else {
                response = r[0]
                response.inv = JSON.parse(response.inv.replace(/'/g, '"'))
                response.powers = JSON.parse(response.powers.replace(/'/g, '"'))
            }
            callback(err,response)
        })
    },
    /**
    * @param {Object} user - Somebody user
    * @param {Number} user.id - Somebody user id
    * @param {Object} inv - Inventory of user 
    * @param {Object} powers - Powers of user
    */
    updateInfo: async (user, inv, powers) => {
        if (!user) return '!User'
        if (!inv && !powers) return '!Data'

        // make the query
        var query = 'UPDATE users SET'
        if (inv && powers) query = query + ` inv="${inv}", powers="${powers}"`
        else if (inv) query = query + ` inv="${inv}"`
        else if (powers) query = query + ` powers="${powers}"`
        query = query + ` WHERE id="${user.id}"`

        // execute the query
        const q = db.prepare(query)
        q.run((err)=>{
            if(err)console.error(err)
        })
        q.finalize()

        return 200
    },
    /**
    * @param {Object} user - Somebody user
    * @param {Number} user.id - Somebody user id
    */
   blockUser: async (user) => {
        if (!user) return '!User'

        // exec the query
        const q = db.prepare('INSERT INTO blacklist VALUES (?)')
        q.run(user.id)
        q.finalize()

        require('../handlers/Events.js').blockUser(user.id)
        return 200
   },
   unblockUser: async (user) => {
        if (!user) return '!User'    

        // exec the query
        const q = db.prepare(`DELETE FROM blacklist WHERE id="${user.id}"`)
        q.run()
        q.finalize()    

        require('../handlers/Events.js').unblockUser(user.id)
        return 200
   },
   exportAllBlock: async (cb) => {
        db.all(`SELECT * FROM blacklist`, (err, r)=>{
        cb(err,r || [])
    })
   }
}