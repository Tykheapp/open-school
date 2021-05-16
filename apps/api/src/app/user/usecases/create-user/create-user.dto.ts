import { AuthProviderEnum } from '@tykeapp/shared';
import { CommandHelper } from '../../../shared/commands/command.helper';

export class CreateUserCommand {
  static create(data: Record<string, unknown>) {
    return CommandHelper.create(CreateUserCommand, data);
  }

  email: string;

  firstName: string;

  lastName: string;

  picture?: string;

  auth: {
    profileId: string;
    provider: AuthProviderEnum;
    accessToken: string;
    refreshToken: string;
  };
}
