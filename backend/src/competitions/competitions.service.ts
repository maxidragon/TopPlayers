import {Injectable} from '@nestjs/common';
import axios from '../axios';

@Injectable()
export class CompetitionsService {
    async getCompetitionsId(start: string, end: string, country?: string) {
        try {
            const response = await axios.get('competitions', {
                params: {
                    start,
                    end,
                    per_page: 100,
                    country_iso2: country,
                },
            });
            const competitions = [];
            response.data.map((competition: any) => {
                competitions.push(competition.id);
            });
            return competitions;
        } catch (error) {
            console.error(error);
        }
    }

    async getCompetitionInfo(id: string) {
        try {
            const response = await axios.get('competitions/' + id);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getCompetitorsId(competitionId: string) {
        try {
            const response = await axios.get(
                `competitions/${competitionId}/wcif/public`,
            );
            const competitors = [];
            response.data.persons.map((competitor: any) => {
                if (competitor.wcaId && competitor.registration && competitor.registration.eventIds && competitor.registration.hasOwnProperty('eventIds')) {
                    competitors.push(
                        {
                            id: competitor.wcaId,
                            events: competitor.registration.eventIds
                        }
                    );
                }
            });
            return competitors;
        } catch (error) {
            console.error(error);
        }
    }
}
