import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Servicos from './pages/Servicos';
import Processo from './pages/Processo';
import Contato from './pages/Contato';
import './index.css';

function App() {
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
