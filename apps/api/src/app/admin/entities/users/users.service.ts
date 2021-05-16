import { Injectable } from '@nestjs/common';
import { UserEntity, UserRepository } from '@tykeapp/core';
import { MongooseCrudService } from '../../../shared/crud/mongoose-crud.service';

@Injectable()
export class UsersService extends MongooseCrudService<UserEntity> {
  constructor(private usersRepository: UserRepository) {
    super(usersRepository._model);
  }
}
