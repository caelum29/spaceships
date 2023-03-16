import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Scanner, ScannerSchema } from 'src/schemas/scanner.schema';
import { ScannerService } from './scanner.service';
import { ScannerController } from './scanner.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Scanner.name, schema: ScannerSchema }]),
  ],
  controllers: [ScannerController],
  providers: [ScannerService],
})
export class ScannerModule {}
