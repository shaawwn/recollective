
// import useSearch from '../../hooks/useSearch'
// import PlaylistGridPanel from '../panels/PlaylistGridPanel'

import {useState, useEffect} from 'react'
import {PropTypes} from 'prop-types'

import DefaultPlaylistCover from '../../images/default.png'

function SearchPanel({searchResults}) {

    const [topArtist, setTopArtist] = useState()
    const [topTracks, setTopTracks] = useState()
    const [topPlaylists, setTopPlaylists] = useState()
    const [topAlbums, setTopAlbums] = useState()

    useEffect(() => {
        if(searchResults) {
            setTopArtist(searchResults.artists.items[0])
            setTopTracks(searchResults.tracks.items.slice(0,10))
            setTopPlaylists(searchResults.playlists.items)
            setTopAlbums(searchResults.playlists.items)
        }
    }, [])
    return(
        <section>
            {/* <h1>Search Panel here with search results</h1> */}
            <SearchPanelResultsToggle />

            {topArtist && topTracks ? 
                <SearchPanelTopResult 
                    topArtist={topArtist}
                    topTracks={topTracks}
                />
            :null
            }
            {topPlaylists ? 
                <SearchPanelTopPlaylists playlists={topPlaylists}/>
            :null}
            {SearchPanelTopAlbums ? 
                <SearchPanelTopAlbums albums={topAlbums}/>
            :null}
            {/* If created Playlists in grid form 
                There should be some function that returns User Playlists? Need to search user playlists and return results which could match
            */}

            {/* Other playlists
                This is the default Spotify Search Results, returns top Playlists 
            */}

            {/* Albums 
                Default Spotify search results, but maybe filter for albums in users library?
            */}
        </section>
    )
}

function SearchPanelResultsToggle() {

    function handleClick(result) {
        console.log("Toggling results to: ", result)
    }
    return(
        <div>
            <button onClick={() => handleClick('tracks')}>Tracks</button>
            <button onClick={() => handleClick('albums')}>Albums</button>
            <button onClick={() => handleClick('artists')}>Artists</button>
            <button onClick={() => handleClick('playlists')}>Playlists</button>
        </div>
    )
}

function SearchPanelTopResult({topArtist, topTracks}) {

    // I guess putting an artist here would be the best bet
    
    console.log("TOP IN RESULT", topArtist, topTracks)
    return(
        <section className="flex">

            {/* Top Artist */}
            <div>
                {topArtist.images.length > 2 ? 
                <img className="card__image" src={topArtist.images[1].url}/>
                :<img src={DefaultPlaylistCover}/>
                }
                <p>{topArtist.name}</p>
            </div>

            {/* Top Tracks */}
            <div className="flex flex-col">
                {topTracks.map((track, index) => {
                    return <SearchPanelTopTrackRow key={index} track={track}/>
                })}
                {/* <SearchPanelTopTrackRow /> */}
            
            </div>
        </section>
    )
}

function SearchPanelTopTrackRow({track}) {

    return(
        <div className="flex justify-between">
            <div className="flex flex-col">
                <p className="font-bold">{track.name}</p>
                <p>{track.artists[0].name}</p>
            </div>
            <button>Play</button>
        </div>
    )
}


function SearchPanelTopPlaylists({playlists}) {
    
    return(
        <section>
            <p>Basically a playlist grid panel</p>
        </section>
    )
}

function SearchPanelTopAlbums({albums}) {

    return(
        <section>
            <p>Basically a playlist grid panel but with albums</p>
        </section>
    )
    
}
SearchPanel.propTypes = {
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

SearchPanelTopResult.propTypes = {
    topArtist: {
        external_urls: PropTypes.shape({
            spotify: PropTypes.string.isRequired
        }).isRequired,
        followers: PropTypes.shape({
            href: PropTypes.oneOf([null]), // As `href` is always null based on given data
            total: PropTypes.number.isRequired
        }).isRequired,
        genres: PropTypes.arrayOf(PropTypes.string).isRequired,
        href: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.shape({
            height: PropTypes.number,
            url: PropTypes.string.isRequired,
            width: PropTypes.number
        })).isRequired,
        name: PropTypes.string.isRequired,
        popularity: PropTypes.number.isRequired,
        type: PropTypes.oneOf(['artist']).isRequired, 
        uri: PropTypes.string.isRequired
    },
    topTracks: PropTypes.arrayOf(PropTypes.object).isRequired
}

SearchPanelTopPlaylists.propTypes = {
    playlists: PropTypes.arrayOf(PropTypes.object).isRequired
}

SearchPanelTopAlbums.propTtpes = {
    albums: PropTypes.arrayOf(PropTypes.object).isRequired
}
export default SearchPanel