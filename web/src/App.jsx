import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { AudioContextProvider } from './context/AudioContext';
import Config from './pages/Config';
import Pads from './pages/Pads';

export default function App() {
  return (
    <AudioContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Pads />} />
          <Route path="/configuracoes" element={<Config />} />
        </Routes>
      </Router >
    </AudioContextProvider>
  );
}
