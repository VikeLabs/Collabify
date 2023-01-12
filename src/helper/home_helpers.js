import { GROUP } from 'constants';
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
 * @typedef {Object} ResponseData
 * @property {string} groupID
 * @property {string} [token]
 */

/**
 * @callback RequestCallback
 * @param {string} [errorMessage]
 * @param {ResponseData} [data]
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

    return cb(null, data);
  } catch (e) {
    console.log(e);
    return cb('Something went wrong. Please try again later.', null);
  }
}
