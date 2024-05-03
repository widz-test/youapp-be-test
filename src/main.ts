import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { BadRequestException, ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { DisplayableException } from "./exception/displayable.exception";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new DisplayableException(result, "Request validation");
      },
      stopAtFirstError: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.setGlobalPrefix('api');
  await app.listen(port);
  console.log(`~ Application is running on: ${await app.getUrl()}`);
}
bootstrap();
