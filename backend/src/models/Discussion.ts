import {
  DocumentType,
  Ref,
  getModelForClass,
  mongoose,
  prop,
} from '@typegoose/typegoose';
import { User } from './User';

export class Discussion {
  @prop({
    required: true,
    // ref: () => User,
    ref: 'User',
  })
  public organizer!: Ref<User>;

  @prop({
    required: true,
  })
  public title!: string;

  @prop({
    required: true,
  })
  public description!: string;

  @prop({
    type: [String],
    required: true,
    default: [],
  })
  public tags!: mongoose.Types.Array<string>;

  @prop({
    required: true,
  })
  public startTime!: Date;

  @prop({
    required: true,
  })
  public durationInMinutes!: number;
}

export type DiscussionDocument = DocumentType<Discussion>;
export const DiscussionModel = getModelForClass(Discussion, {
  schemaOptions: { autoCreate: true, timestamps: true },
});
