// SpotifyCallbackHandler.js
import React, { useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useSpotifyAuthCode } from './useSpotifyAuthCode';

function SpotifyCallbackHandler() {
  const { fetchAndSetAccessToken } = useAuth();
  const code = useSpotifyAuthCode();

  useEffect(() => {
    if (code) {
      fetchAndSetAccessToken(code);
    }
  }, [code, fetchAndSetAccessToken]);

  return <div>Handling Spotify Callback...</div>;
}
