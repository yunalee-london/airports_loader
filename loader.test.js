const loader = require('./loader')

describe("loader", () => {
    test("loads restaurants", (done) => {
        loader(db => {
            db.all('SELECT * FROM restaurants;', (err, rows) => {
                expect(rows.length).toBe(3)
                done()
 

            })
        })
    })
})


