import { Body, Inject, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { UserEntity } from "src/auth/entities/user.entity";
import { Repository } from "typeorm";
import * as EmailValidator from 'email-validator';
import * as bcrypt from 'bcrypt'

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

  async getUserByGeneratedId(generatedId: number)
  {
    return await this.usersRepository.findOneBy({generatedId});
  }

  async createUser42(request: AxiosResponse): Promise <UserEntity>
  {
    const user = await this.getUserByUsername(request.data.login);
    if (!user)
    {
      let newUsername = request.data.login;
      const doesUsernameAlreadyExist = await this.getUserByUsername(newUsername);
      if (doesUsernameAlreadyExist)
      {
        let i = 1;
        while (await this.getUserByUsername(newUsername))
          i++;
        newUsername = newUsername + String(i);
        console.log(newUsername);
      }
      const newUser = this.usersRepository.create({
        username: newUsername,
        generatedId: request.data.id,
        email: request.data.email,
        user_status: "Online"
      });
      await this.usersRepository.save(newUser);
      console.log("L'utilisateur n'existe pas et vient d'être créet", newUser);
      return newUser;
    }
    console.log("L'utilisateur existe déjà : ", user);
    return user;
  }

  async generateUniqueRandomId(): Promise<number> {
    let maxTries = 30; // Limitez le nombre de tentatives pour éviter une boucle infinie

    while (maxTries > 0) {
      maxTries--;
      const randomId = Math.floor(Math.random() * 100_000_000_000) + 1;
      const userWithSameId = await this.getUserByGeneratedId(randomId);
      if (!userWithSameId)
        return randomId; // Le numéro est unique
    }

    throw new Error('Impossible de générer un ID unique après 10 tentatives.');
  }

  async createBasicUser(@Body() userInput: {
    username: string,
    password: string,
    email: string
  })
  {
    const user = await this.getUserByUsername(userInput.username);
    if (!user)
    {
      let newUsername = userInput.username;
      const doesUsernameAlreadyExist = await this.getUserByUsername(newUsername);
      if (doesUsernameAlreadyExist)
      {
        let i = 1;
        while (await this.getUserByUsername(newUsername))
          i++;
        newUsername = newUsername + String(i);
        console.log(newUsername);
      }
      const emailValidated = EmailValidator.validate(userInput.email);
      if (emailValidated === false)
        return { success: false, user: undefined };
      const saltRounds = 12;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(userInput.password, salt);
      
      const newUser = this.usersRepository.create({
      username: newUsername,
      generatedId: await this.generateUniqueRandomId(),
      email: userInput.email,
      password: hashedPassword,
      user_status: "Online"
      });
      return newUser;
    }
  }


}