import { IsArray, IsDateString, IsEnum, IsOptional, IsString, Matches } from "class-validator";

enum Gender {
  MALE = "male",
  FEMALE = "female"
} 

export class ProfileDto {
  @IsOptional()
  @IsString({message: "Please enter valid name"})
  name: string;

  @IsOptional()
  @Matches(`^${Object.values(Gender).filter(v => typeof v !== "number").join('|')}$`, 'i')
  @IsEnum(Gender, {message: `Please enter valid gender with "male" or "female"`})
  gender: Gender;

  @IsOptional()
  @IsDateString({}, {message: "Please enter valid date of birth"})
  dob: string;

  @IsOptional()
  @IsArray({message: "Please enter enter interest"})
  interest: string[];
}