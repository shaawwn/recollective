// There is enough logic here I think to create it's own component. Maybe I can also set basic playback to this component as well?
import PropTypes from 'prop-types'
import {useBinPlayback} from '../hooks/barrel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay} from '@fortawesome/free-solid-svg-icons'



export default function BinPlaybackButton({bin}) {
    const {startPlayback} = useBinPlayback(bin)

    function handleClick(e) {
        e.stopPropagation()
        startPlayback()
    }


    return (
        <div 
            onClick={(e) => handleClick(e)}
            className="playback-btn play-btn"
            >
            <FontAwesomeIcon icon={faPlay} size="2x"/>
        </div>
    )
}

BinPlaybackButton.propTypes = {
    bin: PropTypes.object.isRequired
}
// I BELIEVE EVERYTHING WAS MOVED TO THE USEBINPLAYBACK HOOK
    // function startBinPlayback() {
    //     // return an array of uris to randomly draw tracks from
    //     let playlistPool;
    //     if(bin?.content) {
    //         playlistPool = genBinPlaylist(bin)
    //     } else {
    //         throw new Error ("error on bin playback")
    //     }

    //     let formattedPool = {
    //         'albums': {},
    //         'playlists': {}
    //     }

    //     playlistPool.forEach((item) => {

    //         if(parseUriType(item) === 'album') {
    //             formattedPool['albums'][parseSpotifyId(item)] = Math.floor(Math.random() * 3) + 1
    //         } else if(parseUriType(item) === 'playlist') {
    //             formattedPool['playlists'][parseSpotifyId(item)] = Math.floor(Math.random() * 3) + 1
    //         }
    //     })


    //     getBinPlaylist(formattedPool)


    // }

    // function genBinPlaylist(bin) {

    //     let playlistPool = []
    
    //     if(bin.content.length > 10) {
    //         // get 10 random playlist URIs to add to binPool
    //         let randoms = _tenRandomNums(0, bin.content.length - 1)
    //         randoms.forEach(index => {
    //             if (index >= 0 && index < bin.content.length) {
    //                 playlistPool.push(bin.content[index].uri);
    //             }
    //         });
    //     } else {
    //         // adds the total number of playlist URIs to the binPool
    //         bin.content.forEach((item) => {
    //             playlistPool.push(item.uri)
    //         })
    //     }
    //     return playlistPool
    // }

    // async function getTotalReturnedItems(pool) {
    //     let returnedItems = []

    //     const fetchAlbums = async () => {
    //         const response = await spotifyApi.getSeveralAlbums(Object.keys(pool['albums']))
    //         if(!response) {
    //             throw new Error('err getting albums')
    //         }
    //         // returns array of album objects
    //         returnedItems.push(...response.albums)
    //         return response.albums
    //     }

    //     const fetchPlaylist = async (id) => {
    //         const response = await spotifyApi.getPlaylist(id)
    //         if(!response) {
    //             throw new Error ('err getting playlist')
    //         }
    //         // returns sinle playlist object
    //         returnedItems.push(response)
    //         return response
    //     }

    //     // can make a single API request to getSeveralAlbums
    //     if(pool['albums'] && Object.keys(pool['albums'])) {
    //         await fetchAlbums()
    //     }

    //     // must loop through and make seperate requests for playlists
    //     if(pool['playlists']) {
    //         await Promise.all(
    //             Object.keys(pool['playlists']).map(playlistId => fetchPlaylist(playlistId))
    //         );
    //     }
    //     return returnedItems
    // }


    // function getBinPlaylist(pool) {
    //     // draw random tracks from a pool of playlists
    //     // let binPlaylist = []

    //     getTotalReturnedItems(pool).then((value) => {
    //         console.log("Returned items", value)

    //         let tracks = value.map((object) => {
    //             if(object.tracks.items.length > 50) {
    //                 console.log("Must use offset", object.name)
    //             }
    //             return object.tracks.items.map(track => track.uri)
    //         }).flat()
    //         // console.log("Tracks", tracks)
    //     })

    //     // console.log("Bin playlist", pool)
    //     // return binPlaylist
    // }

    // function extractTracks(pool) {
    //     // using the return for getting all items, extract the tracks from the array of object



    // }

    // Add to util file
    // function _tenRandomNums(min, max) {
    //     let randoms = new Set()
    //     while(randoms.size < 10) {
    //         let num = Math.floor(Math.random() * (max - min + 1)) + min;
    //         randoms.add(num)
    //     }
    //     return randoms
    // }

    // function parseSpotifyId(uri) {
    //     return uri.split(':')[2]
    // }
    // function parseUriType(uri) {
    //     // return the uri type album or playlist
    //     return uri.split(":")[1]
    // }
    
