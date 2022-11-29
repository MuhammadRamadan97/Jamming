

const clientId = '39872e2e160549f6a85bec9a6981d11c';
const redirectUri = 'http://localhost:3000/'

let token = ''

const Spotify = {
    getAccessToken(){
        if(token){
            return token;
        }

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresMatch = window.location.href.match(/expires_in=([^&]*)/);
    
    if(tokenMatch && expiresMatch) {
        token = tokenMatch[1];
        const expiresIn = Number(expiresMatch[1]);

        window.setTimeout(() => {
          token = ''  
        }, expiresIn*1000);

        window.history.pushState('Access Token', null , '/')

        return token;
    }else{
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        window.location = accessUrl;
    }   
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=
        ${term}`,
        {headers:
        {
            Authorization: `Bearer ${accessToken}`}
        } 
        ).then(res => {return res.json()}).then(jsonRes => {
            if (!jsonRes.tracks){
                return [];
            }else{
                return jsonRes.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artists: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri

                }))
            }
        })
    },

    savePlaylist(name,tracks){
        if((!name || !tracks.length)){
            return;
        }
        const token = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${token}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me',{headers: headers})
                    .then(res => res.json())
                    .then(jsonRes => {
                        userId = jsonRes.id;
                        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
                            headers: headers,
                            method: 'POST',
                            body: JSON.stringify({name: name})
                        }).then(res => res.json()).then(jsonRes => {
                            const playlistId = jsonRes.id;
                            return fetch(
                                `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                                {headers: headers,
                                method:'POST',
                                body: JSON.stringify({uris: tracks})}
                            )
                        })
                    })
        
    }
}

export default Spotify ; 