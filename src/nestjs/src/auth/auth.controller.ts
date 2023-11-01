import { Controller, Get, Post, Req, Res, Delete, Body } from '@nestjs/common';
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
    return await this.authService.BasicUserSignIn(userInput);
  }

  @Get("User42SignUp")
  async User42SignUp(@Res({ passthrough: true }) res: Response)
  {
	  const redirectionURL = this.authService.redirectTo42SignIn(res);
	  return res.redirect(redirectionURL);
  }

  @Get("User42CallBack")
  async User42CallBack(@Req() req: ExpressRequest) 
  {
	  const code = this.authService.getCodeFromURL(req.url);
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    const user = await this.authService.User42SignIn(code);
    if (user instanceof UserEntity)
      await this.mailService.sendUserConfirmation(user, token);
    else
      console.log("Je n'ai pasréussi à récupérer l'user, je suis NULL dans User42CallBack");
  }

  @Get("Logout")
  async UserLogout()
  {
    
  }
}
