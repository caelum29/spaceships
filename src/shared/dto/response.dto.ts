import { IsNumber, IsString } from 'class-validator';

export class ConfiguationDto {
  @IsNumber()
  price: number;
  @IsNumber()
  weight: number;
  @IsNumber()
  journey_distance: number;

  body: Body;
  truster: Truster;
  fuelTank: FuelTank;
  scanner: Scanner;
}

class Body {
  @IsString()
  name: string;
  @IsString()
  material: string;
  @IsNumber()
  price: number;
  @IsNumber()
  storage: number;

  @IsString()
  type: string;

  @IsString()
  vendor: string;
  @IsNumber()
  weight: number;
}

class Scanner {
  @IsString()
  name: string;
  price: number;
  @IsString()
  type: string;
  @IsString()
  vendor: string;
  @IsNumber()
  weight: number;
}

class FuelTank {
  @IsString()
  name: string;
  price: number;
  @IsString()
  type: string;
  @IsString()
  vendor: string;
  @IsNumber()
  weight: number;
}

class Truster {
  @IsString()
  name: string;
  price: number;
  @IsString()
  type: string;
  @IsString()
  vendor: string;
  @IsNumber()
  weight: number;
  @IsNumber()
  efficiency: number;
}
