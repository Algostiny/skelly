const fs = require('fs')
const path = require('path')

module.exports.run = (client) => {
    console.log('Started handling all events')

    fs.readdir(path.join(__dirname, '../events/'), (err, files) => {
        if (err) return console.error(err);

        for (let file of files) {
            if (!file.endsWith('.js')) continue;

            let info = require(path.join(`../events/${file}`))
            client.on(info.name, (interaction) => {
                info.execute(client,interaction)
            })
        }
    })

    console.log('Sucessfully handled all events')
}