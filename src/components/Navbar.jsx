
import Chance from 'chance'
import HistoryNavigator from './HistoryNavigator'
import {useUserContext} from '../context/barrel'
import {useDashboardContext} from '../Dashboard'
import {useApiContext} from '../context/ApiContext'


const chance = new Chance()


export default function Navbar() {
    const {user} = useUserContext()

    const redirectUri = import.meta.env.VITE_REDIRECT_URI
    const {spotifyApi} = useApiContext()
    const {setPlaylistView, addPage} = useDashboardContext()



    async function createPlaylist() {
        if(confirm("Create a playlist?")) {
            const name = `${chance.word()} ${chance.word()}`
            const playlist = await spotifyApi.createPlaylist(name)
            addPage('playlist', playlist.id) // add to history
            setPlaylistView(playlist.id)
        } else {
            console.log("Cancelling playlist create")
        }
    }

    function createBin() {
        if(confirm("Create a bin?")) {
            fetch(`http://localhost:3001/bins`, {
                credentials: "include"
            }).then((response) => {
                if(!response.ok) {
                    throw new Error ("error getting bind")
                }
                return response.json()
            }).then((data) => {
                console.log("BINS", data)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            console.log("Cancelling bin")
        }
    }


    function handleLogout() {
        window.location.href="https://accounts.spotify.com/en/logout"
    }
    
    function test() {
        console.log('clicking test')
        fetch(`http://localhost:3001/user`, {
            credentials: "include"
        }).then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
    }

    return(
        <nav className="navbar">
            <div className="flex">
                <HistoryNavigator />
                <h2 className="text-2xl">Hello, {user.spotify.display_name}</h2>
            </div>
            <div className="flex gap-[10px]">
                {/* <button className="button green" onClick={createBin}>+ Bin</button> */}
                {/* <button className="button green" onClick={createPlaylist}>+ Playlist</button> */}
                <a className="button green" onClick={handleLogout}>Logout</a>
                {/* <a className="button green" onClick={test}>App user TEST</a> */}
            </div>
        </nav>
    )
}