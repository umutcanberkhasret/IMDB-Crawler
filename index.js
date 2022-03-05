require('dotenv').config();

const scrapeOperationCenter = require('./tasks/scrapeOperationCenter.js')
const getMovieUrls = require('./tasks/getMovieUrls.js')
const addScrapedMovies = require('./tasks/addScrapedMoviesToDb.js')

const topMovies = "https://www.imdb.com/chart/top/?ref_=nv_mv_250"
const topTVShows = "https://www.imdb.com/chart/toptv/?ref_=nv_tvv_250"
const mostPopularMovies = "https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm"

const targetUrls = [
    {url: mostPopularMovies, collectionName: "mostPopularFilms"},
    {url: topMovies, collectionName: "Top250film"},
    {url: topTVShows, collectionName: "Top250tvShow"},
]

async function queueScrapeOperations(fns) {
    const values = [];

    await fns.reduce((previous, current, index, array) => {
        const thenable = index === 1 ? previous() : previous;
        return thenable.then(value => {
            values.push(value);
            return index === array.length - 1 ? current().then(value => values.push(value)) : current();
        });
    });

    return values;
}


async function main() {
    queueScrapeOperations(targetUrls.map((target) => async () => {
        // Specify the list of movies/tv series to be scraped
        let movieList = await getMovieUrls(target.url)
        // Scrape the given list of movies/tv series
        let scrapedMovieData = await scrapeOperationCenter(movieList, target.collectionName)

        // add scraped data to Mongodb
        await addScrapedMovies(scrapedMovieData, target.collectionName)

        console.log(scrapedMovieData.length, "entries are added to ", target.collectionName)

        // Cleanup before next iteration
        movieList = []
        scrapedMovieData = []

    })).then(() => console.log(
        "Scraped addresses: ", "\n",
        targetUrls[0].url, "\n",
        targetUrls[1].url, "\n",
        targetUrls[2].url
    ))
}

main().catch(err => console.log(err))


