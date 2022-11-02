// API CONSTANTS
export const BASE_URL =
  process.env.NODE_ENV === 'production' ? 'colabify.ca' : 'localhost:3000';
export const GROUP = '/api/group';
export const AVAILABILITY = '/api/availability';
// LOCAL STORAGE CONSTANTS
export const RECENT_GROUPS_STORED = 'CollabifyRecentGroups'
export const THEME_STORED = 'CollabifyTheme'