import { AuthenticatedCommand } from '../../../shared/commands/authenticated.command';
import { CommandHelper } from '../../../shared/commands/command.helper';

export class GetMyProfileCommand extends AuthenticatedCommand {
  static create(data: Record<string, unknown>): GetMyProfileCommand {
    return CommandHelper.create(GetMyProfileCommand, data);
  }
}
