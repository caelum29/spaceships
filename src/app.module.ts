import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FuelTank, FuelTankSchema } from 'src/schemas/fuel-tank.schema';
import { Scanner, ScannerSchema } from 'src/schemas/scanner.schema';
import { Truster, TrusterSchema } from 'src/schemas/truster.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScannerModule } from './scanner/scanner.module';
import { Body, BodySchema } from './schemas/body.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/starship'),
    MongooseModule.forFeature([
      { name: Scanner.name, schema: ScannerSchema },
      { name: Body.name, schema: BodySchema },
      { name: Truster.name, schema: TrusterSchema },
      { name: FuelTank.name, schema: FuelTankSchema },
    ]),
    ScannerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
