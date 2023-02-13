import { Credentials } from 'blog/api/types';
import { AdminModel } from '../models/admin.models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ApiError } from 'api-lib/util/apiError';

const SECRET = process.env.ADMIN_SECRET;

export const createAnAdmin = async (u: Credentials) => {
  try {
    const plainPw = u.password;
    const hashed = await bcrypt.hash(plainPw, 10);
    u.password = hashed;
    await AdminModel.saveOne(u);
    return;
  } catch (e) {
    return new ApiError(e, 400);
  }
};

function signToken(payload: any): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET, { expiresIn: '168h' }, (err, token) => {
      if (err) return reject(err);
      return resolve(token);
    });
  });
}
