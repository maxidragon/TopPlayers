import { Controller, Get, Param } from '@nestjs/common';
import { CompetitorsService } from './competitors.service';

@Controller('competitors')
export class CompetitorsController {
  constructor(private readonly competitorService: CompetitorsService) {}
  @Get(':id/')
  async getCompetitorProfile(@Param('id') id: string) {
    return await this.competitorService.getCompetitorProfile(id);
  }
  @Get(':id/pr/')
  async getCompetitorPersonalRecords(@Param('id') id: string) {
    return await this.competitorService.getPersonalRecords(id);
  }
  @Get(':id/pr/:cube')
  async getCompetitorPersonalRecordsForEvent(
    @Param('id') id: string,
    @Param('cube') cube: string,
  ) {
    return await this.competitorService.getPersonalRecordsForEvent(id, cube);
  }
}
