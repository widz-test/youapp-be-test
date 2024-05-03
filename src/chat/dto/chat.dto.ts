import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ChatDto {
  @IsNotEmpty({message: "Please select sender"})
  @IsString({message: "Invalid sender"})
  user_id: string;

  @IsOptional()
  @IsString({message: "Please enter valid message"})
  message: string;
}