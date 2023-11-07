import { Controller, 
  Get, Post, Req, Res, Body, 
  HttpException, HttpStatus, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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
  }, @Res({ passthrough: true}) res: Response)
  {
    try 
    { 
      await this.authService.BasicUserSignIn(userInput);
      return res.redirect(process.env.IP_FRONTEND);
    }
    catch (error)
    {
      console.log("ERREUR :", userInput);
      return error;
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
      return error;
    }
  }

  @Get("User42CallBack")
  async User42CallBack(@Req() req: ExpressRequest, 
  @Res({ passthrough: true }) res: Response) 
  {
    try 
    {
      const code = this.authService.getCodeFromURL(req.url);
      const token = Math.floor(1000 + Math.random() * 9000).toString();
      const user = await this.authService.User42SignIn(code);
      if (user instanceof UserEntity)
      {

        await this.mailService.sendUserConfirmation(user, token);
        return res.redirect(process.env.IP_FRONTEND);
      }
      else
        throw new NotFoundException("L\'utilisateur demandé n\'a pas été trouvé.");
    }
    catch (error)
    {
      return error;
    }
  }

  @Get("Logout")
  async UserLogout()
  {
    
  }
}
