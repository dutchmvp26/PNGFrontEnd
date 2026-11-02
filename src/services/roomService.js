async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.errors?.[0]?.defaultMessage ||
      'Something went wrong.'
    );
  }

  return data;
}

export async function createRoom(numberOfPlayers = 2) {
  const response = await fetch('/api/rooms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ numberOfPlayers }),
  });

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
