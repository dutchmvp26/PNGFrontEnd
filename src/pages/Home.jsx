import { useState } from 'react';
import { joinRoom } from '../services/roomService';
import './Home.css';

function Home({ onCreateRoomClick }) {
  const [participant, setParticipant] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [showJoinForm, setShowJoinForm] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [playerName, setPlayerName] = useState('');

  async function handleJoinRoom(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await joinRoom(roomCode, playerName);
      setParticipant(data);
      setShowJoinForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="home">
      <h1 className="home-title">Welcome!</h1>
      <p className="home-subtitle">Create or join a room to get started.</p>

      <div className="action-cards">
        <button className="action-card create-card" onClick={onCreateRoomClick}>
          Create Room
        </button>

        <button
          className="action-card"
          onClick={() => setShowJoinForm(!showJoinForm)}
        >
          Join Room
        </button>

        <button className="action-card help-card">
          Need help?
        </button>
      </div>

      {showJoinForm && (
        <form className="join-form" onSubmit={handleJoinRoom}>
          <h2>Join a room</h2>

          <input
            type="text"
            placeholder="Room code"
            value={roomCode}
            onChange={(event) => setRoomCode(event.target.value.toUpperCase())}
            required
          />

          <input
            type="text"
            placeholder="Your name"
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
            required
          />

          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? 'Joining...' : 'Join'}
          </button>
        </form>
      )}

      {error && <p className="error-message">{error}</p>}

      {participant && (
        <div className="room-result">
          <h2>Successfully joined!</h2>
          <p>You joined as {participant.name}.</p>
        </div>
      )}
    </div>
  );
}

export default Home;
