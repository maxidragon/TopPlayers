import {Controller, Get, Param} from '@nestjs/common';
import {CompetitionsService} from "./competitions.service";

@Controller('competitions')
export class CompetitionsController {
    constructor(private readonly competitionsService: CompetitionsService) {
    }

    @Get('/id')
    async getCompetitionsId(@Param('start') start: string, @Param('end') end: string) {
        return await this.competitionsService.getCompetitionsId(start, end);
    }
    @Get(':id/competitors/')
    async getCompetitorsId(@Param('id') id: string) {
        return await this.competitionsService.getCompetitorsId(id);
    }
}
