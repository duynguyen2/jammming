import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Playlist from '../components/Playlists/Playlists';
import SearchBar from '../components/SearchBar/SearchBar';
import SearchResults from '../components/SearchResults/SearchResults';
import Spotify from '../util/Spotify';


function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  /*
  useEffect(() => {
      const timeout = setTimeout(() => {
        if (term) search(term);
      }, 500);

      return () => clearTimeout(timeout);
  }, [term]);
  */

  // search logic
  const search = async (term) => {
    const results = await Spotify.search(term);
    console.log('SEARCH RESULTS:', results);
    setSearchResults(results);
  };

  // adding track logic
  const addTrack = (track) => {
    if (playlistTracks.find(t => t.id === track.id)) return;
    setPlaylistTracks([...playlistTracks, track]);
  };

  // remove track logic
  const removeTrack = (track) => {
    setPlaylistTracks(
      playlistTracks.filter(t => t.id !== track.id)
    );
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = async() => {
    const uris = playlistTracks.map(track => track.uri);
    await Spotify.savePlaylist(playlistName, uris);

    setPlaylistName('New Playlist');
    setPlaylistTracks([]);
  };

  return (
    <div>
      <h1>Ja<span>mmm</span>ing</h1>
      <SearchBar onSearch={search} />
      <div className="App-playlist">
        <SearchResults
          searchResults={searchResults}
          onAdd={addTrack}
        />
        <Playlist
          name={playlistName}
          tracks={playlistTracks}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
        />
      </div>
    </div>
  )
}

export default App;
