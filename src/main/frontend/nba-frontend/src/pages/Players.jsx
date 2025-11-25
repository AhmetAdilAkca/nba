import React, { useEffect, useState } from 'react';
import { 
  Container, Grid, Paper, Typography, Box, Card, CardContent, CardActions, Button, CircularProgress, Alert, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllPlayers, createPlayer } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const [openAdd, setOpenAdd] = useState(false);
  const [newPlayer, setNewPlayer] = useState({ playerName: '', playerSurname: '', height: '', weight: '', nationality: '' });

  const handleAddPlayer = async () => {
    try {
        await createPlayer(newPlayer);
        setOpenAdd(false);
        setNewPlayer({ playerName: '', playerSurname: '', height: '', weight: '', nationality: '' });
        const data = await getAllPlayers();
        setPlayers(data);
    } catch (e) {
        console.error(e);
        alert('Failed to add player');
    }
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await getAllPlayers();
        setPlayers(data);
      } catch (err) {
        setError('Failed to load players');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter(player =>
    player.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (player.playerSurname && player.playerSurname.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
        <Typography variant="h4" component="h1" color="primary">
          Players
        </Typography>
        <TextField
          label="Search Players"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
        />
        {user?.role === 'ADMIN' && (
            <Button variant="contained" onClick={() => setOpenAdd(true)} sx={{ ml: 2 }}>
                Add Player
            </Button>
        )}
      </Box>

      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Player</DialogTitle>
        <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                <TextField label="Name" value={newPlayer.playerName} onChange={(e) => setNewPlayer({...newPlayer, playerName: e.target.value})} fullWidth />
                <TextField label="Surname" value={newPlayer.playerSurname} onChange={(e) => setNewPlayer({...newPlayer, playerSurname: e.target.value})} fullWidth />
                <TextField label="Height (cm)" type="number" value={newPlayer.height} onChange={(e) => setNewPlayer({...newPlayer, height: e.target.value})} fullWidth />
                <TextField label="Weight (kg)" type="number" value={newPlayer.weight} onChange={(e) => setNewPlayer({...newPlayer, weight: e.target.value})} fullWidth />
                <TextField label="Nationality" value={newPlayer.nationality} onChange={(e) => setNewPlayer({...newPlayer, nationality: e.target.value})} fullWidth />
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
            <Button onClick={handleAddPlayer} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={3}>
        {filteredPlayers.map((player) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={player.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {player.playerName} {player.playerSurname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Height: {player.height} cm
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Weight: {player.weight} kg
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Nationality: {player.nationality}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/players/${player.id}`}>View Profile</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        {filteredPlayers.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ p: 2 }}>No players found matching "{searchTerm}".</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Players;
