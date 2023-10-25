import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService 
{
  getHello(): string {
    return 'Hello World!';
  }

  /*async createUser42(userDet: any): Promise<UserEntity> 
  {
    const newUser = this.usersRepository.create({
      username: userDet.login,
      email: userDet.email,
      profile_picture: userDet.picture,
      isTwoFactorAuthenticationEnabled: false,
      user_status: 'Online',
      id42: userDet.providerId,
      provider: userDet.provider,
      blockedIds: [],
      friends: [],
      friendRequests: []
    });
    await this.usersRepository.save(newUser);
    return newUser;
  }*/

}
