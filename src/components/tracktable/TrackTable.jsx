

function TrackTable({tracks}) {
    // console.log(tracks)
    return(
        <section id="track-table" className="bg-black w-full">
            {/* <p className="text-white">Songs here in table</p> */}
            {tracks.map((track, index) => 
                <TrackTableRow track={track}/>
            )}
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

export default TrackTable