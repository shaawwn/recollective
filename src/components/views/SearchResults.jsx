import PropTypes from 'prop-types'
import {useRef} from 'react'
import DefaultImage from '../../assets/images/default.png'
import {TrackTable, GridItem, StaticGrid} from '../barrel'
import {ArtistTable} from '../playlist_search/barrel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faPause} from '@fortawesome/free-solid-svg-icons'
/***
 * 
 * Display the search results (top tracks, artists, albums, etc)
 */
export default function SearchResults({searchResults}) {
    // console.log("SEARCH RESULTS", searchResults)
    const filterType = useRef('artists')
    const results = useRef(searchResults.artists.items)
    const topResults = useRef()

    function filterResults(type) {
        // filter results by artist, track, album, playlist
    }

    function getTopResult() {
        let results = searchResults.tracks.items.slice(0, 5) // get 5 results for tracks
        topResults.current = results
    }

    function handleClick() {
        console.log("Nav artist page")
    }

    function renderResults() {
        switch(filterType.current) {
            case "artists":
                // need some differnet behavir than "GRIDITEM" here, since Artists do not have the same playback features as albums or playlists, should just nav to artist page.
                return <StaticGrid items={searchResults.artists.items} GridComponent={GridItem}/>

                
            case "tracks":
                return
            case "albums":
                return
            case "playlist":
                return
        }
    }

    getTopResult()
    return(
        <section className="search-results panel">
            <div className="search-results__top">
                <TopTrackResult result={searchResults.tracks.items[0]}/>
                {topResults.current ? <TopResults results={topResults.current}/>: <h1>Top Results</h1>}

            </div>


            <div>
                {/* Depeneding on the filter, return that type */}
                {renderResults()}
            </div>
        </section>
    )
}

function TopTrackResult({result}) {

    return(
        <div className="search-results__top-track panel">
            {result !== undefined ? 
            <>
                        <img className="image--med" src={result.images ? result.images[0].url: DefaultImage}/>
                        <div className="search-results__top-track__details">
                            <div>
                                <p className="xl:text-[32px]">{result.name}</p>
                                <p className="xl:text-[24px;]">{result.artists[0].name}</p>
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

function TopResults({results}) {
    // return the top 5 results (with type)
    // eg Rush - Artist, Tom Sawyer - Track
    // console.log("TOP RESULTS", results)
    return(
        <div className="search-results__top-items panel">
            <h2 className="xl:text-[28px]">Songs</h2>
            {results.map((result, index) => 
                <div key={result.name + index}className="p-1">
                    <p className="xl: text-[16px]">{result.name}</p>
                    <p className="xl: text-[12px]">{result.artists[0].name}</p>
                </div>

            )}
        </div>
    )
}


SearchResults.propTypes = {
    searchResults: PropTypes.object.isRequired
}

TopTrackResult.propTypes = {
    result: PropTypes.object.isRequired
}
TopResults.propTypes = {
    results: PropTypes.object.isRequired
}