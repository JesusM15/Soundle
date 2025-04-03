import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import ArtistScreen from './pages/ArtistScreen.jsx';
import GameScreen from './pages/GameScreen.jsx';

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<ArtistScreen />} />
      <Route path="/game/:id" element={<GameScreen />} />
    </Routes>
  </Router>
)
