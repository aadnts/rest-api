//[1] When building applications with NestJS we usally separate the logic into controllers and services.
//Controllers handle incoming requests and return responses to the client.
//Services also known as Providers, are responsible for the business logic and are used by controllers.
//So we separate our logic into controllers and services, to be able to simplify what we do in each part of the application.

import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

//The injectable decorator marks a class as a provider, which is a class that can be injected using dependency injection.
@Injectable()
//We need to export the class so that it can be imported in other modules, especially in our application module
export class AuthService {
  //As our Auth Module will manage 2 functionalitites, login and sign-up we will need 2 functions here
  //[4] Now through dependency injection, we can inject the PrismaService into our AuthService
  //To call the PrismaService or any other service coming form another module (so dependency injection), we need to create a constructor
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService, //[13]
  ) {}
  //async keyword means that we can call prisma (access the db) asynchronously
  async signup(dto: AuthDto) {
    //[10]Now that we can be sure that the data received from the request is valid, we can use it to create a user in the database
    //The first thing that we're going to do, is that we need to generate a hash of the password, so that we can store it in the database
    //For that we're going to use the argon2 library, which is a library that will allow us to hash the password
    //to add the library: npm install argon2 or yarn add argon2

    //generate the password hash
    //since argon.hash is an async function, we need to use the await keyword
    const hash = await argon.hash(dto.password);
    //save the new user in the db
    try {
      const user =
        await this.prismaService.user.create({
          data: {
            email: dto.email,
            hash,
          },
          //We don't want to return the Hash to the client, so we can use the select property to select only the fields that we want to return
          //select: {
          //  id: true,
          //  email: true,
          //  createdAt: true,
          //},
          //But this is not very practitcal, so we can use transformations to transform the data before returning it
        });
      //This will strip out the hash from the user object
      delete user.hash;
      //return the saved user
      return user;
    } catch (error) {
      //we can isolate whether or not the error comes from prisma
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Email already exists',
          );
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    //find the user by email
    //findUnique is a function that will allow us to find a user by a unique field (either id or field with unique constraint)
    const user =
      await this.prismaService.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    //if user does not exist throw exception
    //to handle that use case, we're going to create a guard condition
    if (!user) {
      throw new ForbiddenException(
        'Invalid credentials',
      );
    }

    //compare password with the functions provided by argon2
    //argon2.verify is an async function, so we need to use the await keyword
    //the first argument is the hash that we want to compare, the second argument is the password that we want to compare
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    //if password incorrect throw exception
    //Again we put a guard condition
    if (!pwMatches) {
      throw new ForbiddenException(
        'Invalid credentials',
      );
    }
    //send back the user without the hash field on the user object
    delete user.hash;
    return user;
  }
}

