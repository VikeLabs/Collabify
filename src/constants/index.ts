// API CONSTANTS
export const BASE_URL =
  process.env.NODE_ENV === 'production' ? 'collabify.space' : 'localhost:3000';
export const GROUP = '/api/groupCalendar';
export const BLOG = '/api/blog';
// LOCAL STORAGE CONSTANTS
export const RECENT_GROUPS_STORED = 'CollabifyRecentGroups';
export const THEME_STORED = 'CollabifyTheme';
export const CLOSE_ALL_TOOLTIPS = 'CollabifyCloseAllToolTips';
