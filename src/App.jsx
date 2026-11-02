import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateRoom from './pages/CreateRoom';
import Room from './pages/Room';

function App() {
  return (
    <>
      <Navbar />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<CreateRoom />} />
          <Route path="/rooms/:roomCode" element={<Room />} />
        </Routes>
      </main>
    </>
  );
}

export default App;