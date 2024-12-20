import React, {useState, useContext, useEffect} from 'react'
import PropTypes from 'prop-types'

import {useSearch, useAlbum, useArtist, usePlaylist} from '../../../hooks/barrel'
import {useSearchHistory, SearchHistoryNavigator, PlaylistBuilderSearch, ArtistTable, ArtistPage, AlbumsTable, AlbumTracks, PlaylistTable, PlaylistTracks} from '../barrel'
import {LoadingSpinner} from '../../barrel'


import {useBinComponentContext} from '../../views/Bin'


/**
 * 
 * There's search, and then there is displaying a users content
 * 
 * Searching among users content?
 */

const BinManagerContext = React.createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useBinManagerContext() {
    return useContext(BinManagerContext)
}

export default function BinManager() {

    const [builderView, setBuilderView] = useState('playlists')
    const {setAlbumID, album} = useAlbum()
    const {artist, setArtistID} = useArtist()
    const {playlist, setPlaylistID} = usePlaylist()
    const {history, addPage, getPrevious, getNext, setCurrentHistory} = useSearchHistory('playlists')
    const {search, searchResults}= useSearch()
    const {dragItem} = useBinComponentContext()

    // Import hooks
    // search
    // artist
    // album
    // history

    function renderBinManagerView() {
        // there is no tracks view for bins
        switch(builderView) {
            case 'albums':
                return <AlbumsTable 
                    albums={searchResults.albums.items} 
                    draggable={true}
                    />
            case 'albumTracks':
                return album ? <AlbumTracks album={album}/> : <LoadingSpinner />
            case 'artists':
                return <ArtistTable artists={searchResults.artists.items} />
            case 'artist':
                return <ArtistPage artist={artist}/>
            case 'playlists':
                return <PlaylistTable playlists={searchResults.playlists.items} />
            case 'playlist':
                return playlist ? <PlaylistTracks playlist={playlist}/> : <LoadingSpinner />
        }

    }

    function handleClick(type) {
        switch(type) {
            case 'albums':
                addPage('albums', null)
                setBuilderView('albums')
                return
            case 'artists':
                addPage('artists', null)
                setBuilderView('artists')
                return
            case 'playlists':
                addPage('playlists', null)
                setBuilderView('playlists')
                return 
        }
    }

    useEffect(() => {
        if(searchResults) {
            setBuilderView('playlists')
        }
    }, [searchResults])

    return(
        <div className="p-10">
            <BinManagerContext.Provider value={{
                builderView,
                setBuilderView,
                setAlbumID,
                setArtistID,
                setPlaylistID,
                addPage
            }}>
                <PlaylistBuilderSearch 
                    setBuilderView={setBuilderView}
                    builderView={builderView}
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
                                <p onClick={() => handleClick('playlists')}>Playlists</p>
                            </div>
                            <div className="tab">
                                <p onClick={() => handleClick('albums')}>Albums</p>
                            </div>
                            <div className="tab">
                                <p onClick={() => handleClick('artists')}>Artists</p> 
                            </div>
                        </div>
                        {/* This is only running once? */}
                        {renderBinManagerView()}
                        </>
                    :<h2>Search results in viewpoirt</h2>
                    }

                </div>
            </BinManagerContext.Provider>
        </div>
    )

}