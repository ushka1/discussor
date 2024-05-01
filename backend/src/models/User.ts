import { DocumentType, getModelForClass, prop } from '@typegoose/typegoose';

class User {
  // Data

  @prop({
    required: true,
    minlength: 3,
    maxlength: 30,
  })
  public username!: string;

  @prop({
    required: true,
  })
  public email!: string;

  @prop({
    required: true,
  })
  public password!: string;

  // Sockets

  @prop()
  public socketId?: string;

  @prop()
  public discussionId?: string;

  public get isOnline() {
    return !!this.socketId;
  }

  public get inDiscussion() {
    return !!this.discussionId;
  }
}

export type UserDocument = DocumentType<User>;
export const UserModel = getModelForClass(User, {
  schemaOptions: { autoCreate: true, timestamps: true },
});
