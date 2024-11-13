import PropTypes from 'prop-types'
import {useState, useRef} from 'react'
import DefaultImage from '../../assets/images/default.png'
import {TrackTable, GridItem, StaticGrid} from '../barrel'
import {TrackTableSearch} from '../playlist_search/barrel'
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
    const [filter, setFilter] = useState('artists')

    function filterResults(type) {
        // filter results by artist, track, album, playlist
    }

    function getTopResult() {
        let results = searchResults.tracks.items.slice(0, 5) // get 5 results for tracks
        topResults.current = results
    }

    function handleClick(type) {
        // console.log("Naving to type: ", type)
        // filterType.current = type
        setFilter(type)
        
    }

    function renderResults() {
        switch(filter) {
            case "artists":
                // need some differnet behavir than "GRIDITEM" here, since Artists do not have the same playback features as albums or playlists, should just nav to artist page.
                return <StaticGrid items={searchResults.artists.items} GridComponent={GridItem}/>

                
            case "tracks": {
                // need to pass tracks in such a way that 
                // searchResults.tracks.items = content.tracks
                const content = {
                    tracks: searchResults['tracks'].items
                  };
                return <TrackTable
                    content={content}
                    type="search"
                />
                }
            case "albums":
                return <StaticGrid items={searchResults.albums.items} GridComponent={GridItem} />
            case "playlists":
                return <StaticGrid items={searchResults.playlists.items} GridComponent={GridItem} />
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
                    <div className="flex gap-[10px">
                        <div className="tab" onClick={() => handleClick('tracks')}>
                            <p>Tracks</p>
                        </div>
                        <div className="tab" onClick={() => handleClick('albums')}>
                            <p>Albums</p>
                        </div>
                        <div className="tab" onClick={() => handleClick('artists')}>
                            <p>Artists</p>
                        </div>
                        <div className="tab" onClick={() => handleClick('playlists')}>
                            <p>Playlists</p>
                        </div>
                    </div>
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
    results: PropTypes.array.isRequired
}