import jwt from 'jsonwebtoken';

export type TokenPayload = {
  userId: string;
};

export async function generateAccessToken(
  payload: TokenPayload,
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
      (error, encoded) => {
        if (error) return reject(error);
        if (!encoded) return reject('Token could not be generated.');

        resolve(encoded);
      },
    );
  });
}

export async function verifyAccessToken(token: string): Promise<TokenPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
      if (error) return reject(error);
      if (!payload) return reject('Payload could not be retrieved.');

      resolve(payload as TokenPayload);
    });
  });
}
