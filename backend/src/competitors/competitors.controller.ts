import {Controller, Get, Param} from '@nestjs/common';
import {CompetitorsService} from "./competitors.service";

@Controller('competitors')
export class CompetitorsController {
    constructor(private readonly competitorService: CompetitorsService) {}

    @Get(':id/pr/')
    async getCompetitorPersonalRecords(@Param('id') id: string) {
        return await this.competitorService.getPersonalRecords(id);
    }

}
