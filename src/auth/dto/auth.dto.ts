//[9]to be able to use validation in our DTOs, we need to add the class-validator and class-transformer libraries
//to install, simply run the command : npm i --save class-validator class-transformer or yarn add class-validator class-transformer
//to apply the transformation and the validation, we need to use a class instead of : export interface AuthDto {}
//Now we still need to tell nestJs to use the pipe logic/validation pipe globally, so we need to go into main.ts
//and just before the app.listen, we need to add the following line : app.useGlobalPipes(new ValidationPipe());

import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
