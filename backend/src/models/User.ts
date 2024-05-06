import {
  DocumentType,
  Ref,
  getModelForClass,
  prop,
} from '@typegoose/typegoose';
import { Discussion } from './Discussion';

export class User {
  // Data

  @prop({
    required: true,
    minlength: 3,
    maxlength: 30,
  })
  public username!: string;

  @prop({
    required: true,
    unique: true,
    lowercase: true,
  })
  public email!: string;

  @prop({
    required: true,
  })
  public password!: string;

  // Sockets

  @prop()
  public socketId?: string;

  @prop({
    // ref: () => Discussion,
    ref: 'Discussion',
  })
  public discussion?: Ref<Discussion>;

  public get isOnline() {
    return !!this.socketId;
  }

  public get inDiscussion() {
    return !!this.discussion;
  }
}

export type UserDocument = DocumentType<User>;
export const UserModel = getModelForClass(User, {
  schemaOptions: {
    autoCreate: true,
    timestamps: true,
  },
});
