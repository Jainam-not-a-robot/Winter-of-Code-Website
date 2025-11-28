import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100vw', 
        backgroundImage: `url('https://i.imgur.com/We1DyJi.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat', 
      }}
    >
      <Typography variant="h1" sx={{ color: 'black', fontSize: '5rem' }}>
        404
      </Typography>
      <Typography variant="h6" sx={{ color: 'black', marginBottom: '20px' }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button
        onClick={() => {
          navigate('/');
        }}
        variant="contained"
        sx={{ backgroundColor: 'primary.main' }}
      >
        Back Home
      </Button>
    </Box>
  );
}
