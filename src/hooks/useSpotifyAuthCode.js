// useSpotifyAuthCode.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Assuming you're using react-router

export function useSpotifyAuthCode() {
  const location = useLocation();
  const authCode = new URLSearchParams(location.search).get('code');

  return authCode;
}
