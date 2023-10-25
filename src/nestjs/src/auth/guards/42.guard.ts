import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class Auth42Guard extends AuthGuard('42') 
{
	async canActivate(context: ExecutionContext) 
	{
    	const activate = (await super.canActivate(context)) as boolean;
    	context.switchToHttp().getRequest();
		
		console.log('La requete de 42 OAuthguard', context);
		return activate;
  }
}