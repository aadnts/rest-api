import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  //Instantiate Nest application
  const app = await NestFactory.create(AppModule);
  //[9] This will allow us to use the validation pipe in all our controllers, basically add the validation logic to all our DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      //the pipe validator can also strip out elements that are not defined in the DTO, so that there's no extra data in the request (avoid vulnerabilities)
      whitelist: true,
    }),
  );
  //Launching a server on port 3333
  await app.listen(3333);
}
bootstrap();

//To start the server: npm run start:dev or yarn start:dev
//All those scripts are defined in package.json
//Start:dev will run the Nest CLI in watch mode, recompiling the app whenever it detects a file change.
//Dist file is created when you start the server, it is the output of the compilation process
