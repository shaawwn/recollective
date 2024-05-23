import {PropTypes} from 'prop-types';

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
                    <TrackTableRow key={() => genKey(track.name, index)} track={track} />
                )
            :<h1 className="text-white">You haven&apos;t added anything yet!</h1>    
            }
        </section>
    )
}

function TrackTableRow({track}) {

    return(
        <div>
            <p style={{color: 'white'}}>{track.name}</p>
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
        name: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired,
        album: PropTypes.string.isRequired,
        duration_ms: PropTypes.number.isRequired
    })
}
export default TrackTable