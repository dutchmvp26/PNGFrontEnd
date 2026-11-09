  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { joinRoom, getAllRooms } from '../services/roomService';
  import './Home.css';

  function Home() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [showJoinForm, setShowJoinForm] = useState(false);
    const [showRooms, setShowRooms] = useState(false);
    const [roomCode, setRoomCode] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [rooms, setRooms] = useState([]);

    async function handleJoinRoom(event) {
      event.preventDefault();
      setLoading(true);
      setError('');

      try {
        const code = roomCode.trim();
        const participant = await joinRoom(code, playerName);
        navigate(`/rooms/${code}`, { state: { participant } });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    async function handleGetAllRooms() {
    try {
      const data = await getAllRooms();
      setRooms(data);
    } catch (err) {
      setError(err.message);
    }
  }

    return (
      <div className="home">
        <h1 className="home-title">Welcome!</h1>
        <p className="home-subtitle">Create or join a room to get started.</p>

        <div className="action-cards">
          <button className="action-card create-card" onClick={() => navigate('/rooms/new')}>
            Create Room
          </button>

          <button
            className="action-card"
            onClick={() => { setShowJoinForm(!showJoinForm); setShowRooms(false);
            }}
          >
            Join Room
          </button>

          <button className="action-card help-card">
            Need help?  
          </button>

        <button className="action-card" onClick={() => { if 
           (!showRooms) { void handleGetAllRooms();
        }
        setShowRooms(!showRooms);
        setShowJoinForm(false);
      }}
      > 
       {showRooms ? 'Close Rooms' : 'All Rooms'}
        </button>
      </div>

      {showRooms && rooms.length > 0 && (
    <div className="rooms-list">
      <h2>All Rooms</h2>

      {rooms.map(room => (
        <div key={room.id} className="room-card">
          <h3>{room.name}</h3>
          <p>Code: {room.roomCode}</p>
          <p>Status: {room.status}</p>
        </div>
      ))}
    </div>
  )}

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
      </div>
    );
  }

  export default Home;