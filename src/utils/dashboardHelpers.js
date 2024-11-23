// THINKING of seperating these view functions to declutter Dashboard

export function setHomeView(clearState, setView) {
    clearState()
    setView('home')
}

export function setPlaylistLibraryView() {

}

export function setAlbumLibraryView() {
    
}

export function setAlbumView(id, clearState, setAlbumID, setView) {
    clearState()
    setAlbumID(id)
    setView('album')
}

export function setArtistView(id, artist, clearArtistState, setArtistID, setView) {
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

export function setBinView(id, bin, setBinID, setView) {
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