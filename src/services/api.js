import axios from 'axios';

export const API_BASE = 'https://trhuntapi-production.up.railway.app/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Game endpoints
export const fetchGames = async () => {
  const response = await api.get('/gameslist');
  return response.data;
};

export const updateGame = async (gameId, data) => {
  const response = await api.put(`/games/${gameId}`, data);
  return response.data;
};

export const deleteGame = async (gameId) => {
  const response = await api.delete(`/games/${gameId}`);
  return response.data;
};