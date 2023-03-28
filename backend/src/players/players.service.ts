import {Injectable} from '@nestjs/common';
import {CompetitionsService} from '../competitions/competitions.service';
import {CompetitorsService} from "../competitors/competitors.service";
import * as cacheManager from 'cache-manager';
import {RedisCacheFactory} from 'cache-manager-redis-store';

@Injectable()
export class PlayersService {
    private cache: cacheManager.Cache;

    constructor(
        private readonly competitionsService: CompetitionsService,
        private readonly competitorsService: CompetitorsService
    ) {
        const redisCacheFactory = new RedisCacheFactory({
            host: 'localhost',
            port: 6379,
            ttl: 60 * 60 * 24,
        });
        this.cache = redisCacheFactory.create();
    }

    async getThisWeekendTopPlayers(cube: string) {
        //TODO
        //Check is today is friday
        let weekDay = new Date().getDay();
        let daysToFriday = (5 - weekDay + 7) % 7;
        let nextFriday = new Date();
        nextFriday.setDate(nextFriday.getDate() + daysToFriday);
        let nextSunday = new Date(nextFriday.getTime());
        nextSunday.setDate(nextSunday.getDate() + 2);

        const start = `${nextFriday.getFullYear()}-${(nextFriday.getMonth() + 1).toString().padStart(2, '0')}-${nextFriday.getDate().toString().padStart(2, '0')}`;
        const end = `${nextSunday.getFullYear()}-${(nextSunday.getMonth() + 1).toString().padStart(2, '0')}-${nextSunday.getDate().toString().padStart(2, '0')}`;

        const competitions = await this.competitionsService.getCompetitionsId(start, end);

        let topPlayers = [];
        await Promise.all(competitions.map(async (competition: any) => {
            const competitionInfo = await this.competitionsService.getCompetitionInfo(competition);
            if (competitionInfo.event_ids.includes(cube)) {
                const competitors = await this.competitionsService.getCompetitorsId(competition);
                const competitionTopPlayers = [];
                for (const competitor of competitors) {
                    const personalRecords = await this.competitorsService.getPersonalRecordsForEvent(competitor, cube);
                    if (personalRecords && personalRecords.hasOwnProperty('average')) {
                        if (personalRecords.average.world_rank <= 25) {
                            competitionTopPlayers.push(competitor);
                        }
                    }
                }
                for (const topPlayer of competitionTopPlayers) {
                    const profile = await this.competitorsService.getCompetitorProfile(topPlayer);
                    const player = {
                        name: profile.person.name,
                        id: topPlayer,
                        profile: `https://www.worldcubeassociation.org/persons/${topPlayer}`,
                        competition: competitionInfo.name,
                        compWebsite: competitionInfo.url,
                    };
                    topPlayers.push(player);
                }
            }
        }));
        return topPlayers;
    }
}
