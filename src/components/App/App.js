import { Playlist } from '../Playlist/Playlist';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import React from 'react';
import './App.css'
import  Spotify  from '../../util/Spotify';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName:'',
      playlistTracks:[],
      term:''
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack  = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
      
    } 
    this.setState({playlistTracks:[...this.state.playlistTracks,track]});
    
  }

  removeTrack(track){
    const filteredPlayList =  this.state.playlistTracks.filter(removedTrack => removedTrack.id !== track.id)
    this.setState({playlistTracks: filteredPlayList})
    
  }
  updatePlaylistName(name) {
    this.setState({playlistName:name})
  }
  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    console.log(trackUris)
    const name = this.state.playlistName;

    Spotify.savePlaylist(name,trackUris);
    this.setState(
      {
        playlistName: 'New Playlist',
        playlistTracks: []
      }
    )
  }
  search(term){
    Spotify.search(term).then(results => {
      
      this.setState({searchResults: results})
    })
  }
  render(){
    return (
    <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    
    <SearchBar onSearch={this.search}/>
    <div className="App-playlist">
      
      <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
      
      <Playlist 
            playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks} 
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist} />
    </div>
    <p>created by:   <strong> Muhammad Ramadan</strong></p>
  <p>special thanks to my love  <strong> Dina Youssri</strong></p>
  </div>
  
</div>
  );
  }
}

export default App;
