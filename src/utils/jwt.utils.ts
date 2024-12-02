import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || '02345678';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
};

export const verifyToken = (token: string): object | null => {
  try {
    let data : any = jwt.verify(token, SECRET_KEY);
    return data
  } catch (err) {
    return null;
  }
};
