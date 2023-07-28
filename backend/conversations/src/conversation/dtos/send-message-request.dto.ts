import { IsNotEmpty, IsString } from "class-validator";

export class SendMesssageRequestDTO {
  // Added diagramID here because we moved it to the request body.
  @IsString()
  @IsNotEmpty()
  diagramID!: string;

  @IsString()
  @IsNotEmpty()
  userID!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;
}
