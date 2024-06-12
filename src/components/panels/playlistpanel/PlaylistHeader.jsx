import {useContext} from 'react';

import {UserContext} from '../../views/dashboard/Dashboard'
import DefaultPlaylistCover from '../../../images/default.png'

/*

    There's more involved here than I though, I think this is where all the modifiable aspects of a playlist should be found. A playlist is created automatically with default attributes (name, genre, etc), which can then be changed here with an edit button.

    playlist should be a spotify playlist so it should follow all the spotify formatting

*/

function PlaylistHeader({playlist}) {
    const profile = useContext(UserContext).profile
    const setCurrentPlaylist = useContext(UserContext).setCurrentPlaylist

    function handleClick() {
        console.log("Starting playback of playlist", playlist)
        setCurrentPlaylist(playlist)
        // setCurrentPlaylist here
    }
    return(
        <div id="playlist-meta" className="flex">
            {playlist.images !== null ? 
                <img className="panel__playlist__cover-image" src={playlist.images[0].url}></img>
            :<img className="panel__playlist__cover-image" src={DefaultPlaylistCover}></img>
            }
            {/* <img className="panel__playlist__cover-image" src={DefaultPlaylistCover}></img> */}
            <div className="flex flex-col">
                <h2>{playlist ? playlist.name : 'null'}</h2>
                <p>
                    {playlist.description}
                </p>
                <p>{playlist ? playlist.author : 'null'}</p>
                <p>
                    {/* {playlist.tags.map((tag, index) => 
                        <span key={index}>{tag} </span>
                    )} */}

                </p>
                <button onClick={handleClick}>Play</button>
            </div>
        </div>
    )
}

export default PlaylistHeader