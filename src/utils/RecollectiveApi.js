
export default class RecollectiveApi {
    
    constructor(spotifyID, userID) {
        this.spotifyID = spotifyID,
        this.userID = userID,
        this.apiUrl = import.meta.env.VITE_RECOLLECTIVE_URL
    }


    async getUser() {
        return fetch(this.apiUrl + `/me`, {
            credentials: "include"
        }).then((response) => {
            if(!response.ok) {
                throw new Error
            }
            return response.json()
        }).then((data) => {
            return data
        })
    }

    async getUserBins() {
        return fetch(this.apiUrl + `/bins`, {
            credentials: "include"
        }).then((response) => {
            if(!response.ok) {
                throw new Error('error getting user bins')
            }
            return response.json()
        }).then((data) => {
            return data
        }).catch((err) => {
            console.log("err: ", err)
        })
    }

    async getBin(id) {
        return fetch(this.apiUrl + `/bins/${id}`, {
            credentials: "include"
        }).then((response) => {
            if(!response.ok) {
                throw new Error ("err getting bin")
            }
            return response.json()
        }).then((data) => {
            return data
        }).catch((err) => {
            return {error: err}
        })
    }

    async addToBin(binID, payload) {
        return fetch(this.apiUrl + `/bins/${binID}`, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then((response) => {
            if(!response.ok) {
                throw new Error ("error adding to bin")
            }
            return response.json()
        }).then((data) => {
            console.log(data)
            return data
        }).catch((err) => {
            console.log("Error", err)
        })
    }

    async removeFromBin(id) {
  
    }

    async deleteBin(id) {
        console.log("Making bin delete request.", this.apiUrl)
        return fetch(this.apiUrl + `/bins/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userID: this.userID
            })
        }).then((response) => {
            if(!response.ok) {
                throw new Error ("error deleting bin")
            }
            return response.json() 
        }).then((data) => {
            console.log("Successfully deleted bin.", data)
        }).catch((err) => {
            console.log("Err: ", err)
        })
    }

    async modifyBinDetails(id, name) {
        // BIN ID is id, userID is in payload, along with name
        fetch(this.apiUrl + `/bins/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userID: this.userID,
                name
            })
        }).then((response) => {
            if(!response.ok) {
                throw new Error ("Error modifying bin details")
            }
            return response.json()
        }).then((data) => {
            console.log("bin modify response", data)
        }).catch((err) => {
            console.log("Err: ", err)
        })
    }
    async startBinPlayback(bin) {

        // handle logic for generating random track playlists, and then passing that on to spotify.
        let playlistPool;
        if(bin?.content) {
            playlistPool = genBinPlaylist(bin)
            // console.log("playlist pool", playlistPool)
        } else {
            throw new Error('error on bin playback')
        }

        getBinPlaylist(playlistPool)
        

        // using the playlist pool, run the algorith to generate a 20 track playlist

        // basically, provide playlistPool to some 'getTracks' function that returns 20 random tracks from the tracks within all the playlists
    }
}

function getBinPlaylist(pool) {
    // make not that this is running twice?
    let poolSelectionObj = {

    }

    // map pool to the new obj
    let randomTrackAmount = pool.reduce((acc, uri) => {
        acc[uri] = Math.floor(Math.random() * 3) + 1; 
        return acc;
    }, {}); 

    console.log(randomTrackAmount)

    let binPlaylist = [] // array of track uris

    // using randomTrackAmount (1-3), make a request using the playlistURI
    pool.forEach((item) => {
        // make a request, fetching the tracks for each item
        // item = uri, randomTrackAmount[item] = number of tracks to pull from the playlist

        // the big challenge here, don't make too many requests to API
        

        // check item type and make request for relevant
        if(parseUriType(item) === 'album') {
            // fetch album

            const fetchAlbum = async (id) => {
                console.log('fetching album', id)
                const response = await spotifyApi.getAlbum(id)
                if(!response) {
                    throw new Error ('error fetching album')
                }
                return response
            }
            fetchAlbum(parseSpotifyId(item))
        } else if(parseUriType(item) === 'playlist') {
            // fetch playlist
            console.log("fetching playlist", item)
        } else {
            throw new Error("uri type not supported")
        }
    })
}

function parseSpotifyId(uri) {
    return uri.split(':')[2]
}
function parseUriType(uri) {
    // return the uri type album or playlist
    return uri.split(":")[1]
}

function _tenRandomNums(min, max) {
    let randoms = new Set()
    while(randoms.size < 10) {
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        randoms.add(num)
    }
    return randoms
}


function genBinPlaylist(bin) {

    let playlistPool = []

    if(bin.content.length > 10) {
        // get 10 random playlist URIs to add to binPool
        let randoms = _tenRandomNums(0, bin.content.length - 1)
        console.log("random index", randoms)
        // use the random numbers to draw from the bin content
        randoms.forEach(index => {
            if (index >= 0 && index < bin.content.length) {
                // add the uris not the whole object
                playlistPool.push(bin.content[index].uri);
            }
        });
    } else {
        // adds the total number of playlist URIs to the binPool
        bin.content.forEach((item) => {
            playlistPool.push(item.uri)
        })
    }
    return playlistPool
}

