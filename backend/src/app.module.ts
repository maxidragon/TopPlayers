import { Module } from '@nestjs/common';
import { CompetitionsModule } from './competitions/competitions.module';
import { CompetitorsModule } from './competitors/competitors.module';

@Module({
  imports: [CompetitionsModule, CompetitorsModule]
})
export class AppModule {}
