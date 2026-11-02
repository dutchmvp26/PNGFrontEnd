import { getActivityLabel, getIconEmoji } from '../constants/roomOptions';
import './Room.css';

function Room({ room, onBackClick }) {
  return (
    <div className="room-page">
      <p className="room-success">Room created! Share the code with your friends.</p>

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

      <button className="back-button" onClick={onBackClick}>
        Back to home
      </button>
    </div>
  );
}

export default Room;
