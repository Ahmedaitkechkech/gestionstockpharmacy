import React from 'react';
import './App.css';
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Layout from "./components/Layout"
import LoginPage from './pages/loginpage';
import Dashboard from './pages/Dashboard';
import Medications from './pages/Medications';
import Batches from './pages/Batches';
import Users from './pages/Users';
import Logs from './pages/Logs';
import StockMovement from './pages/StockMovement';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



// Create a custom theme with green primary color
const theme = createTheme({
  palette: {
    primary: {
      main: "#16a34a",
    },
    secondary: {
      main: "#f5f5f5",
    },
    background: {
      default: "#f9fafb",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
})

function AppContent() {
  const location = useLocation();
  const isLogin = location.pathname === '/';

  return (
    <>
      {isLogin ? (
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      ) : (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/medications" element={<Medications />} />
              <Route path="/batches" element={<Batches />} />
              <Route path="/stockmovement" element={<StockMovement />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/users" element={<Users />} />
              
              {/* Ajoutez d'autres routes ici si besoin */}
            </Routes>
          </Layout>
        </ThemeProvider>
      )}
    </>
  );
}


function App() {
  return (
    <Router>
    <AppContent />
  </Router>
  );
}

export default App;
