// import all things and create db
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('assets/database.db')

db.serialize(() => {
    //db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, inv TEXT, powers TEXT)') //default table command
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
    getInfo: async (user, cb) => {
        if (!user) return '!User'

        // do all things and run callback
        db.each(`SELECT * FROM users WHERE id=${user.id}`, (err, r) => {
            cb(r)
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
        if (inv && powers) query = query + `inv = ${inv}, powers = ${powers}`
        else if (inv) query = query + `inv = ${inv}`
        else if (powers) query = query + `powers = ${powers}`
        query = query + `WHERE id = ${user.id}`

        // execute the query
        const q = db.prepare(query)
        q.run()
        q.finalize()

        return 200
    }
}