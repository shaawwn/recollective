
  function getAuthUrl() {
    const auth_scope = [
        'streaming',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing',
        'playlist-read-private',
        'playlist-modify-private',
        'playlist-modify-public',
        'user-read-playback-position',
        'user-read-recently-played',
        'user-top-read',
        'user-library-modify',
        'user-library-read',
        'user-read-email',
        'user-read-private'
      ]
      
      const client_id = import.meta.env.VITE_CLIENT_ID
      const redirect_uri = import.meta.env.VITE_REDIRECT_URI


      return`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${auth_scope.join("%20")}`
  }

  export {
    getAuthUrl
  }