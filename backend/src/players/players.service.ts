import {Injectable} from '@nestjs/common';
import {CompetitionsService} from '../competitions/competitions.service';
import {CompetitorsService} from "../competitors/competitors.service";

@Injectable()
export class PlayersService {
    constructor(private readonly competitionsService: CompetitionsService, private readonly competitorsService: CompetitorsService) {
    }

    async getThisWeekendTopPlayers(cube: string) {
        let weekDay = new Date().getDay();
        let daysToFriday = (5 - weekDay + 7) % 7;
        let nextFriday = new Date();
        nextFriday.setDate(nextFriday.getDate() + daysToFriday);
        let nextSunday = new Date(nextFriday.getTime());
        nextSunday.setDate(nextSunday.getDate() + 2);

        const start = `${nextFriday.getFullYear()}-${(nextFriday.getMonth() + 1).toString().padStart(2, '0')}-${nextFriday.getDate().toString().padStart(2, '0')}`;
        const end = `${nextSunday.getFullYear()}-${(nextSunday.getMonth() + 1).toString().padStart(2, '0')}-${nextSunday.getDate().toString().padStart(2, '0')}`;
        const competitions = await this.competitionsService.getCompetitionsId(start, end);

        const topPlayers = [];
        competitions.map(async (competition: any) => {
            const competitors = await this.competitionsService.getCompetitorsId(competition);
            const competitionTopPlayers = [];
            for (const competitor of competitors) {
                const personalRecords = await this.competitorsService.getPersonalRecords(competitor);
                if (personalRecords !== undefined && personalRecords[cube] !== undefined && personalRecords[cube].average !== undefined) {
                    if (personalRecords[cube].average.world_rank <= 25) {
                        competitionTopPlayers.push(competitor);
                    }
                }
            }
            //TODO
            //Add competition name and return array of objects with name and wcaid of top player
            topPlayers.push(competitionTopPlayers);
        });
        return topPlayers;
    }
}
