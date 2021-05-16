import { CommandHelper } from '../../../shared/commands/command.helper';

export class SeedDataCommand {
  static create(data: Record<string, unknown>): SeedDataCommand {
    return CommandHelper.create(SeedDataCommand, data);
  }
}
