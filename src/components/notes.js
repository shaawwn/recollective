
function _tenRandomNums(min, max) {
    let randoms = new Set()
    while(randoms.size < 10) {
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        randoms.add(num)
    }
    return randoms
}

let randoms = _tenRandomNums(80, 100)
// console.log(randoms)

randoms.forEach((num) => {
    console.log("num", num)
})

function genBinPlaylist(bin) {

    let playlistPool = []

    if(bin.content.length > 10) {
        // get 10 random playlist URIs to add to binPool
        let randoms = _tenRandomNums(0, bin.content.length - 1)

        // use the random numbers to draw from the bin content
        randoms.forEach(index => {
            if (index >= 0 && index < bin.content.length) {
                playlistPool.push(bin.content[index]);
            }
        });
    } else {
        // adds the total number of playlist URIs to the binPool
        bin.content.forEach((item) => {
            playlistPool.push(item)
        })
    }
    return playlistPool
}
