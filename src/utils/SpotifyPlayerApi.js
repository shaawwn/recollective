

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
            return response.json()
        }).then((data) => {
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
            console.log("Active devices: ", data)
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