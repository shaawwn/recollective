import PropTypes from 'prop-types'
import DefaultImage from '../../assets/images/default.png'
import {usePlaylistContext, useWebplayerContext} from '../../Dashboard'
import {msToMinutesAndSeconds} from '../../utils/utils'
import {useApiContext} from '../../context/barrel'
import {usePlaylistBuilderContext} from './barrel'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay} from '@fortawesome/free-solid-svg-icons'


export default function TrackTableSearch({tracks}) {

    return(
        <section className="track-table">
            <hr></hr>
            <div className="track-table__rows">
                {tracks.map((track, index) => 
                    <TrackTableSearchRow key={track.name + index}track={track}/>
                )}
            </div>

        </section>
    )
}

function TrackTableSearchRow({track}) {
    const {spotifyApi, spotifyPlayerApi} = useApiContext()
    const {playlist, addToPlaylist} = usePlaylistContext()
    const {activeDevices} = useWebplayerContext()
    const {setBuilderView, setArtistID, setAlbumID, addPage} = usePlaylistBuilderContext()

    function handleClick(view, id) {
        
        switch(view) {
            case 'albumTracks':
                addPage('album', id)
                setBuilderView('albumTracks')
                setAlbumID(id)
                return
            case 'artist':
                addPage('artist', id)
                setBuilderView('artist')
                setArtistID(id)
                return
        }
    }


    async function handlePlayback(track) {
        const seeds={
            seed_artists: [track.artists[0].id],
            seed_tracks: [[track.id]],
            seed_genres: []
        }

        try {

            const response = await spotifyApi.getRecommendations(seeds)
            const activeDeviceID= activeDevices.find(device => device.name === "RecollectiveApp");

            if(response) {
                // create a queie of recommended tracks and play starting from the selectefd track. Maybe I can create a seperate window later showing what tracks are in the queue

                const toPlay = response.tracks
                toPlay.unshift(track)
                const uris = toPlay.map(track => track.uri);
                spotifyPlayerApi.play('', uris, 0, activeDeviceID.id)
            }
        } catch(err) {  
            console.log(err)
        }
    }
    return(
        <div className="track-table-search__row">

            <div className="track-table__cell flex gap-[10px]">
                <FontAwesomeIcon 
                    onClick={() => handlePlayback(track)}
                    icon={faPlay}
                    className="p-5 text-white"/>
                <div className="flex flex-col justify-center relative">
                    <img className="image--xs" src={track.album.images ?
                track.album.images[0].url : DefaultImage}/>
                </div>
                <div className="">
                    <p className="font-bold">{track.name}</p>
                    <p onClick={() => handleClick("artist", track.artists[0].id)}className="track-table__cell-link">{track.artists[0].name}</p>
                </div>
            </div>
            <div className="track-table__cell flex flex-col justify-center">
                <p onClick={() => handleClick("albumTracks", track.album.id)}className="track-table__cell-link">{track.album.name}</p>
            </div>

            {playlist ? 
                <div className="flex gap-[10px]">
                    <p>{msToMinutesAndSeconds(track.duration_ms)}</p>
                    <button onClick={() => addToPlaylist(track.uri)} className="green">Add</button>
                </div>
            :null}

        </div>
    )
}



TrackTableSearch.propTypes = {
    tracks: PropTypes.array.isRequired
}

TrackTableSearchRow.propTypes = {
    track: PropTypes.object.isRequired
}
