import {Injectable} from '@nestjs/common';
import axios from '../axios';

@Injectable()
export class CompetitorsService {
    async getCompetitorProfile(id: string) {
        try {
            const response = await axios.get(`persons/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getPersonalRecords(id: string) {
        try {
            const response = await axios.get(`persons/${id}`);
            return response.data.personal_records;
        } catch (error) {
            console.error(error);
        }
    }

    async getPersonalRecordsForEvent(id: string, cube: string) {
        try {
            const response = await axios.get(`persons/${id}`);
            return {
                personal_records: response.data.personal_records[cube],
                country: response.data.person.country_iso2
            };
        } catch (error) {
            console.error(error);
        }
    }
}
