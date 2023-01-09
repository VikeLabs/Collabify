import Cookie_ from 'cookies';

/**
 * @class
 * @constructor
 */
export class Cookie extends Cookie_ {
  /**
   * @param {Request} req
   * @param {Response} res
   */
  constructor(req, res) {
    super(req, res);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @return {Cookie} an instance of the Cookie
   */
  static New(req, res) {
    if (!req || !res) {
      throw new Error(
        'Missing params - method signature: (req: Request, res: Response)'
      );
    }
    return new Cookie(req, res);
  }

  /**
   * @return {string} `private_group` from cookie
   */
  getPrivateGroupToken() {
    return this.get('private_group');
  }

  /**
   * @param {string} token
   *
   * Sets a cookie entry `private_group` with the value token
   */
  setPrivateGroupToken(token) {
    const cookieOpt = {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: false,
    };
    this.set('private_group', token, cookieOpt);
  }
}
