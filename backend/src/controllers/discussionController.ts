import { logger } from '@/config/logger';
import { DiscussionModel } from '@/models/Discussion';
import { CreateDiscussionBody } from '@/validation/discussionValidation';
import { Request, Response } from 'express';

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

    return res.status(200).json({ discussionId: discussion.id });
  } catch (err) {
    logger.error('Error creating discussion.', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}
