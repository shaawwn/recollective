import React, {useState, useContext} from 'react'

import {useSearch, useAlbum, useArtist} from '../../../hooks/barrel'
// import {MainViewport, Search} from '../barrel'
import {PlaylistBuilderSearch, TrackTableSearch, ArtistTable, ArtistPage, AlbumsTable, AlbumTracks, SearchHistoryNavigator, RecommendedTracks} from '../barrel'

import useSearchHistory from '../useSearchHistory'



/**
 * 
 * TO DO: Add recommended tracks based off what is in the playlist currently (use the spotify recommendations endpoint). 
 * 
 * Rename to ContentDigger
 *  Name the describes the role of this component in the overall app -- searching for and adding content to a users playlists and bins.
 * 
 * Need to add a "Type" to determine if the Builder will be used for Playlists or for Bins
 * 
 * 
 */
const PlaylistBuilderContext = React.createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function usePlaylistBuilderContext() {
    return useContext(PlaylistBuilderContext)
}

export default function PlaylistBuilder() { // ContentDigger
    //
    const {search, searchResults} = useSearch()
    const [builderView, setBuilderView] = useState('tracks')
    const {setAlbumID, album} = useAlbum()
    // const {playlistID, playlist} = usePlaylist()
    const {artist, setArtistID} = useArtist()
    const {history, addPage, getPrevious, getNext, setCurrentHistory} = useSearchHistory('tracks')

    function renderBuilderView() {
        switch(builderView) {
            case 'tracks':
                return <TrackTableSearch tracks={searchResults.tracks.items} />
            case 'albums':
                return <AlbumsTable albums={searchResults.albums.items}/>
            case 'albumTracks': // this
                return <AlbumTracks album={album}/> // need to add albumTracks
            case 'artists':
                return <ArtistTable artists={searchResults.artists.items}/>
            case 'artist': // NOT artist's' and this are different hitories
                return <ArtistPage artist={artist}/>
            case 'playlists':
                return
            case 'playlist':
                // can *view* track content of a playlist, but can only add the whole playlist to a bin
                return
        }
    }

    function handleClick(type) {
        switch(type) {
            case 'tracks':
                addPage('tracks', null)
                setBuilderView('tracks')
                return
            case 'albums':
                addPage('albums', null)
                setBuilderView('albums')
                return
            case 'artists':
                addPage('artists', null)
                setBuilderView('artists')
                return
            case 'playlists':
                return
        }
    }

    return(
        <div className="p-10">
            <PlaylistBuilderContext.Provider value={{
                builderView,
                setBuilderView,
                setAlbumID,
                setArtistID,
                addPage
            }}>
                <PlaylistBuilderSearch 
                    setBuilderView={setBuilderView} builderView={builderView} 
                    search={search}
                />

                <div className="my-5">
                    {searchResults ?
                    <>
                        <div className="flex gap-[10px]">
                            <SearchHistoryNavigator
                                searchResults={searchResults} 
                                history={history}
                                addPage={addPage}
                                getPrevious={getPrevious}
                                getNext={getNext}
                                setCurrentHistory={setCurrentHistory}
                            />
                            <div className="tab">
                                <p onClick={() => handleClick('tracks')}>Tracks</p>
                            </div>
                            <div className="tab">
                                <p onClick={() => handleClick('albums')}>Albums</p>
                            </div>
                            <div className="tab">
                                <p onClick={() => handleClick('artists')}>Artists</p> 
                            </div>
                        </div>
                        {renderBuilderView()}
                        <RecommendedTracks />
                    </>
                    :<h2>Search Results in viewport</h2>
                    }
                </div>
            </PlaylistBuilderContext.Provider>
        </div>
    )
}

