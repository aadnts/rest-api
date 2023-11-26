//[1] When building applications with NestJS we usally separate the logic into controllers and services.
//Controllers handle incoming requests and return responses to the client.
//Services also known as Providers, are responsible for the business logic and are used by controllers.
//So we separate our logic into controllers and services, to be able to simplify what we do in each part of the application.

//import { Request } from 'express';
import {
  Body,
  Controller,
  //ParseIntPipe,
  Post,
} from '@nestjs/common'; //import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto'; //this imports all the DTOs from the dto folder, other DTOs will only be added next to the AuthDto

//[2] So we now have an auth service and an auth controller class
//The controller is going to be responsible for handling the incoming requests and returning the responses to the client, it will handle the requests
//Normally the controller will need to call the server, because it will receive requests from the client
//Once it got that request, the controller is going to call a function from the AuthService classs and return the result back to the client
//To do so, the controller will have to instantiate the AuthService class because in the end we are using javascript
//So to avoid doing that manually e.g. (const = service = new AuthService()) having to manage where it is created and who manages it all, we use dependency injection
//That means that instead of our controller to actually have to declare it (contructor(){const service = new AuthService()})

//[3] It is good to put a global prefix to our routes, so that we can easily identify them : POST auth/signup
@Controller('auth')
//We need to export the class so that it can be imported in other modules, especially in our application module
export class AuthController {
  //We're gonna ask NestJS to give us an instance of that class and I don't care how to instantiate it :
  //The private notation replaces the need to declare the variable and assign it to the constructor :
  //authService: AuthService
  // constructor(){this.authService = new AuthService()}
  constructor(private authService: AuthService) {}
  //[3] As our authentification module will manage 2 functionalities, login and sign-up we will need to create 2 endpoints here
  //The post decorator is used to create a post endpoint, the first argument is the path/route of the endpoint

  //[6] You can use exprex to handle requests, by using the @Req() decorator
  //But this method is not very clean, everytime we need to get a request and we don't have any information about what is inside the body
  //@Post('signup')
  //signup(@Req() req: Request) {
  //  console.log(req.body);
  //  return this.authService.signup();
  //}

  //[7] That's why NestJs uses DTOs (Data Transfer Objects), which are objects that you push your data into to handle requests
  //You can create validation onto those DTOs, so that you can validate the data that is coming in
  //You can even define the shape of these DTOs, so that you can define what data is coming in "the body should have an email, etc."
  //To do so, we'll use another decorater called Body, which will allow us to get the body of the request

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    //[8] Now to verify if the data provided in the request is correct, we would need to check if(!dto.email) but this is too verbose
    //That's why we will use simplify this by using the class-validator and class-transformer libraries, which will allow us to add validation to our DTOs
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}

//[8] What are pipes in nestjs? They are functions that transform the data before it reaches the controller
//We can create our own custom pipes or use built-in pipes : we can isolate the fields directly from the body
//@Post('signup')
//signup(
//  @Body('email') email: string,
//Here ParseIntPipe is a built-in pipe that will check if the data is an integer, it'll stop the execution of our code before we reach the business logic
//  @Body('password', ParseIntPipe) password: string,
//) {
//  console.log({
//    email,
//    typeOfEmail: typeof email,
//    password,
//    typeOfPassword: typeof password,
//  });

//With the DTO can apply this validation and transformation directly on the DTO
