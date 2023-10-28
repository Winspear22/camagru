import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-42';
import { AuthService } from '../auth.service';

@Injectable()
export class IntraStrategy extends PassportStrategy(Strategy, '42') {
  constructor(
    private readonly auth: AuthService,
  ) {
    super({
      clientID: 'u-s4t2ud-c48b94c3db2dc0796bd44029a543a951460881fabe7215fdac1da2a0cd5fe33c',//process.env.FORTYTWO_CLIENT_ID,
      clientSecret: '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',//process.env.FORTYTWO_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/User42CallBack',
      passReqToCallBack: true,
      scopes: ['profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    cb: VerifyCallback,
  ): Promise<any> {
    console.log("Je suis ici !!!!!!!!!!!!!")
    const userDet = {
      provider: profile.provider,
      providerId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      picture: "1.png",
      login: profile._json.login,
    };
    console.log(userDet);
    console.log(accessToken);
    console.log(refreshToken);
    /*let user = await this.userService.findUserBy42Id(userDet.providerId);
    if (user) 
    {
      user = await this.userService.FindAndUpdateUser(user.username, { user_status: 'Online' });
      return cb(null, user);
    }
    const newUser = await this.userService.createUser(userDet);*/
    //return cb(null, user);
    return cb(null);
  }
}