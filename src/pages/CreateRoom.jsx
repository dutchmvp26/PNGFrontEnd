import { useState } from 'react';
import { createRoom } from '../services/roomService';
import { ACTIVITY_TYPES, ROOM_ICONS } from '../constants/roomOptions';
import './CreateRoom.css';

// 2, 3, 4 ... 30
const playerOptions = [];
for (let i = 2; i <= 30; i++) {
  playerOptions.push(i);
}

function CreateRoom({ onRoomCreated, onCancel }) {
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const [activityType, setActivityType] = useState(ACTIVITY_TYPES[0].value);
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [icon, setIcon] = useState(ROOM_ICONS[0].value);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const room = await createRoom({
        name: roomName,
        description,
        activityType,
        icon,
        numberOfPlayers: Number(maxPlayers),
      });

      onRoomCreated(room);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="create-room">
      <h1 className="create-room-title">Create a room</h1>

      <form className="create-room-form" onSubmit={handleSubmit}>
        <div className="form-columns">
          <div className="form-column">
            <label className="form-label">
              Room name
              <input
                type="text"
                placeholder="Name of room"
                value={roomName}
                onChange={(event) => setRoomName(event.target.value)}
                maxLength={50}
                required
              />
            </label>

            <label className="form-label">
              Room description
              <textarea
                placeholder="Description goes here"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                maxLength={300}
              />
            </label>
          </div>

          <div className="form-column">
            <label className="form-label">
              Type of activity
              <select
                value={activityType}
                onChange={(event) => setActivityType(event.target.value)}
              >
                {ACTIVITY_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-label">
              Max. amount of participants
              <select
                value={maxPlayers}
                onChange={(event) => setMaxPlayers(event.target.value)}
              >
                {playerOptions.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </label>

            <div className="form-label">
              Room icon
              <div className="icon-picker">
                {ROOM_ICONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`icon-option ${icon === option.value ? 'selected' : ''}`}
                    onClick={() => setIcon(option.value)}
                    title={option.label}
                    aria-label={option.label}
                    aria-pressed={icon === option.value}
                  >
                    {option.emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="form-buttons">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? 'Creating...' : '+ Create Room!'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRoom;
