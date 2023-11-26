import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

//[13] To allow the server to track the user and to know who the user is there are 2 techniques :
//You can either use sessions or you can use JWT (JSON Web Token)
//This whole process is called authentication and authorisation
//So the user provides his credentials, we authentify the user, and then we give something to the user, so we can authorise the user for subsequent requests
//The server will create a JWT token and sends it to the browser, the browser will store it in the local storage and send it back to the server for each request
//Based on the JWT sent by the client, the server will say whether or not the user is authorised to access the resource
//The difference with sessions is that they are passed automatically by the browser with each request
//We'll install passport to handle the authentification and authorisation process : npm install --save @nestjs/passport passport passport-local or yarn add @nestjs/passport passport passport-local
//We dont need passport local which is used to handle local authentication : yarn add @nestjs/passport passport
//passport is the library and @nestjs/passport is the nestjs implementation of passport (module)
//We'll also intall the JWT library for nestJs and the passport library for jwt : npm install --save @nestjs/jwt passport-jwt or yarn add @nestjs/jwt passport-jwt
//And we also need to install the types for passport-jwt : npm install --save-dev @types/passport-jwt or yarn add -D @types/passport-jwt (-D for dev dependencies which are displayed in the package.json file)

//[13] @nestJs/jwt is used to sign and verify JWT tokens (using JWT library - nestJs modularization of the JWT library)
//This we're going to use in our auth service
//@nestjs/passport is used to integrate passport with nestJs (it's also a module)
//While this we're going to put it in another folder called strategy

@Module({
  //If you want the auth module to have access to the prisma module (and thus to the db), you need to import it
  //Normally, by importing the PrismaModule you would have access to the providers/services of the PrismaModule, meaning the Prismaservice
  imports: [
    JwtModule.register({ //Since JwtModule is a nestJs module, it also has a service, thus we need to import it again with dependency injection
      //Used to sign and decode the JWT tokens
      //there are several ways to register, you can also provide an expiration date
      //So we're just going to declare it empty here and customize it further in the auth service
    }),
  ],
  //Since we have created a controller and a service, we need to add it to the module
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
