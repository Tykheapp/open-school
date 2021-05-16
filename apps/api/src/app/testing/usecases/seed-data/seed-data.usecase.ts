import { Injectable } from '@nestjs/common';
import { UserEntity, UserSession } from '@tykeapp/core';
import { SeedDataCommand } from './seed-data.command';

@Injectable()
export class SeedData {
  async execute(command: SeedDataCommand): Promise<{ token: string; user: UserEntity }> {
    const userSession = new UserSession();
    userSession.testServer = null;
    await userSession.initialize();

    return {
      token: userSession.token,
      user: userSession.user,
    };
  }
}
