import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Scanner, ScannerDocument } from 'src/schemas/scanner.schema';
import { CreateScannerDto } from './dto/create-scanner.dto';
import { UpdateScannerDto } from './dto/update-scanner.dto';

@Injectable()
export class ScannerService {
  constructor(
    @InjectModel(Scanner.name) private scannerModel: Model<ScannerDocument>,
  ) {}
  async create(createScannerDto: CreateScannerDto): Promise<Scanner> {
    const createdScanner = new this.scannerModel(createScannerDto);
    return await createdScanner.save();
  }

  async findAll(): Promise<Scanner[]> {
    return await this.scannerModel.find().exec();
  }

  async findOne(id: string) {
    return await this.scannerModel.find({ _id: id }).exec();
  }

  async update(id: string, updateScannerDto: UpdateScannerDto) {
    console.log(updateScannerDto);
    return await this.scannerModel
      .updateOne({ _id: id }, updateScannerDto)
      .exec();
  }

  async remove(id: string) {
    return await this.scannerModel.deleteOne({ _id: id }).exec();
  }
}
