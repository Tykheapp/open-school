import { MemberRoleEnum } from '@tykeapp/shared';
import { OrganizationCommand } from 'apps/api/src/app/shared/commands/organization.command';
import { ArrayNotEmpty } from 'class-validator';
import { CommandHelper } from '../../../../shared/commands/command.helper';

export class AddMemberCommand extends OrganizationCommand {
  static create(data: AddMemberCommand) {
    return CommandHelper.create(AddMemberCommand, data);
  }

  @ArrayNotEmpty()
  public readonly roles: MemberRoleEnum[];
}
