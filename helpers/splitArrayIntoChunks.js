function splitArray(movieList) {
    let perChunk = 20

    let result = movieList.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / perChunk)
        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
        }
        resultArray[chunkIndex].push(item)
        return resultArray
    }, [])

    return result
}

module.exports = splitArray