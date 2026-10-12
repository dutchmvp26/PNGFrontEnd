
import { useState } from 'react';
import './App.css';

function App() {
  const [room, setRoom] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function createRoom() {
    setLoading(true);
    setError('');
    setRoom(null);

    try {
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numberOfPlayers: 2,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.errors?.[0]?.defaultMessage ||
          'Failed to create room'
        );
      }

      setRoom(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>PNG Room Manager</h1>
      <p>Create a room using the Spring Boot backend.</p>

      <button onClick={createRoom} disabled={loading}>
        {loading ? 'Creating...' : 'Create room'}
      </button>

      {error && <p className="error">Error: {error}</p>}

      {room && (
        <section className="room">
          <h2>Room created!</h2>
          <p>
            Room code: <strong>{room.roomCode}</strong>
          </p>
          <p>
            Number of players: {room.numberOfPlayers}
          </p>
          <h3>Full backend response</h3>
          <pre>{JSON.stringify(room, null, 2)}</pre>
        </section>
      )}
    </main>
  );
}

export default App;
