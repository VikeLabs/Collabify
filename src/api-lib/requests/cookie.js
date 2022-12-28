import C from 'cookies';

/**
 * @class
 * @constructor
 */
export class Cookie {
  cookie;

  /**
   * @param {Request} req
   * @param {Response} res
   */
  constructor(req, res) {
    this.cookie = new C(req, res);
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
    return this.cookie.get('private_group');
  }

  /**
   * @return {void} set `private_group` to cookie
   */
  setPrivateGroupToken(token) {
    const cookieOpt = {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: false,
    };
    this.cookie.set('private_group', token, cookieOpt);
  }
}
