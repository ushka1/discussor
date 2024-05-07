import { Request, Response } from 'express';

// Dynamic import usage because of LiveKitServerSDK being an ESM module.
const livekitServerSdk = import('livekit-server-sdk');

export async function getConferenceToken(req: Request, res: Response) {
  const userId = req.user!.id;
  const discussionId = 'main-room';

  const { AccessToken } = await livekitServerSdk;
  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: userId,
      ttl: '10m',
    },
  );
  token.addGrant({
    room: discussionId,
    roomJoin: true,
  });

  const jwt = await token.toJwt();
  return res.json(jwt);
}
