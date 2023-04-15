import {Controller, Get, Param} from '@nestjs/common';
import {PlayersService} from './players.service';
import {CacheService} from '../cache/cache.service';

@Controller('players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService, private readonly cacheService: CacheService) {
    }

    @Get('/this/:cube')
    async getWeekendTopPlayers(@Param('cube') cube: string) {
        const cacheKey = `players-this-weekend-${cube}`;
        const cachedValue = await this.cacheService.get(cacheKey);
        if (cachedValue) {
            return cachedValue;
        }

        const value = await this.playersService.getThisWeekendTopPlayers(cube);
        await this.cacheService.set(cacheKey, value);
        return value;
    }

    @Get('/this/:cube/:country')
    async getWeekendTopPlayersForCountry(@Param('cube') cube: string, @Param('country') country: string) {
        const cacheKey = `players-this-weekend-${cube}-${country}`;
        const cachedValue = await this.cacheService.get(cacheKey);
        if (cachedValue) {
            return cachedValue;
        }
        const value = await this.playersService.getThisWeekendTopPlayers(cube, country);
        await this.cacheService.set(cacheKey, value);
        return value;
    }

    @Get('/this/:cube/continent/:continent')
    async getWeekendTopPlayersForContinent(@Param('cube') cube: string, @Param('continent') continent: string) {
        const cacheKey = `players-this-weekend-${cube}-${continent}`;
        const cachedValue = await this.cacheService.get(cacheKey);
        if (cachedValue) {
            return cachedValue;
        }
        const value = await this.playersService.getThisWeekendTopPlayers(cube, null, continent);
        await this.cacheService.set(cacheKey, value);
        return value;
    }
}
