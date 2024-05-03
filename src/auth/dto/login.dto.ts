import { IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto {
  @IsNotEmpty({message: "Please enter username or email"})
  @IsString({message: "Please enter valid username"})
  username: string;

  @IsNotEmpty({message: "Please enter password"})
  @IsString({message: "Please enter valid password"})
  @Length(6, 50, {
    message: 'Password length must be between 6 and 50 charcters',
  })
  password: string;
}