const {Database} = require('sqlite3')
const db = new Database(':memory:')
const restaurants = require('./restaurants')
const menus = require('./menus')

const insert = (restaurants, callback, db) => {
    if (restaurants.length === 0) return callback(db)

    const restaurant = restaurants.pop()
    db.run('INSERT INTO restaurants(id, name, image) VALUES (?,?,?);', Object.values(restaurant), function(err) {
        if (err) throw new Error(err)
        insert(restaurants, callback, db)
    })
}

function loader (callback) {
    db.run('CREATE TABLE IF NOT EXISTS restaurants(id INTEGER PRIMARY KEY, name TEXT, image TEXT);', function(err){
        insert(restaurants, callback, db)
        
    })

}

module.exports = loader