import { Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "src/auth/entities/user.entity";
import { Repository } from "typeorm";



@Injectable()
export class UserService 
{
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getUserByUsername(username: string)
  {
    return await this.usersRepository.findOneBy({ username });
  }
  
}