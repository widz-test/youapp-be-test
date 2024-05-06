import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { ProfileService } from "./profile/profile.service";
import { RepositoryModule } from "src/entity/repository/repository.module";
import { CommonModule } from "src/common/common.module";
import { Gender, ProfileDto } from "./dto/profile.dto";
import { Profile } from "src/entity/model/profile.model";
import { User } from "src/entity/model/user.model";
import { UserRepository } from "src/entity/repository/user.repository";

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;
  let user: User;
  let profile: Profile;
  let profileDto: ProfileDto = {
    name: "John",
    dob: "1995-01-18",
    gender: Gender.MALE,
    interest: ["Game", "Sport"]
  }
  const horoscope = "Capricorn";
  const zodiac = "Goat";

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RepositoryModule,
        CommonModule
      ],
      providers: [
        UserService,
        ProfileService
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    user = await userRepository.findOne();
    profile = await service.createProfile(user, profileDto);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('it user create profile', async () => {
    expect(profile.name).toEqual(profileDto.name);
    expect(profile.dob).toEqual(profileDto.dob);
    expect(profile.gender).toEqual(profileDto.gender);
    expect(profile.horoscope).toEqual(horoscope);
    expect(profile.zodiac).toEqual(zodiac);
    expect(profile.interest.split(',')).toEqual(profileDto.interest);
  });

  it('it user get profile', async () => {
    profile = await service.getProfile(user);
    expect(profile.name).toEqual(profileDto.name);
    expect(profile.dob).toEqual(profileDto.dob);
    expect(profile.gender).toEqual(profileDto.gender);
    expect(profile.horoscope).toEqual(horoscope);
    expect(profile.zodiac).toEqual(zodiac);
    expect(profile.interest.split(',')).toEqual(profileDto.interest);
  });

  it('it user update profile', async () => {
    profileDto.name = 'Jonny';
    profile = await service.updateProfile(user, profileDto);
    expect(profile.name).toEqual(profileDto.name);
    expect(profile.dob).toEqual(profileDto.dob);
    expect(profile.gender).toEqual(profileDto.gender);
    expect(profile.horoscope).toEqual(horoscope);
    expect(profile.zodiac).toEqual(zodiac);
    expect(profile.interest.split(',')).toEqual(profileDto.interest);
  });
});
