import {Injectable} from '@nestjs/common';
import axios from "../axios";

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
            return response.data.personal_records[cube];
        } catch (error) {
            console.error(error);
        }
    }
}
