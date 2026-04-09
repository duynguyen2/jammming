import React, { useState, useEffect } from 'react';
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

  const testToken = async() => {
    const token = await Spotify.getAccessToken();

    const res = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    console.log('USER DATA:', data);
  };

  useEffect(() => {
    //testToken();
  }, []);

  // search logic
  const search = async (term) => {
    if(!term) return;

    setLoading(true);

    try {
      const results = await Spotify.search(term);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // adding track logic
  const addTrack = (track) => {
    setPlaylistTracks(prevTracks => {
        if (prevTracks.find(t => t.id === track.id)) return prevTracks;
        return[...prevTracks, track];
      }
    )
  };

  // remove track logic
  const removeTrack = (track) => {
    setPlaylistTracks(prevTracks =>
      prevTracks.filter(t => t.id !== track.id)
    );
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = async() => {
    if(!playlistName || playlistTracks.length === 0) return;
    setLoading(true);

    try {
      const uris = playlistTracks.map(track => track.uri);
      console.log('Track URIs:', uris);
      await Spotify.savePlaylist(playlistName, uris);

      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
    } catch(e) {
      console.error('Failed to save playlist:', e);
    } finally {
      setLoading(false);
    }
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
        {loading && <p>Loading...</p>}
      </div>
    </div>
  )
}

export default App;
