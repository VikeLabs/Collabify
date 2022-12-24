/** sendUnauth(res, error)
 * @params {NextResponse} res: response writer
 * @params {Error} error: error object thrown in catch block
 *
 * - Console log the error
 * - Sends back a 401 status code with a message:
 * 'Unauthorized access, please login.'
 */
export const sendUnauth = (res, error) => {
  console.log(error);
  res.status(401).json({ message: 'Unauthorized access, please signin.' });
};
