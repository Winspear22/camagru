import { Injectable, Res, Req, Inject } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import axios from 'axios';
import { Response } from 'express';
import { Request as ExpressRequest } from 'express';



@Injectable()
export class AuthService 
{
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<UserEntity>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  redirectTo42SignIn(@Res({ passthrough: true }) res: Response)
  {
    const queryParams = new URLSearchParams({
      client_id: 'u-s4t2ud-c48b94c3db2dc0796bd44029a543a951460881fabe7215fdac1da2a0cd5fe33c',
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
    const personnal42Token = await this.getUserToken(code);
    if (personnal42Token.success === false)
        return { success: false, error: "getUserToken failure" };
    try 
    {
      const request = await axios.get("https://api.intra.42.fr/v2/me", { headers: { Authorization: `Bearer ${personnal42Token.access_token}` } });
      console.log(request.data.login);
      console.log(request.data.id);
      const user = await this.usersRepository.findOneBy({ username: request.data.login });
      if (user)
      {
        console.log("user already exists");
        return user;
      }
      const newUser = this.usersRepository.create({
        username: request.data.login,
        generatedId: request.data.id,
        email: request.data.email
      });

      await this.usersRepository.save(newUser);
      console.log(newUser);
      return (newUser);

  
      /* const request = await axios.get("https://api.intra.42.fr/v2/me", { headers: { Authorization: `Bearer ${personnal42Token.access_token}` } });
        let user = await this.prismaService.user.findUnique({ where: { login: request.data.login } });
        if (!user) {
            let username = request.data.login;
            if (await this.prismaService.user.findUnique({ where: { username: username } })) {
                let i = 1;
                while (await this.prismaService.user.findUnique({ where: { username: username + String(i) } }))
                    i++;
                username = username + String(i);
            }
            let user = await this.prismaService.createUser({ username: username, login: request.data.login, avatar: request.data.image.versions.small, personnal42Token: personnal42Token.access_token });
            const payload = { id: user.id };
            const accessToken: string = await this.jwtService.sign(payload, { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '45m' });
            const refreshToken: string = await this.jwtService.sign(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '10d' });
            user = await this.prismaService.user.update({ where: { username: username }, data: { accessToken: accessToken, refreshToken: refreshToken } });
            return {
                success: true,
                refreshToken: user.refreshToken,
                accessToken: user.accessToken,
                username: user.username,
                twoFa: user.enabled2FA,
            };
        }
        user = await this.prismaService.user.update({ where: { login: request.data.login }, data: { personnal42Token: personnal42Token.access_token } });
        if (user.status != "offline")
            return { success: false, error: "user already connected" };
        return {
            success: true,
            refreshToken: user.refreshToken,
            accessToken: user.accessToken,
            username: user.username,
            twoFa: user.enabled2FA,
        };*/
        console.log("SUCCESS !!!", personnal42Token);
    }
    catch (err) 
    {
        console.log(err);
    }
  }

  async getUserToken(userCode: string): Promise<{ success: boolean, access_token?: string, expires_in?: string }> {
    const requestBody = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: 'u-s4t2ud-c48b94c3db2dc0796bd44029a543a951460881fabe7215fdac1da2a0cd5fe33c',
        client_secret: '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',
        code: userCode,
        redirect_uri: "http://" + "localhost" + ":3000/auth/User42CallBack"
    });
    try 
    {
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

}
