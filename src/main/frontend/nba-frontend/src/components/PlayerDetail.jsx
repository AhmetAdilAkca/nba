// This component shows detailed information about a single player.
// It fetches player details and their stats to display on the page.
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PlayerDetail = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8080/api/players/${id}`),
      axios.get(`http://localhost:8080/api/stats?playerId=${id}`)
    ])
      .then(([playerRes, statsRes]) => {
        setPlayer(playerRes.data);
        setStats(statsRes.data);
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
      <Link to="/players">← Geri Dön</Link>
      <h2>{player?.player_name} {player?.player_surname}</h2>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Maç Tarihi</th>
            <th>Puan</th>
            <th>Ribaund</th>
            <th>Asist</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat, idx) => (
            <tr key={idx}>
              <td>{stat.game_date}</td>
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

export default PlayerDetail;
