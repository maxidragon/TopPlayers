import { Controller, Get, Param } from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get('/this/:cube')
  async getWeekendTopPlayers(@Param('cube') cube: string) {
    return await this.playersService.getThisWeekendTopPlayers(cube);
  }
}
