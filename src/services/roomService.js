async function handleResponse(response) {

    if (response.status === 204) {
    return null;
  }
    
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.errors?.[0]?.defaultMessage ||
      data.message ||
      'Something went wrong.'
    );
  }

  return data;
}

// room = { name, description, activityType, icon, numberOfPlayers }
export async function createRoom(room) {
  const response = await fetch('/api/rooms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(room),
  });

  return handleResponse(response);
}

export async function getRoom(roomCode) {
  const response = await fetch(`/api/rooms/${encodeURIComponent(roomCode)}`);

  return handleResponse(response);
}

export async function deleteRoom(roomCode) {
  const response = await fetch(`/api/rooms/${encodeURIComponent(roomCode)}`, {
    method: 'DELETE',
  });

  return handleResponse(response);
}

export async function getAllRooms() {
  const response = await fetch('/api/rooms');

  return handleResponse(response);
}

export async function joinRoom(roomCode, name) {
  const response = await fetch('/api/rooms/join', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ roomCode, name }),
  });

  return handleResponse(response);
}
