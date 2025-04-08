import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { fetchGames, deleteGame } from '../../services/api';

const Games = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  const columns = [
    { field: 'gameId', headerName: 'Game ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'difficulty', headerName: 'Difficulty', width: 130 },
    { field: 'clues', headerName: 'Clues', width: 100, valueGetter: (params) => params.row.clues.length },
    { field: 'category', headerName: 'Category', width: 180 },
    { field: 'rewardPoints', headerName: 'Points', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div className="flex gap-2">
          <Button 
            variant="contained" 
            size="small"
            onClick={() => setSelectedGame(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      const data = await fetchGames();
      setGames(data);
    } catch (error) {
      console.error('Error loading games:', error);
    }
  };

  const handleDelete = async (gameId) => {
    try {
      await deleteGame(gameId);
      loadGames();
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Game Management</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setSelectedGame({})}
        >
          Create New Game
        </Button>
      </div>

      <GameForm
        open={Boolean(selectedGame)}
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
        onSave={loadGames}
      />

      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={games}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
};

export default Games;