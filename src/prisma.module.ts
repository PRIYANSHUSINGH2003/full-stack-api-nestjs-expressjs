import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() 
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Important: Export PrismaService so other modules can use it
})
export class PrismaModule {}
