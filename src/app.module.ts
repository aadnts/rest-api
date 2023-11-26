//[1] Main module of the application that will import other modules
//What is a module? A module is a class annotated with a @Module() decorator.
//The @Module() decorator provides metadata that Nest makes use of to organize the application structure.
//Modules are used to organize the codebase into discrete units of functionality --> we create a module for each feature or microservice.
//Modules allow us to break our app down into smaller components that we can easily manage and extend.
import { Module } from '@nestjs/common';
//[12] So far, we only saw custom made mode modules made by ourselves but nestJS also provides built-in modules
//The first module that we're going to implement is the config module
//For now we have used hard-coded environment variables, but we can use the config module to manage our environment variables
//To install the config module : npm install --save @nestjs/config or yarn add @nestjs/config
//The config module is usually implemented in the root module of the application, so in our case the app.module.ts, or you can create a separate module for it
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), //[12]that's all we need to load the .env file into our application, under the hood it uses the dotenv library
    //like any module, the configModule also has a service that also uses dependency injection, so we can import that config service inside any modules
    //the isGlobal property acts as the @Global() decorator, so that we can use the config service in any module
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

//The COMMAND nest g module "name" will generate a module in the src folder
