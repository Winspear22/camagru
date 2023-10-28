import { Controller, Get, Post, Req, Res, Delete, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController 
{
  constructor(private readonly authService: AuthService) {}

  @Post('basicUserSignUp')
  async BasicUserSubscription()
  {

  }

  @Get("User42SignUp")
  async User42SignUp(@Res({ passthrough: true }) res: Response)
  {
	  const redirectionURL = this.authService.redirectTo42SignIn(res);
	  return res.redirect(redirectionURL);
  }

  @Get("User42CallBack")
  async User42CallBack(
  @Res({ passthrough: true }) res: Response,
  @Req() req: ExpressRequest) 
  {
	  const code = this.authService.getCodeFromURL(req.url);
    return await this.authService.User42SignIn(code);
  }

  @Delete('deleteAllData')
  async deleteAllData(@Body() username: string) {
    return this.authService.deleteUser(username);
  }
}
