//nest g service prisma --no-spec creates a service in the src folder without creating a spec file
//We creating this service because we still need a way for our code to connect to the database
//To do that easily we are creating a database module
//And we're going to encapsulate all the logic to connect to the database inside that module
//We will only export from the module, what we needs to be accessed by the application
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

//This is the service that we will inject in our modules to connect to the database
//This service extends the PrismaClient, which is a class that allows to connect to a database
@Injectable()
export class PrismaService extends PrismaClient {
  //So what I want to do is to configure and instantiate the Prisma Client class with the right configuration
  //So I'm going to create a constructor and call the super method, which itself call the constructor of the class I'm extending
  //And the constructor of the PrismaClient class takes an object as an argument

  //[12] The configService is a service that is provided by the config module
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get<string>('DATABASE_URL'),
          //this enables us to go get the database connection string from the .env file
        },
      },
    });
  }
}
