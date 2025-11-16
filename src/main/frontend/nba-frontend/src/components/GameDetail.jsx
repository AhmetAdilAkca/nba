import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [homeTeamStats, setHomeTeamStats] = useState([]);
  const [awayTeamStats, setAwayTeamStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8080/api/games/${id}`),
      axios.get(`http://localhost:8080/api/stats?gameId=${id}`)
    ])
      .then(([gameRes, statsRes]) => {
        setGame(gameRes.data);
        const stats = statsRes.data;
        setHomeTeamStats(stats.filter(s => s.team_id === gameRes.data.home_team_id));
        setAwayTeamStats(stats.filter(s => s.team_id === gameRes.data.away_team_id));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <div className="container">
      <Link to="/games">← Geri Dön</Link>
      <h2>{game?.home_team} {game?.home_score} - {game?.away_score} {game?.away_team}</h2>
      
      <h3>{game?.home_team}</h3>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Oyuncu</th>
            <th>Puan</th>
            <th>Ribaund</th>
            <th>Asist</th>
          </tr>
        </thead>
        <tbody>
          {homeTeamStats.map((stat, idx) => (
            <tr key={idx}>
              <td>{stat.player_name}</td>
              <td>{stat.points}</td>
              <td>{stat.rebounds}</td>
              <td>{stat.assists}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{game?.away_team}</h3>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Oyuncu</th>
            <th>Puan</th>
            <th>Ribaund</th>
            <th>Asist</th>
          </tr>
        </thead>
        <tbody>
          {awayTeamStats.map((stat, idx) => (
            <tr key={idx}>
              <td>{stat.player_name}</td>
              <td>{stat.points}</td>
              <td>{stat.rebounds}</td>
              <td>{stat.assists}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameDetail;
