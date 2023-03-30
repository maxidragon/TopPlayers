import { Module } from '@nestjs/common';
import { CompetitionsModule } from '../competitions/competitions.module';
import { CompetitorsController } from './competitors.controller';
import { CompetitorsService } from './competitors.service';

@Module({
  imports: [CompetitionsModule],
  controllers: [CompetitorsController],
  providers: [CompetitorsService],
})
export class CompetitorsModule {}
