import React from 'react';
import Box from '@mui/material/Box';

/**
 * ProjectFilter component for filtering projects by game
 * @param {Object} props - Component props
 * @param {string[]} props.games - Array of unique game names
 * @param {string|null} props.selectedGame - Currently selected game filter
 * @param {Function} props.onFilter - Filter handler function
 * @returns {JSX.Element} Filter buttons component
 */
const ProjectFilter = ({ games, selectedGame, onFilter }) => (
  <>
    {games.map((game) => (
      <Box
        key={game}
        onClick={() => onFilter(game)}
        sx={{
          color: 'white',
          padding: '8px 16px',
          borderRadius: 20,
          backgroundColor: selectedGame === game
            ? 'rgba(129, 150, 236, 0.7)'
            : 'rgba(255, 255, 255, 0.2)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: selectedGame === game
              ? 'rgba(129, 150, 236, 0.8)'
              : 'rgba(255, 255, 255, 0.3)',
          },
        }}
      >
        {game}
      </Box>
    ))}
  </>
);

export default ProjectFilter;
