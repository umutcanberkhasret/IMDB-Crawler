const username = process.env.MONGO_USERNAME
const password = process.env.MONGO_PASSWORD

function getConnectionURL() {
    return `mongodb+srv://${username}:${password}@movies.oeqsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
}

module.exports = getConnectionURL