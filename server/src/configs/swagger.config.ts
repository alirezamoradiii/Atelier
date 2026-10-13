import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default class SwaggerConfig {
  static setup(app: INestApplication): void {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const port = process.env.PORT ?? 3000;

    const config = new DocumentBuilder()
      .setTitle('Atelier API')
      .addServer(`http://localhost:${port}`)
      .setVersion('1.0.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('/api/docs', app, document);
  }
}
