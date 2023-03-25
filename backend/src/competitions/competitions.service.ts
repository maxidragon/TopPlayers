import {Injectable} from '@nestjs/common';
import axios from '../axios';

@Injectable()
export class CompetitionsService {
    async getCompetitionsId(start: String, end: String) {
        try {
            const response = await axios.get('competitions', {
                params: {
                    start,
                    end,
                    per_page: 100
                }
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

    async getCompetitorsId(competitionId: string) {
        try {
            const response = await axios.get(`competitions/${competitionId}/competitors`, {
                params: {
                    per_page: 1000
                }
            });
            const competitors = [];
            response.data.map((competitor: any) => {
                if (competitor.id) {
                    competitors.push(competitor.id);
                }
            });
            return competitors;
        } catch (error) {
            //console.error(error);
        }
    }
}
