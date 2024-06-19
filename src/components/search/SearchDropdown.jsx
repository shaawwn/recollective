import {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types'


/*
    Search Results
    album
    artist
    playlist
    tracks
    profiles

*/

import {UserContext} from '../views/dashboard/Dashboard'

function SearchDropdown({searchResults}) {
    console.log("Search dropdown", searchResults)

    const [filter, setFilter] = useState('tracks') // default returns tracks

    // function filterResults() {
    //     // toggle the different results tracks/artists/albums/playlists
    // }

    function handleClick(filterString) {
        setFilter(filterString)
    }

    function displayResults(filterType) {
        if(filterType === 'tracks') {
            return <div>
                {searchResults.tracks.items.map((track, index) =>
                    <SearchDropdownRow key={track.name + index}result={track} />    
                )}
            </div>
        } else if(filterType === 'artists') {
            return <div>
                {searchResults.artists.items.map((artist, index) =>
                    <SearchDropdownRow key={artist.name + index}result={artist} />    
                )}
            </div>
        } else if(filterType === 'albums') {
            return <div>
                {searchResults.albums.items.map((album, index) =>
                    <SearchDropdownRow key={album.name + index}result={album} />    
                )}
            </div>
        } else if(filterType === 'playlists') {
            return <div>
            {searchResults.playlists.items.map((playlist, index) =>
                <SearchDropdownRow key={playlist.name + index}result={playlist} />    
            )}
        </div>
        }
    }
    useEffect(() => {

    }, [searchResults])
    
    
    return(
        <div className={Object.keys(searchResults).length > 0 ? "flex flex-col": "hidden"}>
            <div className="flex">
                {/* Filter buttons */}
                <button onClick={() => handleClick('tracks')}>Tracks</button>
                <button onClick={() => handleClick('artists')}>Artists</button>
                <button onClick={() => handleClick('albums')}>Albums</button>
                <button onClick={() => handleClick('playlists')}>Playlists</button>
            </div>

            {/* Apply filters to display table */}
            {Object.keys(searchResults).length > 0 ? displayResults(filter):null}
        </div>
    )
}

function SearchDropdownRow({result}) {
    // console.log("Search row item", result)

    const addTracksToPlaylist = useContext(UserContext).addTracksToPlaylist

    const playlist = useContext(UserContext).playlist

    function handleClick(uri) {
        // console.log("Adding or removing", trackID, result.name)
        // console.log()
        addTracksToPlaylist(playlist.id, [uri], 0)
    }

    return(
        <div className="flex justify-between">
            <p>{result.name} </p>
            <button onClick={() => handleClick(result.uri)}className="p-1">+</button> 
        </div>

    )
}

// SearchDropdown.propTypes = {
//     searchResults: PropTypes.shape({
//         tracks: PropTypes.string
//     })
// }
SearchDropdown.propTypes = {
    searchResults: PropTypes.shape({
      albums: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          images: PropTypes.arrayOf(PropTypes.shape({
            url: PropTypes.string
          })),
          release_date: PropTypes.string,
          total_tracks: PropTypes.number
        }))
      }),
      artists: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          followers: PropTypes.shape({
            total: PropTypes.number
          }),
          genres: PropTypes.arrayOf(PropTypes.string),
          images: PropTypes.arrayOf(PropTypes.shape({
            url: PropTypes.string
          }))
        }))
      }),
      tracks: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          album: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            images: PropTypes.arrayOf(PropTypes.shape({
              url: PropTypes.string
            }))
          }),
          artists: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
          })),
          duration_ms: PropTypes.number,
          popularity: PropTypes.number
        }))
      }),
      playlists: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          description: PropTypes.string,
          images: PropTypes.arrayOf(PropTypes.shape({
            url: PropTypes.string
          })),
          owner: PropTypes.shape({
            id: PropTypes.string.isRequired,
            display_name: PropTypes.string
          }),
          tracks: PropTypes.shape({
            total: PropTypes.number
          })
        }))
      })
    })
  };

SearchDropdownRow.propTypes = {
    result: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string
    })
}
export default SearchDropdown

