import PropTypes from 'prop-types'
import {useState, useEffect} from 'react'
import {StaticGrid, GridItem} from '../barrel'
import {useApiContext} from '../../context/ApiContext'
import {useWebplayerContext} from '../../Dashboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faPause} from '@fortawesome/free-solid-svg-icons'
// so I want to be able to, maybe, on the artist page just *start* playing songs for that artist, as well as displaying some top track informatio?


export default function ArtistPage({artist}) {

    return(
        <section>
            {artist ? 
                <>
                    {/* <ArtistPanel artist={artist.artist} /> */}
                    {/* <ArtistPageHeader
                        id={artist.artist.id} 
                        image={artist.artist.images[0].url} name={artist.artist.name}
                        /> */}
                    <ArtistPageHeader artist={artist.artist} />
                    <h2>{artist.artist.name}'s albums</h2>
                    <StaticGrid items={artist.albums.items} GridComponent={GridItem}/>
                </>
            :<h1>Loading</h1>}
           
        </section>//
    )
}

function ArtistPageHeader({artist}) {

    // modifying this, it should be the artist name and image and then their top tracks
    return(
        <div className="flex w-full justify-between p-5">
            <ArtistPanel artist={artist} />
            <ArtistPageTopTracks id={artist.id}/>
        </div>
    )
}

function ArtistPageTopTracks({id}) {

    const [topTracks, setTopTracks] = useState(null)
    const {spotifyApi, spotifyPlayerApi} = useApiContext() || {}
    const {activeDevices} = useWebplayerContext() || {}

    function handleClick(e, track) {
        e.stopPropagation()
        
        play(track.uri)
    }

    function play(uri) {
        // console.log("Staring palyback of top track", uri)

        const activeDeviceID= activeDevices.find(device => device.name === "RecollectiveApp");
        spotifyPlayerApi.play(null, [uri], null, activeDeviceID.id)
    }


    async function getTopTracks() {
        try {
            const response = await spotifyApi.getArtistTopTracks(id)
            if(!response) {
                throw new Error ("no artist top tracks or error")
            }
            setTopTracks(response.tracks)
        } catch (err) {
            console.log("err", err)
        }

    }
    useEffect(() => {
        if(!topTracks) {
            getTopTracks()
        }
    }, [])


    return(
        <div className="search-results__top-items panel">
            <h2>Top Tracks</h2>
            {topTracks ? 
                topTracks.slice(0, 5).map((track, index) => 
                    <div key={index} className="flex">
                        <FontAwesomeIcon 
                            onClick={(e) => handleClick(e, track)}
                            icon={faPlay} 
                            />
                        <p key={index}>{track.name}</p>
                    </div>
                    
                )
            : null}


        </div>
    )
}

function ArtistPanel({artist}) {
    
    // visually similar to TopTrackResult from SearchResults comp, but specific to the ARTIST, with playback generating an artist playlist
    return(
        <div className="search-results__top-track panel">
            {artist !== undefined ? 
            <>
                        <img className="image--med" src={artist.images ? artist.images[0].url: DefaultImage}/>
                        <div className="search-results__top-track__details">
                            <div>
                                <p className="xl:text-[32px]">{artist.name}</p>
                                {/* <p className="xl:text-[24px;]">{result.artists[0].name}</p> */}
                            </div>
                            <div className="flex justify-center w-full play">
                                <div className="circle">
                                    <FontAwesomeIcon icon={faPlay} size="2x" className="play"/>
                                </div>
                            </div>
            
                        </div>
                        </>
            :null
            }

        </div>
    )
}

ArtistPage.propTypes = {
    artist: PropTypes.object.isRequired
}

ArtistPageHeader.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}