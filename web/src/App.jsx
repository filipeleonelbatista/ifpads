import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import Pads from './pages/Pads';
import Config from './pages/Config';
import { AudioContext } from './context/AudioContext';

export default function App() {
  return (
    <AudioContext.Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Pads />} />
          <Route path="/:pad_id" element={<Pads />} />
          <Route path="/configuracoes" element={<Config />} />
        </Routes>
      </Router >
    </AudioContext.Provider>
  );
}
