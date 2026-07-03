import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Servicos from './pages/Servicos';
import Processo from './pages/Processo';
import Contato from './pages/Contato';
import SplashScreen from './components/SplashScreen';
import './index.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/processo" element={<Processo />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </Router>
  );
}

export default App;
