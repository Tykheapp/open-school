import { Query, Resolver } from '@nestjs/graphql';
import { IJwtPayload } from '@tykeapp/shared';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from '@tykheapp/core/dist';
import { User } from './user.graph';
import { GqlAuthGuard } from '../auth/framework/gql-auth.guard';
import { GetMyProfileUsecase } from './usecases/get-my-profile/get-my-profile.usecase';
import { GetMyProfileCommand } from './usecases/get-my-profile/get-my-profile.dto';
import { UserSession } from '../shared/framework/user.decorator';

@Resolver((of) => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private getMyProfileUsecase: GetMyProfileUsecase) {}

  @Query((returns) => User)
  async me(@UserSession() user: IJwtPayload): Promise<UserEntity> {
    const command = GetMyProfileCommand.create({
      userId: user._id,
    });

    return await this.getMyProfileUsecase.execute(command);
  }
}
