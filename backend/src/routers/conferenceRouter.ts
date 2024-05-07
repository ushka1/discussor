import { getConferenceToken } from '@/controllers/conferenceController';
import { securityMiddleware } from '@/security/securityMiddleware';
import { Router } from 'express';

export const conferenceRouter = Router();

conferenceRouter.get(
  '/conference/token',
  securityMiddleware,
  getConferenceToken,
);
