import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { Match } from "src/common/decorator/match.decorator";

export class RegisterDto {
  @IsNotEmpty({message: "Please enter username"})
  @IsString({message: "Please enter valid username"})
  username: string;

  @IsEmail({}, {message: "Please enter valid email"})
  email: string;

  @IsNotEmpty({message: "Please enter password"})
  @IsString({message: "Please enter valid password"})
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  }, 
  {message: "Password too weak"})
  password: string;

  @IsNotEmpty({message: "Please enter confirm password"})
  @IsString({message: "Please enter valid password"})
  @Match("password", {message: "Confirmation password not match"})
  confirm_password: string;
}