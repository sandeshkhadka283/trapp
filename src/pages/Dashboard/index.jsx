import { useEffect, useState } from 'react';
import { fetchGames } from '../../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalGames: 0,
    totalClues: 0,
    difficultyDistribution: []
  });

  useEffect(() => {
    const loadStats = async () => {
      const games = await fetchGames();
      const totalClues = games.reduce((acc, game) => acc + game.clues.length, 0);
      
      const difficultyCount = games.reduce((acc, game) => {
        acc[game.difficulty] = (acc[game.difficulty] || 0) + 1;
        return acc;
      }, {});

      setStats({
        totalGames: games.length,
        totalClues,
        difficultyDistribution: Object.entries(difficultyCount).map(([name, count]) => ({ name, count }))
      });
    };

    loadStats();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Game Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded">
            <div className="text-3xl font-bold text-blue-600">{stats.totalGames}</div>
            <div className="text-gray-600">Total Games</div>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <div className="text-3xl font-bold text-green-600">{stats.totalClues}</div>
            <div className="text-gray-600">Total Clues</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Difficulty Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.difficultyDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2c3e50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;