import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class IntraAuthGuard extends AuthGuard('42') {}

@Injectable()
export class Auth42Guard extends AuthGuard('42') 
{
	async canActivate(context: ExecutionContext) 
	{
		console.log("Je suis avant activate");
    	//const activate = (await super.canActivate(context)) as boolean;
		//console.log(activate);
		console.log("Je suis après activate");

    	context.switchToHttp().getRequest();
		console.log("Je suis après switch activate");
		console.log('La requete de 42 OAuthguard', context);
		return true;
  }
}