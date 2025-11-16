import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const TeamDetail = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8080/api/teams/${id}`),
      axios.get(`http://localhost:8080/api/teams/${id}/roster`)
    ])
      .then(([teamRes, rosterRes]) => {
        setTeam(teamRes.data);
        setRoster(rosterRes.data);
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
      <Link to="/teams">← Geri Dön</Link>
      <h2>{team?.name} Kadrosu</h2>
      <ul>
        {roster.map(player => (
          <li key={player.id}>
            <Link to={`/players/${player.id}`}>
              {player.player_name} {player.player_surname}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamDetail;
