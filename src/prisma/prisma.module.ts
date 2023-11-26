import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

//[6] as defined in the comments under [5], if there's a module, such as the database module, that we want to use in almost all other modules
//It can be a bit tedious to import it everywhere, therefore we can create a global module that be used everywhere by using the @Global() decorator
//Just make sure that your global module is also imported in the application module (root module)
@Global()
@Module({
  providers: [PrismaService],
  //[5] To be able to use the providers/services of a module in another module, you need not only to import the module in the other module
  //But you also need to export the services, so that the other module can access the providers/services of this module
  exports: [PrismaService],
})
export class PrismaModule {}
