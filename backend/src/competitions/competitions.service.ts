import {Injectable} from '@nestjs/common';
import axios from '../axios';

@Injectable()
export class CompetitionsService {
    async getCompetitionsId(start: string, end: string) {
        try {
            const response = await axios.get('competitions', {
                params: {
                    start,
                    end,
                    per_page: 100,
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
                if (competitor.wcaId) {
                    competitors.push(competitor.wcaId);
                }
            });
            return competitors;
        } catch (error) {
            console.error(error);
        }
    }
}
