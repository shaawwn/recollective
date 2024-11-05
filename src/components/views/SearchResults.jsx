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
    console.log("SEARCH RESULTS", searchResults)
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
                // default was to return artists that match results? Should a grid anyways?
                // return (
                //     <div className="static-grid">
                //     {searchResults.artists ? 
                //         <>
                //             {searchResults.artists.items.map((artist, index) =>
                //                 <div key={artist.id + index} onClick={() => handleClick(artist.id)}className="flex flex-col">
                //                     <div className="static-grid--item">
                //                         <img className="image--med" src={artist.images[0] ?
                //                             artist.images[0].url : DefaultImage} />
                //                     </div>
                //                     <p>{artist.name}</p>
                //                 </div>
                //             )}
                //         </>
                //     :<h2>Loading artists...</h2>
                //     }
                    
                // </div>
                // )
                return <StaticGrid items={searchResults.artists.items} GridComponent={GridItem}/>
                // <TrackTable 
                //     content={searchResults}
                //     tracks={searchResults.tracks.items}
                //     type="expllore"
                //     />
                
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