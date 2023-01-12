import { GROUP, PRIVATE_GROUP_ACCESS_TOKENS } from 'constants';
/**
 * @typedef {Object} RequestBody
 * @property {string} name
 * @property {boolean} isPrivate
 * @property {string} [password]
 * @property {string} description
 * @property {string} icon
 * @property {string} calendarMinTime
 * @property {string} calendarMaxTime
 */

/**
 * @callback RequestCallback
 * @param {string} [errorMessage]
 * @param {string} [groupID]
 * @returns {void}
 */

/**
 * @param {RequestBody} body
 * @param {RequestCallback} cb
 */
export async function createGroupRequest(body, cb) {
  try {
    const response = await fetch(GROUP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.status !== 201) {
      return cb(data.message, null);
    }

    data['access_token'] && saveGroupToken(data);

    return cb(null, data['groupID']);
  } catch (e) {
    console.log(e);
    return cb('Something went wrong. Please try again later.', null);
  }
}

/**
 * @param {RequestBody} data
 */
export function saveGroupToken(data) {
  if (typeof window === 'undefined') return;

  const savedGroups = localStorage.getItem(PRIVATE_GROUP_ACCESS_TOKENS);

  const privateGroupTokens = savedGroups ? JSON.parse(savedGroups) : [];

  privateGroupTokens.push(data);

  localStorage.setItem(
    PRIVATE_GROUP_ACCESS_TOKENS,
    JSON.stringify(privateGroupTokens)
  );
}
