async function handleResponse(response) {
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

export async function joinRoom(roomCode, name) {
  const response = await fetch('/api/rooms/join', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ roomCode, name }),
  });

  return handleResponse(response);
}
