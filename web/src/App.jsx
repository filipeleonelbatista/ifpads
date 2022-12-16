import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { AudioContextProvider } from './context/AudioContext';
import Config from './pages/Config';
import MyPad from './pages/MyPad';
import Pads from './pages/Pads';

import './styles/globals.css'

export default function App() {
  return (
    <AudioContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Pads />} />
          <Route path="/configuracoes" element={<Config />} />
          <Route path="/editar-pad" element={<MyPad />} />
        </Routes>
      </Router >
    </AudioContextProvider>
  );
}
