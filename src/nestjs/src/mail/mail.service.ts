import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from 'src/auth/entities/user.entity';

@Injectable()
export class MailService 
{
  constructor(
    private mailerService: MailerService
  ) 
  {}

  async sendUserConfirmation(user: UserEntity, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    const emailReel = process.env.EMAIL_SENDER;//'adrienaloui@hotmail.com';

    // Adresse e-mail personnalisée
    const emailPersonnalise = 'adaloui@camagru42.com';

    await this.mailerService.sendMail({
      to: user.email,
      from: `"${emailPersonnalise}" <${emailReel}>`,
      subject: 'Welcome to Camagru App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: user.username,
        url,
      },
    });
  }


}
