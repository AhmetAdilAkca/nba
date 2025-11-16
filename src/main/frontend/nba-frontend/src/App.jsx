import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TeamList from './components/TeamList';
import TeamDetail from './components/TeamDetail';
import PlayerList from './components/PlayerList';
import PlayerDetail from './components/PlayerDetail';
import GameList from './components/GameList';
import GameDetail from './components/GameDetail';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<TeamList />} />
        <Route path="/teams" element={<TeamList />} />
        <Route path="/teams/:id" element={<TeamDetail />} />
        <Route path="/players" element={<PlayerList />} />
        <Route path="/players/:id" element={<PlayerDetail />} />
        <Route path="/games" element={<GameList />} />
        <Route path="/games/:id" element={<GameDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
