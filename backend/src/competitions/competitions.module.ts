import { Global, Module } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CompetitionsController } from './competitions.controller';

@Global()
@Module({
  providers: [CompetitionsService],
  exports: [CompetitionsService],
  controllers: [CompetitionsController],
})
export class CompetitionsModule {}
