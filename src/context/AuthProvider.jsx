import {createContext, useContext, useState, useCallback} from 'react';

// import useAuth from '../hooks/useAuth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)


export const AuthProvider = ({ children }) => {
    const [appToken, setAppToken] = useState()
    const [spotifyAccessToken, setSpotifyAccessToken] = useState()
    const [spotifyRefreshToken, setSpotifyRefrshToke] = useState()
    const [spotifyExiresIn, setSpotifyExpiresIn] = useState()

    console.log("AUTH PROVIDER LOADING")


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
      spotifyAccessToken,
      fetchAccessToken
    }
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };

