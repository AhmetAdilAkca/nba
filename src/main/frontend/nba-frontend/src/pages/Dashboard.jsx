// This page acts as the main landing page, aggregating key statistics, standings, and recent activity.
// It serves as the central hub for users to get a quick overview of the league.
import React, { useEffect, useState } from 'react';
import {
  Container, Grid, Paper, Typography, Box, Card, CardContent, CircularProgress, Alert, Button
} from '@mui/material';
import { getStandings, getRecentGames, getAllSeasons } from '../services/api';
import LeadersSection from '../components/LeadersSection';
import AdvancedAnalysisModal from '../components/AdvancedAnalysisModal';

const Dashboard = () => {
  const [standings, setStandings] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seasonId, setSeasonId] = useState(null);
  const [analysisOpen, setAnalysisOpen] = useState(false);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const seasons = await getAllSeasons();
        if (seasons && seasons.length > 0) {
          const sorted = [...seasons].sort((a, b) => b.id - a.id);
          setSeasonId(sorted[0].id);
        }
      } catch (e) {
        console.error("Failed to fetch seasons", e);
      }
    };
    fetchSeasons();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [standingsData, gamesData] = await Promise.all([
          getStandings(),
          getRecentGames()
        ]);

        console.log('Dashboard: standingsData=', standingsData);
        console.log('Dashboard: gamesData=', gamesData);

        const normalizedStandings = Array.isArray(standingsData)
          ? standingsData
          : (standingsData && Array.isArray(standingsData.data) ? standingsData.data : []);

        const normalizedGames = Array.isArray(gamesData)
          ? gamesData
          : (gamesData && Array.isArray(gamesData.data) ? gamesData.data : []);

        setStandings(normalizedStandings);
        setGames(normalizedGames);
        console.log(normalizedGames)
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'teamName', headerName: 'Team', width: 200 },
    { field: 'wins', headerName: 'W', type: 'number', width: 90 },
    { field: 'losses', headerName: 'L', type: 'number', width: 90 },
    {
      field: 'winPct',
      headerName: 'Pct',
      type: 'number',
      width: 90,
      valueFormatter: (value, row) => {
        const val = (value && typeof value === 'object' && value.value !== undefined)
          ? value.value
          : value;

        if (typeof val !== 'number' || isNaN(val)) return '0.0%';

        return `${(val * 100).toFixed(1)}%`;
      }
    },
  ];

  const rows = standings.map((team, index) => {
    const teamName = team.teamName || team.name || '';
    const wins = typeof team.wins === 'number' ? team.wins : Number(team.wins) || 0;
    const losses = typeof team.losses === 'number' ? team.losses : Number(team.losses) || 0;

    let winPct = 0;
    if (wins + losses > 0) {
      winPct = wins / (wins + losses);
    }
    return {
      id: team.teamId || team.id || index,
      teamName,
      wins,
      losses,
      winPct,
      _raw: team,
    };
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography component="h1" variant="h4" color="primary">
          Dashboard
        </Typography>
        <Button variant="contained" color="secondary" onClick={() => setAnalysisOpen(true)}>
          Advanced Analysis
        </Button>
      </Box>

      {seasonId && <LeadersSection seasonId={seasonId} standings={standings} standingsColumns={columns} standingsRows={rows} />}

      <AdvancedAnalysisModal
        open={analysisOpen}
        onClose={() => setAnalysisOpen(false)}
        seasonId={seasonId}
      />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Recent Games
            </Typography>
            <Grid container spacing={2}>
              {games.map((game) => {
                const fmtDate = game.date || '';
                const homeTeamStr = game.homeTeamName || '';
                const awayTeamStr = game.awayTeamName || '';
                const homeScore = game.homeScore ?? '';
                const awayScore = game.awayScore ?? '';
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
                    <Card elevation={3} sx={{ borderRadius: 2, border: '1px solid #e0e0e0', transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
                      <CardContent>
                        <Typography variant="caption" display="block" align="center" color="text.secondary" gutterBottom>
                          {fmtDate}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{homeTeamStr}</Typography>
                          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>{homeScore}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>{awayTeamStr}</Typography>
                          <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 'bold' }}>{awayScore}</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
              {games.length === 0 && (
                <Typography variant="body1" sx={{ p: 2 }}>No recent games found.</Typography>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
