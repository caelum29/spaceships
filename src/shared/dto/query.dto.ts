import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class QueryDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  max_price: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  max_weight: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  journey_distance: number;
}
