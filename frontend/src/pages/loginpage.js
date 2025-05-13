import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  InputAdornment,
  Avatar,
  CssBaseline,
  useMediaQuery,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { Person as PersonIcon, Lock as LockIcon, Medication as MedicationIcon } from '@mui/icons-material';

// Create a custom theme with blue/teal gradient colors similar to the original
const theme = createTheme({
  palette: {
    primary: {
      main: '#2193b0',
      light: '#6dd5ed',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          padding: '12px 0',
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 20,
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '&:hover fieldset': {
              borderColor: '#2193b0',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
});

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:2000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      console.log('JWT Token:', data.token);
      
      // Stockage du token dans le localStorage/sessionStorage
      localStorage.setItem('authToken', data.token);
      
      // Redirection vers le dashboard
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Identifiants incorrects ou erreur serveur');
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(45deg, #2193b0, #6dd5ed)',
          padding: 2,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={24}
            sx={{
              p: isMobile ? 3 : 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 64,
                height: 64,
                mb: 2,
              }}
            >
              <MedicationIcon sx={{ fontSize: 40 }} />
            </Avatar>

            <Typography variant="h4" component="h1" fontWeight="600" gutterBottom>
              PharmStock
            </Typography>

            <Typography variant="h5" gutterBottom align="center">
              Welcome Back!
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom align="center" sx={{ mb: 4 }}>
              Please login to your account
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                fullWidth
                variant="outlined"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                variant="outlined"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  background: 'linear-gradient(45deg, #2193b0, #6dd5ed)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1c7a91, #5ec7df)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 5px 15px rgba(33, 147, 176, 0.3)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Sign In
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;