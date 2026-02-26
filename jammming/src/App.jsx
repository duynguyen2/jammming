import { useState, useCallback } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Playlists from '../components/Playlists/Playlists';
import SearchBar from '../components/SearchBar/SearchBar';
import SearchResults from '../components/SearchResults/SearchResults';
import Spotify from '../util/Spotify';


function App() {
  const [count, setCount] = useState(0)
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const search = useCallback(item => {
    Spotify.search(item).then(setSearchResults);
  }, []);

  const addTrack = useCallback(track => {
    if(playlistTracks.some(savedTrack => savedTrack.id === track.id))
      return;

    setPlaylistTracks(prevTracks => [...prevTracks, track])
  }, [playlistTracks]);

  const removeTrack = useCallback(track => {
    setPlaylistTracks(prevTracks =>
      prevTracks.filter(currentTrack => currentTrack.id === track.id)
    );
  }, []);

  const updatePlaylistName = useCallback(name => {
    setPlaylistName(name);
  }, []);

  const savePlaylist = useCallback(() => {
    const trackURIs = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks]);

  return (
    <div>
      <h1>Jammming</h1>
      <div className='App'>
        <SearchBar onSearch={search} />
        <div className='App-Playlist'>
          <SearchResults SearchResults={searchResults} onAdd={addTrack} />
          <Playlists
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemove={removeTrack}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  )
}

export default App
