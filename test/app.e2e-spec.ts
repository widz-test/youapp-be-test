import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ConfigService } from "@nestjs/config";

describe('AppController (e2e)', () => {
  let app: INestApplication;
  
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    const configService = app.get(ConfigService);
    const host = configService.get<string>('host');
    return request(host)
      .get('/')
      .expect(200);
  });
});
