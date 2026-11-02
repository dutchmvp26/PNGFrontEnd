import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getRoom } from '../services/roomService';
import { getActivityLabel, getIconEmoji } from '../constants/roomOptions';
import './Room.css';

function Room() {
  // The room code comes from the URL, e.g. /rooms/AB12CD
  const { roomCode } = useParams();

  // Extra info passed by Home (after joining) or CreateRoom (after creating).
  // It's empty when someone opens the link directly, e.g. a shared link.
  const { state } = useLocation();

  const [room, setRoom] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    getRoom(roomCode)
      .then((data) => {
        if (!ignore) setRoom(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      });

    return () => {
      ignore = true;
    };
  }, [roomCode]);

  if (error) {
    return (
      <div className="room-page">
        <p className="error-message">{error}</p>
        <Link to="/" className="back-button">
          Back to home
        </Link>
      </div>
    );
  }

  if (!room) {
    return <p className="room-loading">Loading room...</p>;
  }

  return (
    <div className="room-page">
      {state?.participant && (
        <p className="room-success">You joined as {state.participant.name}!</p>
      )}
      {state?.created && (
        <p className="room-success">Room created! Share the code with your friends.</p>
      )}

      <div className="room-card">
        <span className="room-icon">{getIconEmoji(room.icon)}</span>
        <h1 className="room-name">{room.name}</h1>
        {room.description && <p className="room-description">{room.description}</p>}

        <p className="room-label">Room code</p>
        <p className="room-code">{room.roomCode}</p>
      </div>

      <div className="room-details">
        <div className="room-detail">
          <p className="room-label">Activity</p>
          <p className="room-value">{getActivityLabel(room.activityType)}</p>
        </div>
        <div className="room-detail">
          <p className="room-label">Max players</p>
          <p className="room-value">{room.numberOfPlayers}</p>
        </div>
        <div className="room-detail">
          <p className="room-label">Status</p>
          <p className="room-value">{room.status}</p>
        </div>
      </div>

      <Link to="/" className="back-button">
        Back to home
      </Link>
    </div>
  );
}

export default Room;