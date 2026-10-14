import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  apiVersion: process.env.API_VERSION,
  mailHost: process.env.MAIL_HOST ?? '127.0.0.1',
  mailPort: parseInt(process.env.MAIL_PORT ?? '1025', 10),
}));
