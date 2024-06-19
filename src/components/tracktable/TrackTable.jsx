import {useContext, useEffect} from 'react'
import {PropTypes} from 'prop-types';

import {UserContext} from '../views/dashboard/Dashboard'

function TrackTable({tracks}) {
    console.log(tracks)

    function genKey(string, num) {

        const key = string + num.toString()
        return key
    }

    return(
        <section id="track-table" className="bg-black w-full">

            {tracks.length > 0 ?
                tracks.map((track,index) => 
                    <TrackTableRow key={genKey(track.name, index)} track={track.track} />
                )
            :<h1 className="text-white">You haven&apos;t added anything yet!</h1>    
            }
        </section>
    )
}

function TrackTableRow({track}) {
    // console.log("Row", track)
    const removeTrackFromPlaylist = useContext(UserContext).removeTrackFromPlaylist
    const playlist = useContext(UserContext).playlist

    function handleClick(trackID) {

        let spotifyUri = 'spotify:track:' + trackID
        removeTrackFromPlaylist(playlist.id, spotifyUri, playlist.snapshot_id)
        console.log("Removing from playlist", spotifyUri)
    }

    useEffect(() => {

    }, [playlist])

    return(
        <div className="flex justify-between">
            <p style={{color: 'white'}}>{track.name}</p>
            <button className="p-2" onClick={() => handleClick(track.id)}>-</button>
        </div>
    )
}

TrackTable.propTypes = {
    tracks: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired,
        album: PropTypes.string.isRequired,
        duration_ms: PropTypes.number.isRequired
      })
    ).isRequired
  };

TrackTableRow.propTypes = {
    track: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired,
        album: PropTypes.string.isRequired,
        duration_ms: PropTypes.number.isRequired
    })
}
export default TrackTable