const cheerio = require("cheerio")
const axios = require("axios")

// headers are added for both mimicking a real user request and choosing the language of the retrieved data
const axiosInstance = axios.create({
    headers: {
        "Accept-Language": "en-us,en;q=0.8,de-de;q=0.5,de;q=0.3",
        "Referer": "https://www.imdb.com/",
        "sec-ch-ua": "Google Chrome;v=95, Chromium;v=95, ;Not A Brand;v=99",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "Windows",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
    }
})


let scrapeMoviePage = async (movie, scrapedMovieData) => {
    let response = await axiosInstance.get(movie.url)
        .then(async (response) => {
            const html = await response.data
            const $ = cheerio.load(html)

            let posterURL = $('div[data-testid="hero-media__poster"]').find('div>img').attr('src')
            let title = $('h1[data-testid="hero-title-block__title"]').text().trim()
            let productionYear = $('a[class="ipc-link ipc-link--baseAlt ipc-link--inherit-color TitleBlockMetaData__StyledTextLink-sc-12ein40-1 rgaOW"]').text().slice(0, 4)
            let duration = $('div[class="TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2 hWHMKr"]').find('ul>li').last().text().trim()
            let imdbRating = $('span[class="AggregateRatingButton__RatingScore-sc-1ll29m0-1 iTLWoV"]').first().text()
            let filmDescription = $('div[data-testid="storyline-plot-summary"]').find('div>div').text()
            let imdbID = $('meta[property="imdb:pageConst"]').attr('content')
            let stars = []
            let genres = []
            let directors = []

            // Scraping Director
            $('li[data-testid="title-pc-principal-credit"]').first().find('div[class="ipc-metadata-list-item__content-container"]>ul[class="ipc-inline-list ipc-inline-list--show-dividers ipc-inline-list--inline ipc-metadata-list-item__list-content baseAlt"]>li[class="ipc-inline-list__item"]>a[class="ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link"]')
                .each((i, directorInstance) => {
                    directors.push($(directorInstance).text())
                })

            // Scraping Genre
            $('li[data-testid="storyline-genres"]').find('div>ul>li').each((i, genre) => {
                genres.push($(genre).find('a').text())
            })
            // Scraping Stars
            $('div[class="ipc-sub-grid ipc-sub-grid--page-span-2 ipc-sub-grid--wraps-at-above-l ipc-shoveler__grid"]')
                .find('div[data-testid="title-cast-item"]>div[class="StyledComponents__CastItemSummary-sc-y9ygcu-11 keoaUD"]>a[data-testid="title-cast-item__actor"]')
                .each((i, star) => {
                    stars.push($(star).text())
                })

            scrapedMovieData.push({
                imdbID,
                title,
                posterURL,
                imdbRating,
                genres,
                productionYear,
                duration,
                directors,
                stars,
                filmDescription
            })
        })
    return scrapedMovieData
}

module.exports = scrapeMoviePage