import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { RepositoryModule } from "src/entity/repository/repository.module";
import { AuthModule } from "./auth.module";
import { ConfigModule } from "src/common/config/config.module";
import { RegisterService } from "./register/register.service";
import { LoginService } from "./login/login.service";
import { LoginDto } from "./dto/login.dto";
import { CommonModule } from "src/common/common.module";
import { RegisterDto } from "./dto/register.dto";
import { User } from "src/entity/model/user.model";

describe('AuthService', () => {
  let service: AuthService;
  let user: User = new User();
  let user2: User = new User();
  let registerDto: RegisterDto = {
    username: `john_${Math.random() * 100}`,
    email: `john.${Math.random() * 100}@test.xxx`,
    password: "Pass@word1!",
    confirm_password: "Pass@word1!"
  };
  let registerDto2: RegisterDto = {
    username: `john_${Math.random() * 100}`,
    email: `john.${Math.random() * 100}@test.xxx`,
    password: "Pass@word2!",
    confirm_password: "Pass@word2!"
  };

  beforeAll(async() => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        RepositoryModule,
        ConfigModule,
        CommonModule,
      ],
      providers: [
        AuthService, 
        RegisterService,
        LoginService
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    user = await service.register(registerDto);
    user2 = await service.register(registerDto2);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('it should be user registered', async () => {
    expect(user.email).toEqual(registerDto.email);
    expect(user.username).toEqual(registerDto.username);
    expect(user2.email).toEqual(registerDto2.email);
    expect(user2.username).toEqual(registerDto2.username);
  });

  it('it should be user logged in by username', async () => {
    const loginDto: LoginDto = {
      username: registerDto.username,
      password: registerDto.password
    };
    const data = await service.login(loginDto);
    expect(data).toHaveProperty('token');
    expect(data.token).not.toBeNull();
  });

  it('it should be user logged in by email', async () => {
    const loginDto: LoginDto = {
      username: registerDto2.email,
      password: registerDto2.password
    };
    const data = await service.login(loginDto);
    expect(data).toHaveProperty('token');
    expect(data.token).not.toBeNull();
  });
});
