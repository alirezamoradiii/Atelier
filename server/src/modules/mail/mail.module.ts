import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { MailService } from './mail.service.js';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('appConfig.mailHost'),
          port: config.get<number>('appConfig.mailPort'),
          secure: false,
        },
        defaults: {
          from: `Atelier Support <no-reply@Atelier.com>`
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter({
            inlineCssEnabled: true
          })
        }
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MialModule {}
