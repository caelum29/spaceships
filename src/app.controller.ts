import { Controller, Get, Query } from '@nestjs/common';
import { QueryDto } from 'src/shared/dto/query.dto';
import { ConfiguationDto } from 'src/shared/dto/response.dto';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getVesselConfigs')
  async getVessels(@Query() query: QueryDto): Promise<ConfiguationDto[]> {
    return await this.appService.getVessels(query);
  }
}
