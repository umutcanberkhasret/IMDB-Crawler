const {MongoClient} = require("mongodb")
const getConnectionURL = require("../helpers/getConnectionURL")

let url = getConnectionURL()
const client = new MongoClient(url)
const dbName = process.env.DBNAME

async function addScrapedMovies(listOfMovies, collectionName) {
    try {
        await client.connect()
        console.log("Connected correctly to Mongo server")
        console.log("Write process starting..")

        const db = client.db(dbName)
        const col = db.collection(collectionName)

        Promise.all(listOfMovies.map(async (movie) => {
            await col.insertOne(movie)
        })).finally(async () => {
            console.log("Write complete")
            await client.close()
        })

    } catch (err) {
        console.log(err.stack)
    }
}

module.exports = addScrapedMovies