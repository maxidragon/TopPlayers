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
                                    let attempts = 0;
                                    let profile = null;
                                    if (competitor.events.includes(cube)) {
                                        do {
                                            try {
                                                profile = await this.competitorsService.getPersonalRecordsForEvent(competitor.id, cube);
                                            } catch (error) {
                                                attempts++;
                                                console.log(`Attempt ${attempts} to get personal records for competitor ${competitor.id} and cube ${cube} failed with error: ${error}`);
                                            }
                                        } while (!profile);
                                        if (
                                            profile
                                        ) {
                                            const personalRecords = profile.personal_records;
                                            if (personalRecords && personalRecords.hasOwnProperty('average')) {
                                                if (country) {
                                                    if (personalRecords.average.country_rank <= 15) {
                                                        if (profile.country === country) {
                                                            competitionTopPlayers.push(competitor.id);
                                                        }
                                                    }
                                                } else {
                                                    if (personalRecords.average.world_rank <= 25) {
                                                        competitionTopPlayers.push(competitor.id);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            ),
                        );
                        return Promise.all(
                            competitionTopPlayers.map(async (topPlayer) => {
                                let attempts = 0;
                                let profile = null;
                                do {
                                    try {
                                        profile = await this.competitorsService.getCompetitorProfile(topPlayer);
                                    } catch (error) {
                                        attempts++;
                                        console.log(`Attempt ${attempts} to get personal records for competitor ${topPlayer} and cube ${cube} failed with error: ${error}`);
                                    }
                                } while (!profile);
                                const finalTopPlayer = {
                                    name: profile.person.name,
                                    worldRank: profile.personal_records[cube].average.world_rank,
                                    countryRank: profile.personal_records[cube].average.country_rank,
                                    country: profile.person.country.name,
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
