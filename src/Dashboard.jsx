import React, {useState, useContext} from 'react'

import Vinyl from './assets/images/vinyl.png'
import { useUserContext} from './context/barrel.js'
import { Sidebar, Navbar, MainViewport, Feed, Search, WebPlayer, LoadingSpinner} from './components/barrel'
import {Home, Playlist, Bin, Album, SearchResults, ArtistPage} from './components/views/barrel'
import {useAlbum, usePlaylist, useHistory, useSearch, useArtist, useBin, useBinsPlaylistsAlbums, useWebplayer} from './hooks/barrel'


const DashboardContext = React.createContext()
const PlaylistContext = React.createContext()
const AlbumContext = React.createContext()
const BinContext = React.createContext()
const WebplayerContext = React.createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useDashboardContext() {
    return useContext(DashboardContext)
}

export function usePlaylistContext() {
    return useContext(PlaylistContext)
}

export function useBinContext() {
    return useContext(BinContext)
}

export function useWebplayerContext() {
    return useContext(WebplayerContext)
}

export function useAlbumContext() {
    return useContext(AlbumContext)
}

export default function Dashboard() {
    
    const {user} = useUserContext()
    const [view, setView] = useState('home') // home is default view
    const {artist, setArtistID, clearArtistState} = useArtist()
    const {setPlaylistID, playlist, refreshPlaylist, addToPlaylist, removeFromPlaylist, clearPlaylistState} = usePlaylist()
    const {setAlbumID, album, clearAlbumState} = useAlbum()
    const {setBinID, bin, addToBin, removeFromBin} = useBin()
    const {history, addPage, removePage, getPrevious, getNext, setCurrentHistory} = useHistory()
    const {search, searchResults} = useSearch(setSearchResultsView)

    const {bins, playlists, albums, getBins, getPlaylists} = useBinsPlaylistsAlbums() // removed getAlbums


    const {webPlayback, player, is_paused, is_active, current_track, appDeviceId, activeDevices, setActiveDevices} = useWebplayer()

    // render checks
    // const renderCount = useRef(0)
    // renderCount.current++
    // console.log("Renders: ", renderCount.current)
    
    // Context Values
    const dashboardContextValue = {
        view,
        setView,
        setPlaylistID,
        setPlaylistView, 
        setAlbumView,
        setBinView,
        setHomeView,
        setSearchResultsView,
        setArtistView,
        search,
        history,
        addPage,
        removePage,
        getPrevious,
        getNext,
        setCurrentHistory,
        refreshPlaylist,
        addToBin
    }

    const playlistContextValue = {
        playlist,
        getPlaylists,
        addToPlaylist,
        removeFromPlaylist
    }

    const albumContextValue = {
        album
    }

    const binContextValue = {
        bin,
        getBins,
        setBinID,
        addToBin,
        removeFromBin
    }

    const webplayerContextValue = {
        webPlayback,
        player,
        is_paused,
        is_active,
        current_track,
        appDeviceId,
        activeDevices,
        setActiveDevices
    }



    // Component functions
    function setSearchResultsView() {
        // wait for search results
        setView("search")
    }

    function clearState() {
        clearPlaylistState()
        clearAlbumState()
        // clearArtistState()
        // clearBinState()
    }

    function setPlaylistView(id) {
        // set the playlist, and set the view
        if(playlist) {
            if(playlist.overview.id !== id) {
                setPlaylistID(id)
            }
        } else {
            setPlaylistID(id)
        }
        setView('playlist')
    }

    function setHomeView() {
        clearState()
        setView('home')
    }

    function setAlbumView(id) {
        clearState()
        setAlbumID(id)
        setView('album')
    }

    function setArtistView(id) {
        if(artist) {
            if(artist.artist.id !== id) {
                clearArtistState()
                setArtistID(id)
            } 
        } else {
            setArtistID(id)
        }
        setView('artist')
    }

    function setBinView(id) {
        // clearState()
        
        if(bin) {
            if(bin.overview.id !== id) {
                setBinID(id)
            }
        } else {
            setBinID(id)
        }
        setView('bin')
    }

    function renderView() {
        switch(view) {
            case 'home':
                return(
                    <Home 
                        playlists={playlists}
                        bins={bins}
                        albums={albums}
                    />
                )
            case 'playlist':
                // return palylist
                return playlist ? <Playlist playlist={playlist} /> : <LoadingSpinner />
            case 'album':
                // return album
                return album ? <Album album={album} /> : <LoadingSpinner />
            case 'artist':
                return artist ? <ArtistPage artist={artist} /> : <LoadingSpinner />
                // return <ArtistPage artist={artist} />
            case 'bin':
                // return bin
                return bin ? <Bin bin={bin} /> : <LoadingSpinner />
            case 'playlists':
                // return infinite scroll grid for playlist
                return
            case 'albums': 
                // return infinite scroll grid for albums
                return
            case 'bins': 
                // return infinite scroll grid for bins
                return
            case 'search':
                // return search results
                return <SearchResults searchResults={searchResults}/>
            default: 
                return(
                    <Home 
                    playlists={playlists}
                    bins={bins}
                    albums={albums}
                />
                )
        }
    }  

    function renderDashboard() {
        return(
            // <div className="flex flex-col gap-[50px]">
            <div className="dashboard">
                <Sidebar />
                <div className="flex flex-col gap-[20px] w-full">
                    {user && <Navbar />}

                    {user ? 
                        <div className="flex gap-[20px]">
                            <MainViewport>
                                <Search />
                                {renderView()}
                            </MainViewport>
                        </div>
                    :<LoadingSpinner />
                    }
                    {/* <div className="flex gap-[20px]">
                        <MainViewport>
                            <Search />
                            {renderView()}
                        </MainViewport>
                    </div> */}
                </div>

                {/* Toggle for testing */}
                <Feed />
                <WebPlayer player={webPlayback} />
            </div>
            // </div>
            
        )
    }

    return(
        <DashboardContext.Provider value={dashboardContextValue}>
            <WebplayerContext.Provider value={webplayerContextValue}>
                <PlaylistContext.Provider value={playlistContextValue}>
                    <AlbumContext.Provider value={albumContextValue}>
                        <BinContext.Provider value={binContextValue}>
                            {renderDashboard()}
                        </BinContext.Provider>                    
                    </AlbumContext.Provider>
                </PlaylistContext.Provider>
            </WebplayerContext.Provider>
        </DashboardContext.Provider>
    )
}

// function LoadingSpinner() {

//     return(
//         <div className="spinner-container">
//             <img src={Vinyl} className="spinner image--med"/>
//             <h1>Loading...</h1>
//         </div>

//     )
// }