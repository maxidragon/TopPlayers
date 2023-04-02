import {Module} from '@nestjs/common';
import {PlayersController} from './players.controller';
import {PlayersService} from './players.service';
import {CompetitionsModule} from '../competitions/competitions.module';
import {CompetitorsModule} from '../competitors/competitors.module';
import {CompetitorsService} from 'src/competitors/competitors.service';
import {CompetitionsService} from '../competitions/competitions.service';
import {CacheService} from "../cache/cache.service";

@Module({
    imports: [CompetitionsModule, CompetitorsModule],
    controllers: [PlayersController],
    providers: [PlayersService, CompetitionsService, CompetitorsService, CacheService],
})
export class PlayersModule {
}
