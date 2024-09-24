import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/home_css.css';
import MemoryGame from './screen/HomeScreen';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<MemoryGame />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
