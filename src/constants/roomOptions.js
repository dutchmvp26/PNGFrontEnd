// These values must match the enums in the backend
// (ActivityType.java and RoomIcon.java).

export const ACTIVITY_TYPES = [
  { value: 'VIDEO_GAMES', label: 'Video Games' },
  { value: 'SPORTS', label: 'Sports' },
  { value: 'BOARD_GAMES', label: 'Board Games' },
  { value: 'OTHER', label: 'Other' },
];

export const ROOM_ICONS = [
  { value: 'CONTROLLER', emoji: '🎮', label: 'Controller' },
  { value: 'BALL', emoji: '⚽', label: 'Ball' },
  { value: 'DICE', emoji: '🎲', label: 'Dice' },
  { value: 'CARDS', emoji: '🃏', label: 'Cards' },
  { value: 'TROPHY', emoji: '🏆', label: 'Trophy' },
  { value: 'ROCKET', emoji: '🚀', label: 'Rocket' },
];

export function getActivityLabel(value) {
  return ACTIVITY_TYPES.find((type) => type.value === value)?.label ?? value;
}

export function getIconEmoji(value) {
  return ROOM_ICONS.find((icon) => icon.value === value)?.emoji ?? '';
}
