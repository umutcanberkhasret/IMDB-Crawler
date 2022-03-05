const cheerio = require("cheerio");
const axios = require("axios");

// depending on the geographic location, you may retrieve data in local language. By setting header as below, enables
// you to get only preferred language.
const axiosInstance = axios.create({
    headers: {
        "Accept-Language": "en-US,en;"
    }
})
const baseURl = "https://www.imdb.com/"

let urls = []

async function getMovieUrls(targetURL) {
    let response = await axiosInstance.get(targetURL)
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)
            const titleColumn = $(".titleColumn")

            titleColumn.each(function (i, element) {
                let movieTitle = $(element).find("a").text()
                let url = baseURl + $(element).find("a").attr('href')

                urls.push({
                    movieTitle,
                    url
                })
            })

            let finalUrlList = urls
            urls = []

            return finalUrlList
        })
    return response
}

module.exports = getMovieUrls
