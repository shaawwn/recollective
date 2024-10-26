import {useDashboardContext, useBinContext, usePlaylistContext} from '../Dashboard'
import {useApiContext} from '../context/ApiContext'
import {useUserContext} from '../context/barrel'

export default function Sidebar() {
    const {user} = useUserContext()
    const {getBins} = useBinContext()
    const {getPlaylists} = usePlaylistContext()
    const {setHomeView, addPage, setCurrentHistory, setPlaylistView, setBinView} = useDashboardContext()
    const {spotifyApi} = useApiContext()
    function handleClick(view) {
        // clicking on a nav element here should change the mainviewport content to the respective content

        // meaning I need a system to change the content in mainviewport
        try {
            switch(view) {
                case "home":
                    addPage('home', null)
                    setHomeView()
                    return
            }
        } catch (err) {
            // do nothing
        }
    }


    async function createPlaylist() {
        if(confirm("Create a playlist?")) {
            const name = `${chance.word()} ${chance.word()}`
            const playlist = await spotifyApi.createPlaylist(name)
            addPage('playlist', playlist.id) 
            setPlaylistView(playlist.id)
            getPlaylists()
        } else {
            console.log("Cancelling playlist create")
        }
    }

    async function createBin() {
        if(confirm("Create a bin?")) {
            const name = `${chance.word()} ${chance.word()}`
            fetch(`http://localhost:3001/bins`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    userID: user.recollective._id,
                    binName: name
                })
            }).then((response) => {
                if(!response.ok) {
                    throw new Error ("error creating bin")
                }
                return response.json()
            }).then((data) => {
                setBinView(data.bin._id)
                getBins()
            }).catch((err) => {
                console.log(err)
            })
        } else {
            console.log("Cancelling bin")
        }
    }

    return(
        <nav className="sidebar-nav panel">
            <p className="sidebar-nav__link" onClick={() => handleClick("home")}>Home</p>
            <p className="sidebar-nav__link">Library</p>
            <p className="sidebar-nav__link">Playlists</p>
            <p className="sidebar-nav__link">Bins</p>
            <p className="sidebar-nav__link">Following</p>
            <p className="sidebar-nav__link">Followers</p>
            <hr></hr>
            <p onClick={createBin}className="sidebar-nav__link">+ Bin</p>
            <p onClick={createPlaylist}className="sidebar-nav__link">+ Playlist</p>

        </nav>
    )
}