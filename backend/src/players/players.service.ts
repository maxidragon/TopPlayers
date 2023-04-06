import {Injectable, CacheInterceptor} from '@nestjs/common';
import {CompetitionsService} from '../competitions/competitions.service';
import {CompetitorsService} from '../competitors/competitors.service';

@Injectable()
export class PlayersService {

    constructor(
        private readonly competitionsService: CompetitionsService,
        private readonly competitorsService: CompetitorsService,
    ) {
    }

    async getThisWeekendTopPlayers(cube: string, country?: string): Promise<any[]> {
        const today = new Date().getDay();
        let nextFriday, nextSunday;
        switch (today) {
            case 0:
                nextFriday = new Date();
                nextFriday.setDate(nextFriday.getDate() - 2);
                nextSunday = new Date();
                break;
            case 6:
                nextFriday = new Date();
                nextFriday.setDate(nextFriday.getDate() - 1);
                nextSunday = new Date();
                nextSunday.setDate(nextSunday.getDate() + 1);
                break;
            default:
                const daysToFriday = (5 - today + 7) % 7;
                nextFriday = new Date();
                nextFriday.setDate(nextFriday.getDate() + daysToFriday);
                nextSunday = new Date(nextFriday.getTime());
                nextSunday.setDate(nextSunday.getDate() + 2);
                break;
        }

        const start = `${nextFriday.getFullYear()}-${(nextFriday.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${nextFriday.getDate().toString().padStart(2, '0')}`;
        const end = `${nextSunday.getFullYear()}-${(nextSunday.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${nextSunday.getDate().toString().padStart(2, '0')}`;
        let competitions = [];
        if (country) {
            competitions = await this.competitionsService.getCompetitionsId(
                start,
                end,
                country,
            );
        } else {
            competitions = await this.competitionsService.getCompetitionsId(
                start,
                end
            );
        }
        const topPlayers = [];
        await Promise.all(
            competitions.map(async (competition: any) => {
                    const competitionInfo =
                        await this.competitionsService.getCompetitionInfo(competition);
                    if (competitionInfo.event_ids.includes(cube)) {
                        const competitors = await this.competitionsService.getCompetitorsId(
                            competition,
                        );
                        const competitionTopPlayers = [];
                        await Promise.all(
                            competitors.map(async (competitor) => {
                                    const profile =
                                        await this.competitorsService.getPersonalRecordsForEvent(
                                            competitor,
                                            cube,
                                        );
                                    if (
                                        profile
                                    ) {
                                        const personalRecords = profile.personal_records;
                                        if (personalRecords && personalRecords.hasOwnProperty('average')) {
                                            if (country) {
                                                if (personalRecords.average.country_rank <= 25) {
                                                    if (profile.country === country) {
                                                        competitionTopPlayers.push(competitor);
                                                    }
                                                }
                                            } else {
                                                if (personalRecords.average.world_rank <= 25) {
                                                    competitionTopPlayers.push(competitor);
                                                }
                                            }
                                        }
                                    }
                                }
                            ),
                        );
                        return Promise.all(
                            competitionTopPlayers.map(async (topPlayer) => {
                                const profile =
                                    await this.competitorsService.getCompetitorProfile(topPlayer);
                                const finalTopPlayer = {
                                    name: profile.person.name,
                                    id: topPlayer,
                                    profile: `https://www.worldcubeassociation.org/persons/${topPlayer}`,
                                    competition: competitionInfo.name,
                                    compWebsite: competitionInfo.url,
                                };
                                topPlayers.push(finalTopPlayer);
                            }),
                        );
                    }
                }
            ),
        );
        return topPlayers.flat();
    }
}
