import Joi from 'joi';

export type CreateDiscussionBody = {
  title: string;
  description: string;
  tags: [string];
  startTime: Date;
  durationInMinutes: number;
};

export const createDiscussionSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().default(''),
  tags: Joi.array().items(Joi.string()).default([]),
  startTime: Joi.date().min('now').required(),
  durationInMinutes: Joi.number().min(1).required(),
}).required();
