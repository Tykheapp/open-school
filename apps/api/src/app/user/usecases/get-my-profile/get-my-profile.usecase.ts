import { Injectable } from '@nestjs/common';
import { UserEntity, UserRepository } from '@tykeapp/core';
import { GetMyProfileCommand } from './get-my-profile.dto';

@Injectable()
export class GetMyProfileUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: GetMyProfileCommand): Promise<UserEntity | undefined> {
    return await this.userRepository.findById(command.userId);
  }
}
