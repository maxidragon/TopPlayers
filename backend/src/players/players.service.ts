import {Injectable, CacheInterceptor} from '@nestjs/common';
import {CompetitionsService} from '../competitions/competitions.service';
import {CompetitorsService} from '../competitors/competitors.service';
import regions from '../regions';

@Injectable()
export class PlayersService {

    constructor(
        private readonly competitionsService: CompetitionsService,
        private readonly competitorsService: CompetitorsService,
    ) {
    }

    async getThisWeekendTopPlayers(cube: string, country?: string, continent?: string): Promise<any[]> {
        const today = new Date().getDay();
        let nextFriday, nextMonday;

        switch (today) {
            case 0:
                nextFriday = new Date();
                nextFriday.setDate(nextFriday.getDate() - 3);
                nextMonday = new Date();
                nextMonday.setDate(nextMonday.getDate() + 1);
                break;
            case 1:
                nextFriday = new Date();
                nextFriday.setDate(nextFriday.getDate() - 4);
                nextMonday = new Date();
                nextMonday.setDate(nextMonday.getDate() + 1);
                break;
            case 5:
                nextFriday = new Date();
                nextMonday = new Date();
                nextMonday.setDate(nextMonday.getDate() + 3);
                break;
            case 6:
                nextFriday = new Date();
                nextFriday.setDate(nextFriday.getDate() - 2);
                nextMonday = new Date();
                nextMonday.setDate(nextMonday.getDate() + 2);
                break;
            default:
                const daysToFriday = (5 - today + 7) % 7;
                nextFriday = new Date();
                nextFriday.setDate(nextFriday.getDate() + daysToFriday);
                nextMonday = new Date(nextFriday.getTime());
                nextMonday.setDate(nextMonday.getDate() + 3);
                break;
        }


        const start = `${nextFriday.getFullYear()}-${(nextFriday.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${nextFriday.getDate().toString().padStart(2, '0')}`;
        const end = `${nextMonday.getFullYear()}-${(nextMonday.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${nextMonday.getDate().toString().padStart(2, '0')}`;
        const competitions = await this.competitionsService.getCompetitionsId(
            start,
            end,
        );
        const topPlayers = [];
        await Promise.all(
            competitions.map(async (competition: any) => {
                    const competitionInfo =
                        await this.competitionsService.getCompetitionInfo(competition.id);
                    let compEvent = null;
                    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                    const startDate = new Date(competition.startDate);
                    const endDate = new Date(competition.endDate);
                    let compDaysArray = [];
                    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                        compDaysArray.push(weekday[d.getDay()]);
                    }
                    const compDays = compDaysArray.join(', ');
                    competitionInfo.events.map((event: any) => {
                        if (event.id === cube) {
                            compEvent = event;
                        }
                    });
                    if (compEvent && competitionInfo.persons) {
                        const competitors = competitionInfo.persons;
                        const competitionTopPlayers = [];
                        await Promise.all(
                            competitors.map(async (competitor) => {
                                    if (competitor.registration && competitor.registration.eventIds) {
                                        if (
                                            competitor.registration.eventIds.includes(cube)
                                        ) {
                                            const personalRecords = competitor.personalBests;
                                            let checkedResult = null;
                                            personalRecords.map((record) => {
                                                if (record.eventId == cube) {
                                                    const bldEvents = ["333bf", "444bf", "555bf", "333mbf"];
                                                    if (bldEvents.includes(cube)) {
                                                        if (record.type === "single") {
                                                            checkedResult = record;
                                                        }
                                                    } else {
                                                        if (record.type === "average") {
                                                            checkedResult = record;
                                                        }
                                                    }
                                                }
                                            });
                                            if (checkedResult) {
                                                let playerCountry = '';
                                                let playerContinent = '';
                                                regions.map((region) => {
                                                    if (region.iso2 === competitor.countryIso2) {
                                                        playerCountry = region.name;
                                                        playerContinent = region.continentId;
                                                    }
                                                });
                                                if (country) {
                                                    if (checkedResult.nationalRanking <= 15) {
                                                        if (competitor.countryIso2 === country) {
                                                            competitionTopPlayers.push(
                                                                {
                                                                    name: competitor.name,
                                                                    worldRank: checkedResult.worldRanking,
                                                                    countryRank: checkedResult.nationalRanking,
                                                                    continentRank: checkedResult.continentalRanking,
                                                                    prResult: checkedResult.best,
                                                                    format: checkedResult.type,
                                                                    country: playerCountry,
                                                                    id: competitor.wcaId,
                                                                    profile: `https://www.worldcubeassociation.org/persons/${competitor.wcaId}`,
                                                                    competition: competitionInfo.name,
                                                                    compWebsite: `https://worldcubeassociation.org/competitions/${competitionInfo.id}`,
                                                                    rounds: compEvent.rounds.length,
                                                                    compDays: compDays
                                                                }
                                                            );
                                                        }
                                                    }
                                                } else if (continent) {
                                                    if (checkedResult.continentalRanking <= 25) {
                                                        if (playerContinent === continent) {
                                                            competitionTopPlayers.push(
                                                                {
                                                                    name: competitor.name,
                                                                    worldRank: checkedResult.worldRanking,
                                                                    countryRank: checkedResult.nationalRanking,
                                                                    continentRank: checkedResult.continentalRanking,
                                                                    prResult: checkedResult.best,
                                                                    format: checkedResult.type,
                                                                    country: playerCountry,
                                                                    id: competitor.wcaId,
                                                                    profile: `https://www.worldcubeassociation.org/persons/${competitor.wcaId}`,
                                                                    competition: competitionInfo.name,
                                                                    compWebsite: `https://worldcubeassociation.org/competitions/${competitionInfo.id}`,
                                                                    rounds: compEvent.rounds.length,
                                                                    compDays: compDays
                                                                }
                                                            );
                                                        }
                                                    }
                                                } else {
                                                    if (checkedResult.worldRanking <= 25) {
                                                        competitionTopPlayers.push(
                                                            {
                                                                name: competitor.name,
                                                                worldRank: checkedResult.worldRanking,
                                                                countryRank: checkedResult.nationalRanking,
                                                                continentRank: checkedResult.continentalRanking,
                                                                prResult: checkedResult.best,
                                                                format: checkedResult.type,
                                                                country: playerCountry,
                                                                id: competitor.wcaId,
                                                                profile: `https://www.worldcubeassociation.org/persons/${competitor.wcaId}`,
                                                                competition: competitionInfo.name,
                                                                compWebsite: `https://worldcubeassociation.org/competitions/${competitionInfo.id}`,
                                                                rounds: compEvent.rounds.length,
                                                                compDays: compDays
                                                            }
                                                        );
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
                                topPlayers.push(topPlayer);
                            }),
                        );
                    }
                }
            ),
        );
        if (country) {
            topPlayers.sort((a, b) => a.countryRank - b.countryRank);
        } else {
            topPlayers.sort((a, b) => a.worldRank - b.worldRank);
        }
        return topPlayers.flat();
    }
}