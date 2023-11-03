import { Controller, 
  Get, Post, Req, Res, Body, 
  HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Request as ExpressRequest } from 'express';
import { MailService } from 'src/mail/mail.service';
import { UserEntity } from './entities/user.entity';

@Controller('auth')
export class AuthController 
{
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    ) {}

  @Post('basicUserSignUp')
  async BasicUserSubscription(@Body() userInput: { 
  username: string, 
  password: string,
  email: string
  })
  {
    try {
      
      return await this.authService.BasicUserSignIn(userInput);
    }
    catch (error)
    {
      console.log("ERREUR :", userInput);

      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error in creation of classic user.',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }

  }

  @Get("User42SignUp")
  async User42SignUp(@Res({ passthrough: true }) res: Response)
  {
    try 
    {
      const redirectionURL = this.authService.redirectTo42SignIn(res);
      return res.redirect(redirectionURL);
    }
    catch (error)
    {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error in redirecting toward the 42 API.',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }

  @Get("User42CallBack")
  async User42CallBack(@Req() req: ExpressRequest) 
  {
    try 
    {
      const code = this.authService.getCodeFromURL(req.url);
      const token = Math.floor(1000 + Math.random() * 9000).toString();
      const user = await this.authService.User42SignIn(code);
      if (user instanceof UserEntity)
        await this.mailService.sendUserConfirmation(user, token);
      else
        console.log("Je n'ai pas réussi à récupérer l'user, je suis NULL dans User42CallBack");
    }
    catch (error)
    {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error in creating an user with the 42 API.',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
	}

  @Get("Logout")
  async UserLogout()
  {
    
  }
}
