import {handleResponse} from '../utils/utils'

export default class SpotifyApi {

    constructor(accessToken, userID) {
        this.accessToken = accessToken
        this.userID = userID
        this.apiUrl = 'https://api.spotify.com/v1/'
    }

    getUserID() {
        return this.userID
    }

    async getUserTopItems(types) {
        // types = 'tracks' or 'artists'
        return fetch(this.apiUrl + `me/top/${types}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error("Error getting users top items")
            }
            return response.json()
        }).then((data) => {
            return data
        })
    }

    async getCurrentUserPlaylists(limit, offset) {
        // limit and offset can be empty strings 
        return fetch(`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`, {
            headers: {
                "Authorization": `Bearer ${this.accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error
            }

            return response.json()
        }).then((data) => {
            
            // filter out null playlists here
            data.items = data.items.filter(Boolean)
            return data
        })
    }

    async getUsersSavedAlbums(limit, offset) {
        return fetch(this.apiUrl + `me/albums?limit=${limit}&offset=${offset}`, {
            headers: {
                "Authorization": `Bearer ${this.accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error ("error getting users savedalbums")
            }
            return response.json()
        }).then((data) => {
            return data
        }).catch((err) => {
            return {error: err}
        })
    }

    // playlist related methods
    async getPlaylist(id) {
        return fetch(this.apiUrl + `playlists/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                // if(response.status === 429) {
                //     const retryAfter = response.headers.get('Retry-After') || 2; 
                //     console.log(`Rate limited. Retrying after ${retryAfter} seconds...`);
                //     setTimeout(() => {
                //         // Retry logic here
                //     }, retryAfter * 1000);
                // }
                throw new Error("Error fetching playlist")
            }
            return response.json()
        }).then((data) => {
            return data
        }).catch((err) => {
            return {error: err}
        })
    }

    modifyPlaylistDetails(id, payload) {
        console.log("Payload", payload)
        fetch(this.apiUrl + `playlists/${id}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            },
            body: JSON.stringify(payload)
        }).then((response) => {
            if(!response.ok) {
                throw new Error ("error modifying playlist details")
            }
            return {message: "playlist updated"}
        }).catch((err) => {
            return {error: err}
        })
    }

    async unfollowPlaylist(playlistID) {
        // *NOTE* there is no formal "delete" option with spotify, to effectively "delete" a playlist, the playlist creator must "unfollow" the playlist.
        return fetch(this.apiUrl + `playlists/${playlistID}/followers`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        }).then((response) => {
            if(!response.ok){
                throw new Error ("Error unfollowing or deleting playlist")
            }
            // returns a 200 response
        }).then(() => {
            console.log("Playlist unfollowed or deleted")
        }).catch((err) => {
            console.log("Err: ", err)
        })
    }
    // album related methods
    async getAlbum(id) {
        return fetch(this.apiUrl + `albums/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error("Error fetching album")
            }
            return response.json()
        }).then((data) => {
            return data
        }).catch((err) => {
            return {error: err}
        })
    }

    async getSeveralAlbumsTracksOnly(albums) {
        return fetch(this.apiUrl + `albums?ids=${albums}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error("error fetching several albums")
            }
            return response.json()
        }).then((data) => {
            return data
        }).catch((err) => {
            console.log("err: ", err)
        })
    }

    async getSeveralAlbums(albums) {

        return fetch(this.apiUrl + `albums?ids=${albums}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error("error fetching several albums")
            }
            return response.json()
        }).then((data) => {
            return data
        }).catch((err) => {
            console.log("err: ", err)
        })
    }

    async getPlaylistItems(offset, id) {
        // use the offset to get selected tracks within a range.

        return fetch(this.apiUrl + `playlists/${id}/tracks?limit=50&offset=${offset}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        }).then(handleResponse)
        .then((data) => {
            return data
        })
    }

    async getAlbumTracksWithOffset(offset, id) {
        // use the offset to get selected tracks within a range.

        return fetch(this.apiUrl + `/albums/${id}/tracks?offset=${offset}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error("Error getting tracks with offset")
            }
            return response.json()
        }).then((data) => {
            return data
        }).catch((err) => {
            console.log("err", err)
        })
    }

    async createPlaylist(playlistName) {
        return fetch(this.apiUrl + `users/${this.userID}/playlists`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            },
            body: JSON.stringify({name: playlistName})
        }).then((response) => {
            if(!response.ok) {
                throw new Error('Error creating new playlist')
            }
            return response.json()
        }).then((data) => {
            return data
        })
    }

    async addTracksToPlaylist(id, payload) {
        // can specify order in playlist later
        return fetch(this.apiUrl + `playlists/${id}/tracks`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            },
            body: JSON.stringify(payload)
        }).then((response) => {
            if(!response.ok) {
                throw new Error ("Error adding track/s to playlist")
            }
            // returns a snapshot_id of playlist (string)
            return response.json() 
        }).then((data) => {
            return data
        }).catch((err) => {
            console.log("Error adding tracks to palylist", err)
        })
    }

    async removeTracksFromPlaylist(id, payload) {
        return fetch(this.apiUrl + `playlists/${id}/tracks`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }, 
            body: JSON.stringify(payload)
        }).then((response) => {
            if(!response.ok) {
                throw new Error ('error removing tracks from playlist')
            }
            // return snapshot_id for playlist
            return response.json()
        }).then((data) => {
            return data
        }).catch((err) => {
            console.log("error: ", err)
        })
    }


    async getArtist(id) {
        return fetch(this.apiUrl + `artists/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error
            }
            return response.json()
        }).then((data) => {
            return data
        }).catch((err) => {
            return {error: err}
        })
    }


    async getArtistContentFromFilter(id, filters) {
        // can filter artist content by groups, eg album, compilation, singles, appears_on
        // console.log("api request to get from filter")
        return fetch(this.apiUrl + `artists/${id}/albums?limit=50&include_groups=${filters}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error
            }
            return response.json()
        }).then((data) => {
            return data
        }).catch((err) => {
            return {error: err}
        })
    }

    async getArtistAlbums(id) {
        return fetch(this.apiUrl + `artists/${id}/albums?limit=50`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error
            }
            return response.json()
        }).then((data) => {
            return data
        }).catch((err) => {
            return {error: err}
        })
    }

    async getArtistTopTracks(id) {
        return fetch(this.apiUrl + `artists/${id}/top-tracks`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error ("error getting artist top tracks")
            }
            return response.json()
        }).then((data) => {
            return data
        }).catch((err) => {
            return {error: err}
        })
    }

    async getUserSavedArtistAlbums(albums, savedAlbums) {
        // not stricly an API call, but given artist albums (playlist, singles, comps, etc) and an object of content that is saved by the user, return an object of user saved items.
        const savedContent = albums.filter((album) => {
            // console.log(album.id, savedAlbums)
            return savedAlbums[album.id] === true
        })
        // console.log("saved content", savedContent)
        return savedContent

    }


    async checkUserSavedAlbums(ids) {
        // check if one or more albums are already in a users library
        // can use to "filter" if a user has saved albums from an artist, use the album IDs and check

        return fetch(this.apiUrl + `me/albums/contains?ids=${ids}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        }).then(handleResponse)
        .then((data) => {
            // console.log("data", data)

            // map the data values to the given ids
            const savedContent = ids.reduce((obj, ids, index) => {
                obj[ids] = data[index];
                return obj;
            }, {});
            // console.log(combined)
            return savedContent
            // return data
        }).catch((err) => {
            console.log("err", err)
        })
    }
    async getRecommendations(seeds) {
        // seeds an array of spotify uris {seed_artists, seed_tracks, genre_seeds}

        return fetch(this.apiUrl + `recommendations?seed_artists=${seeds.seed_artists}&seed_tracks=${seeds.seed_tracks}&seed_genres=${seeds.seed_genres}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            },
        }).then((response) => {
            if(!response.ok) {
                throw new Error ("error getting track recommendations")
            }
            return response.json()
        }).then((data) => {
            return data
        }).catch((err) => {
            console.log("err", err)
        })
    }

    async getUsersQueue() {
        return fetch(this.apiUrl + `me/player/queue`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        }).then(handleResponse)
        .then((data) => {
            // console.log("users queue: ", data)
            return data
        })
    }

    async fetchNextUrl(url) {
        // some spotify returned objects that are paginated have a "next" attribute that returns the next results, use that url to make the request instead of the specific ones endpoints (getAlbums, getPlaylists, etc) 
        return fetch(url, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        }).then(handleResponse)
        .then((data) => {
            return data
        })
    }
}
