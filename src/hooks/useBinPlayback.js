// import {useState} from 'react'
import {getRandomNumberSet, parseSpotifyId, parseUriType, shuffleArray} from '../utils/utils'
import {useApiContext} from '../context/ApiContext'
import {useWebplayerContext} from '../Dashboard'

export default function useBinPlayback(bin) {

    const {spotifyApi, spotifyPlayerApi} = useApiContext()
    const {activeDevices = []} = useWebplayerContext() || {}
    // console.log("active devices", activeDevices)

    async function startPlayback() {
        const activeDevice= activeDevices.find(device => device.name === "RecollectiveApp");

        if(!activeDevice) {
            alert("Error on playback: No active device.")
            return
        }

        if(bin?.content) {
            const pool = getPlaylistIds(10) // ah, need to handle this?

            // create the object ({playlist1: 2, etc})
            const poolObject = createRandomPoolObject(pool) 

            // gen the playlist with the pool ibject
            const content = await getPoolObjects(poolObject)


            if(content) {
                const binPlaylist = await genPlaylist(content)


                let shuffledArray = shuffleArray(binPlaylist);

                spotifyPlayerApi.play(null, shuffledArray.slice(0, 20), 0, activeDevice.id)

                setTimeout(() => {
                    spotifyApi.getUsersQueue()
                }, 1000)
            }
        } else {
            console.log("No bin")
        }
    }


    async function genPlaylist(pool) {

        let trackPromises = pool.map(async (item) => {
            if (item.tracks.items.length > 50) {
                // use offset to make sure tracks after 50 can be included in the playlist
                const offset = item.total - 50;
                const response = await fetchPlaylistItemsWithOffset(offset, item.id);
                const items = response.items;
                return items.map(track => track.track.uri);
            } else {
                return item.tracks.items.map(track => track.uri);
            }
        });
    
        const tracks = await Promise.all(trackPromises);
    
        const flatTracks = tracks.flat();
    
        return flatTracks;
    }

    async function getPoolObjects(pool) {
        let returnedPoolObjects = []

        const fetchAlbums = async () => {
            const response = await spotifyApi.getSeveralAlbums(pool['albums'])
            
            if(!response) {
                throw new Error ("err getting several albums")
            }

            returnedPoolObjects.push(...response.albums)
        }

        const fetchPlaylist = async (id) => {
            const response = await spotifyApi.getPlaylist(id)
            if(!response) {
                throw new Error ('err getting playlist')
            }

            const items = {items: response.tracks.items.map(item => item.track)}
            const total = response.tracks.total

            // console.log("Playlist resposne", response)
            let formatPlaylist = {
                ...response,
                tracks: items,
                total
            }
            returnedPoolObjects.push(formatPlaylist)
        }

        if(pool['albums'].length > 0) {
            await fetchAlbums()
        }

        if(pool['playlists'].length > 0) {
            await Promise.all(

                pool['playlists'].map(playlistId => fetchPlaylist(playlistId))
            )
        }
        return returnedPoolObjects
    }

    function getPlaylistIds(num) {
        // num the amound of playlist IDs to include
        let pool = []

        if(bin.content.length > num) {
            let randoms = getRandomNumberSet(0, bin.content.length - 1, num)

            randoms.forEach(index => {
                if(index >= 0 && index < bin.content.length) {
                    pool.push(bin.content[index].uri)
                }   
            })
        } else {
            bin.content.forEach((item) => {
                pool.push(item.uri)
            })
        }
        return pool
    }

    function createRandomPoolObject(pool) {
        let formattedPool = {
            'albums': [],
            'playlists': []
        }

        pool.forEach((item) => {
            if(parseUriType(item) === 'album') {
                formattedPool['albums'].push(parseSpotifyId(item))
            } else if(parseUriType(item) === 'playlist') {
                formattedPool['playlists'].push(parseSpotifyId(item))
            }
        })

        return formattedPool
    }
    
    async function fetchPlaylistItemsWithOffset(offset,  id) {
        // in the case of playlist with > 50 items, fetch with an offset

        // lets say a playlist has 85 tracks. Spotify will return the first 50 by default, and I want to get 50 tracks. So the offset needs to be min 0 and max length - 50? So an offset of 35 would return tracks 35-85
        // console.log("Fetching with offset", offset)

        try {
            const response = await spotifyApi.getPlaylistItems(offset, id)

            if(!response) {
                throw new Error ("no response from playlist item request")
            }

            // return the track items
            // const items = {items: response.items.map(item => item.track)}
            const items = { items: response.items.map(item => ({ track: item.track })) };

            console.log("Fetching palylist Items", items)
            return items
        } catch (err) { 
            console.log("err", err)
        }

    }
    
    // async function fetchAlbums(albums) {

    //     if(albums.length > 0) {
    //         try {
    //             const response = await spotifyApi.getSeveralAlbums(albums)

    //             if(!response) {
    //                 throw new Error ("error fetching several alums")
    //             }

    //             return response.albums
    //         } catch (err){
    //             console.log("err ", err)
    //             return []
    //         }
    //     } else {
    //         return []
    //     }

    // }


    return {startPlayback}
}