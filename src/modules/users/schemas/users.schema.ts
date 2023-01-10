import { Prop, raw, Schema } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop(
    raw({
      id: { type: String, required: true },
      email: { type: String, required: true },
      login: { type: String, required: true },
      createdAt: { type: String, required: true },
      passHash: { type: String, required: true },
      passSalt: { type: String, required: true },
    }),
  )
  accountData: Record<string, string>;

  @Prop(
    raw({
      confirmationCode: String,
      expirationDate: Date,
      isConfirmed: { type: Boolean, required: true },
    }),
  )
  emailConfirmation: Record<string, any>;

  @Prop(raw({ recoveryCode: String, expirationDate: Date }))
  passwordRecovery?: Record<string, any>;
}
