import PropTypes from 'prop-types';

import SpotifyLogoGreen from './assets/logos/Spotify_Logo_RGB_Green.png'

export default function Login({auth_url}) {
    return(
        <>
            <div className="login flex">


                <div className="login--section">
                    <h1>RECOLLECTIVE</h1>
                        <p className="text-[24px] font-light">
                            Discover and share the soundtrack of your life with RECOLLECTIVE, an app where you curate personal playlists, explore diverse musical collections, and connect with a community of music lovers. Create, discover, and share your favorite tunes in a vibrant, music-driven social network.
                        </p>
                </div>
                <div className="login--section">
                    <div className="flex flex-col gap-[10px]">
                        <div className="mx-auto">
                            <p className="font-light">Powered by</p>
                            <img className="logo-med" src={SpotifyLogoGreen}/>
                        </div>
                        <a className="button green" href={auth_url}>Login</a>
                    </div>
                </div>
            </div>
        </>
    )
}

Login.propTypes = {
    auth_url: PropTypes.string.isRequired
}