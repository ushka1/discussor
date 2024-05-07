import { logger } from '@/config/logger';
import { DiscussionModel } from '@/models/Discussion';
import { UserDocument } from '@/models/User';
import { CreateDiscussionBody } from '@/validation/discussionValidation';
import { Request, Response } from 'express';
import { ProjectionFields, isValidObjectId } from 'mongoose';

// Dynamic import usage because of LiveKitServerSDK being an ESM module.
const livekitServerSdk = import('livekit-server-sdk');

export async function getDiscussionByIdHandler(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid ID format.' });
    }

    const discussion = await DiscussionModel.findById(id, {
      organizer: 1,
      title: 1,
      description: 1,
      tags: 1,
      startTime: 1,
      durationInMinutes: 1,
    }).populate<{ organizer: UserDocument }>('organizer', {
      username: 1,
      email: 1,
    } satisfies ProjectionFields<UserDocument>);

    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found.' });
    }

    return res.status(200).json(discussion);
  } catch (err) {
    logger.error('Error getting discussions.', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

export async function getAllDiscussionsHandler(req: Request, res: Response) {
  try {
    const discussions = await DiscussionModel.find(
      {},
      {
        organizer: 1,
        title: 1,
        description: 1,
        tags: 1,
        startTime: 1,
        durationInMinutes: 1,
      },
    ).populate<{ organizer: UserDocument }>('organizer', {
      username: 1,
      email: 1,
    } satisfies ProjectionFields<UserDocument>);

    return res.status(200).json(discussions);
  } catch (err) {
    logger.error('Error getting discussions.', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

export async function createDiscussionHandler(req: Request, res: Response) {
  try {
    const user = req.user!;
    const { title, description, tags, startTime, durationInMinutes } =
      req.body as CreateDiscussionBody;

    const discussion = await DiscussionModel.create({
      organizer: user,
      title,
      description,
      tags,
      startTime,
      durationInMinutes,
    });

    return res.status(200).json(discussion.id);
  } catch (err) {
    logger.error('Error creating discussion.', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

export async function deleteDiscussionByIdHandler(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid ID format.' });
    }

    const discussion = await DiscussionModel.findById(id);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found.' });
    }

    const userId = req.user!._id;
    const organizerId = discussion.organizer._id;
    if (!userId.equals(organizerId)) {
      return res.status(403).json({ message: 'User is not the organizer.' });
    }

    await discussion.deleteOne();
    return res.status(200).json({ message: 'Discussion deleted.' });
  } catch (err) {
    logger.error('Error getting discussions.', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

export async function getDiscussionConferenceToken(
  req: Request,
  res: Response,
) {
  const userId = req.user!.id;
  const discussionId = req.params.id;

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
