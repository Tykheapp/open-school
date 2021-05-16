import { UserEntity } from '@tykeapp/core';

export class SeedDataBodyDto {}

export interface ISeedDataResponseDto {
  token: string;
  user: UserEntity;
}
