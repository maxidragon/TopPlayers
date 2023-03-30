import { Module } from '@nestjs/common';
import { CompetitionsModule } from './competitions/competitions.module';
import { CompetitorsModule } from './competitors/competitors.module';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [CompetitionsModule, CompetitorsModule, PlayersModule],
})
export class AppModule {}
