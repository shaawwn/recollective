import {createContext, useContext, useState, useCallback, useEffect} from 'react';

import useAuth from '../hooks/_useAuth';
import useSearch from '../hooks/useSearch'
import {verifySession} from '../utils/authentication'

export const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext)


export const AuthProvider = ({ children, code }) => {
    const [appToken, setAppToken] = useAuth(code)
    const [spotifyAccessToken, setSpotifyAccessToken] = useAuth(code)
    const [spotifyRefreshToken, setSpotifyRefrshToke] = useState()
    const [spotifyExiresIn, setSpotifyExpiresIn] = useState()
    const [spotifyProfile, setSpotifyProfile] = useState()
    const [profile, setProfile] = useState()
    const [authenticated, setAuthenticated] = useState(false)
    const [search, setTokens] = useSearch()



    // Your auth logic here

    const fetchAccessToken = async (code) => {
      const response = await fetch('http://localhost:3000/spotify/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({code})
      })

      const data = await response.json()
      console.log("ACCESS TOKEN IN CONTEXT", data.accessToken)
      setSpotifyAccessToken(data.accessToken)
    }
    
    const value = {
      appToken,
      spotifyAccessToken,
      profile,
      spotifyProfile
    }

    const handleVerifySession = () => {
      verifySession(setAuthenticated)
    }

    useEffect(() => {
      // verify a session on page load
      handleVerifySession()
    }, [])
  
    useEffect(() => {
      if(appToken && spotifyAccessToken) {
        setTokens({
          appToken: appToken,
          spotifyAccessToken: spotifyAccessToken
        })
        // getCurrentUserProfile(spotifyAccessToken, setSpotifyProfile)
      } 
    }, [appToken, spotifyAccessToken])
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };

