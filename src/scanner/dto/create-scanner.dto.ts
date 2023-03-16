import { IsNumber, IsString } from 'class-validator';

export class CreateScannerDto {
  @IsString()
  name: string;
  @IsString()
  vendor: string;
  @IsString()
  type: string;
  @IsNumber()
  weight: number;
  @IsNumber()
  price: number;
}
