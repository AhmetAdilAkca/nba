import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/games')
      .then(response => {
        setGames(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <div className="container">
      <h2>Maç Listesi</h2>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            <Link to={`/games/${game.id}`}>
              {game.home_team} {game.home_score} - {game.away_score} {game.away_team}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
