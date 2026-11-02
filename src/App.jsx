import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateRoom from './pages/CreateRoom';
import Room from './pages/Room';

function App() {
  // Which page is shown: 'home', 'createRoom' or 'room'
  const [page, setPage] = useState('home');
  const [createdRoom, setCreatedRoom] = useState(null);

  function handleRoomCreated(room) {
    setCreatedRoom(room);
    setPage('room');
  }

  return (
    <>
      <Navbar onHomeClick={() => setPage('home')} />
      <main className="page">
        {page === 'home' && (
          <Home onCreateRoomClick={() => setPage('createRoom')} />
        )}

        {page === 'createRoom' && (
          <CreateRoom
            onRoomCreated={handleRoomCreated}
            onCancel={() => setPage('home')}
          />
        )}

        {page === 'room' && (
          <Room room={createdRoom} onBackClick={() => setPage('home')} />
        )}
      </main>
    </>
  );
}

export default App;
