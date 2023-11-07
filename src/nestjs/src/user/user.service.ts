import { Body, Inject, Injectable, NotAcceptableException } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { UserEntity } from "src/auth/entities/user.entity";
import { Repository } from "typeorm";
import * as EmailValidator from 'email-validator';
import * as bcrypt from 'bcrypt'


// Ne pas oublier de remplacer tous les getUsername pardes getby id
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
    var user = await this.getUserByUsername(request.data.login);
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
    await this.usersRepository.update({ generatedId: user.generatedId }, {
      user_status: "Online"
    });
    user = await this.getUserByUsername(user.username);
    console.log("L'utilisateur existe déjà et son statut a été mis à jour : ", user);
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
    try
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
        {
          console.log("JE SUIS ICIIIIIIII 5");
          throw new NotAcceptableException("L'email que vous venez d'écrire n'est dans un format acceptatble !");
        }
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
        console.log("JE SUIS ICIIIIIIII 6");
        await this.usersRepository.save(newUser);
        return newUser;
      }
    }
    catch (error)
    {

    }
  }


}