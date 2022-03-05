const scrapeMoviePage = require('./scrapeMoviePage.js')
const splitArrayIntoChunks = require('../helpers/splitArrayIntoChunks.js')
const calculatePercentage = require('../helpers/calculatePercentage.js')


let scrapedMovieData = []

async function scrapeOperationCenter(movieList, collectionName) {
    console.log("scraped number of shows: #", movieList.length, " will be written to ", collectionName)

    movieList = splitArrayIntoChunks(movieList)
    console.log(collectionName)

    for (let counter = 0; counter < movieList.length; counter++) {
        await scrapeOperation(movieList[counter])
        console.log("Scraping process is at ", calculatePercentage(counter + 1, movieList.length + 1),"%")
    }
    let temp = scrapedMovieData

    scrapedMovieData = []
    return temp
}

async function scrapeOperation(movieList) {
    await Promise.all(
        movieList.map(async movie => {
            await scrapeMoviePage(movie, scrapedMovieData)
        })
    )
}

module.exports = scrapeOperationCenter


