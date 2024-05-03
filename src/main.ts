import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { DisplayableException } from "./exception/displayable.exception";
import { SwaggerModule } from '@nestjs/swagger';
import { join } from "path";
import { readFile } from "fs/promises";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const host = configService.get<string>('host');
  // Class-validator
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
  // Interceptor
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // Api prefix
  app.setGlobalPrefix('api');
  // Api docs
  const document = JSON.parse(
    (await readFile(join(process.cwd(), './docs/swagger-spec.json'))).toString('utf-8')
  )
  app.enableCors({origin: host});
  SwaggerModule.setup('', app, document);
  // Listen
  await app.listen(port);
  console.log(`~ Application is running on: ${await app.getUrl()}`);
}
bootstrap();
