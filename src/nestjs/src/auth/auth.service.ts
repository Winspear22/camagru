import { Injectable, Res, Req, Inject, NotFoundException, Body, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { Response } from 'express';
import { Request as ExpressRequest } from 'express';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService 
{
  constructor(
    private usersService: UserService,
  ) {}

  redirectTo42SignIn(@Res({ passthrough: true }) res: Response)
  {
    const queryParams = new URLSearchParams({
      client_id: process.env.FORTYTWO_CLIENT_ID,//'u-s4t2ud-c48b94c3db2dc0796bd44029a543a951460881fabe7215fdac1da2a0cd5fe33c',
      redirect_uri: 'http://localhost:3000/auth/User42CallBack'
    });
    const redirectUrl = `https://api.intra.42.fr/oauth/authorize?response_type=code&${queryParams.toString()}`;
    return redirectUrl;
  }

  getCodeFromURL(string: string)
  {
    const url = string;
	  const regex = /code=([^&]*)/;
	  const match = url.match(regex);
	  if (match && match.length > 1) {
    		const code = match[1]; // code contiendra "0642e4d7856d9ff4e5615bdf3708b888a0499c675d5dd0bec214ee43aa1ce1c4"
    		return (code);
    }
    return (undefined);
  }

  async User42SignIn(code: string) {
    try 
    {
      const personnal42Token = await this.getUserToken(code);
      if (!personnal42Token || personnal42Token.success === false)
        throw new UnauthorizedException("Token d\'accès 42 invalide ou manquant.");
      const request = await axios.get("https://api.intra.42.fr/v2/me", { headers: { Authorization: `Bearer ${personnal42Token.access_token}` } });
      console.log(request.data.login);
      console.log(request.data.id);
      const user = await this.usersService.createUser42(request);
      console.log("SUCCESS !!!", personnal42Token);
      return user;
    }
    catch (err) 
    {
      throw err;
    }
  }

  async getUserToken(userCode: string): Promise<{ success: boolean, access_token?: string, expires_in?: string }> 
  {
    try 
    {
      const requestBody = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.FORTYTWO_CLIENT_ID,
        client_secret: process.env.FORTYTWO_CLIENT_SECRET,
        code: userCode,
        redirect_uri: "http://" + "localhost" + ":3000/auth/User42CallBack"
      });
      const request = await axios.post("https://api.intra.42.fr/oauth/token", requestBody.toString(), {
          headers: {
              "Content-Type": "application/x-www-form-urlencoded",
          },
      })
      if (!request || !request.data || !request.data.access_token || !request.data.expires_in) {
        throw new Error("Failed to get the access token from 42 API.");
      }
      const data: any = request.data;
      const token = data.access_token;
      const tokenExpires = data.expires_in;
      // Create the user in the database
      return { success: true, access_token: token, expires_in: tokenExpires };
    }
    catch (error) 
    {
      console.error("Error in getUserToken:", error.message);
      return { success: false };
    }
  }

  async BasicUserSignIn(@Body() userInput: {
    username: string,
    password: string,
    email: string
  })
  {
    try
    {
      console.log("JE SUIS ICIIIIIIII 2");

      const user = await this.usersService.createBasicUser(userInput);
      console.log("JE SUIS ICIIIIIIII 3");
      return user;

    }
    catch (error)
    {
      console.log("JE SUIS ICIIIIIIII 4");
      console.log(error);
      throw error;
    }
  }

  async CreateAndSignTokens(res: Response, generatedId: number)
  {
    
  }

  async CreateAccessCookie()
  {

  }

}
