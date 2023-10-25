import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth42Guard } from './guards/42.guard';
import { IntraStrategy } from './strategies/42.strategy';

@Controller('auth')
export class AuthController 
{
  constructor(private readonly appService: AuthService) {}

  @Post('basicUserSignUp')
  async BasicUserSubscription()
  {

  }

  @UseGuards(Auth42Guard)
  @Post("User42SignUp")
  async User42SignUp()
  {
	console.log("JE SUIS ICI !!!!");
  }

  @Get("User42CallBack")
  async User42CallBack()
  {

  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
