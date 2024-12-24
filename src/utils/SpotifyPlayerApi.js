

export default class SpotifyPlayerApi {

    constructor(accessToken, userID) {
        this.accessToken = accessToken
        this.userID = userID
        this.apiUrl = 'https://api.spotify.com/v1/'
    }

    async getPlaybackState() {
        return fetch(this.apiUrl + `me/player`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error ('error getting playback state', response)
            }

            if(response.status === 200) {
                return response.json()
            } else {
                return response
            }
        }).then((data) => {

            // will only return valid playback state if there is an *active* playback
            console.log("PlaybackState: ", data)
            return data
        }).catch((err) => {
            console.log("error:", err)
        })
    }

    async getDevices() {
        return fetch(this.apiUrl + `me/player/devices`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error ('error getting playback state', response)
            }
            return response.json()
        }).then((data) => {
            // console.log("Active devices: ", data)
            return data
        }).catch((err) => {
            console.log("error:", err)
        })
    }

    async transferPlayback(id) {
        // switch playback devices
        return fetch(this.apiUrl + 'me/player', {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            },
            body: JSON.stringify({
                device_ids: [id],
                play: true // continue playback on new device
            })
        }).then((response) => {
            if(!response.ok) {
                throw new Error ("Error transfering playback")
            }
            // returns a 204 on successful playback
            return true

        }).catch((err) => {
            console.log("err", err)
        })
    }

    
    async setShuffle(shuffleState, deviceID) {
        // will start playback if no current playback state, otherwise will jsut toggle shuffle on and off.
        return fetch(this.apiUrl + `me/player/shuffle?state=${shuffleState}&device_id=${deviceID}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error ("Error setting shuffle state")
            }

            // returns a 204 response, no json
            // console.log("Shuffle set")
        }).catch((err) => {
            console.log("err: ", err)
        })
    }

    async shufflePlay() {
        // I may be overthinking this too, I mean what are the instances in which I would toggleshuffle with NO playback happening?
        console.log("Toggling shuffle with no playback")
        this.getPlaybackState()
    }


    async play(context, uris, contextOffset, deviceID) {
        const payload = {
            ...(context ? { context_uri: context } : {}),
            ...(uris && uris.length ? { uris: uris } : {}),

            // conditional check for context
            ...(contextOffset ? { offset: {position: contextOffset }} : {}),
                // -- the original line without condition
            // offset: {
            //     position: contextOffset
            // },
            position_ms: 0
        }

        fetch(this.apiUrl + `me/player/play?device_id=${deviceID}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            },
            body: JSON.stringify(payload)
        }).then((response) => {
            if(!response.ok) {
                throw new Error ("Error on playback")
            }

        }).catch((err) => {
            console.log("err", err)
        })
    }

    async pause() {
        
    }

    async previous() {
        
    }

    async next() {

    }
}