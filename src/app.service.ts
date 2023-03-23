import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Body, BodyDocument } from 'src/schemas/body.schema';
import { FuelTank, FuelTankDocument } from 'src/schemas/fuel-tank.schema';
import { Scanner, ScannerDocument } from 'src/schemas/scanner.schema';
import { Truster, TrusterDocument } from 'src/schemas/truster.schema';
import { QueryDto } from 'src/shared/dto/query.dto';
import {
  bodies,
  fuelTanks,
  scanners,
  trusters,
} from './shared/starship-modules';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(Scanner.name) private scannerModel: Model<ScannerDocument>,
    @InjectModel(Body.name) private bodyModel: Model<BodyDocument>,
    @InjectModel(FuelTank.name) private fuelTankModel: Model<FuelTankDocument>,
    @InjectModel(Truster.name) private trusterModel: Model<TrusterDocument>,
  ) {}
  async getVessels(params: QueryDto) {
    const {
      max_price: maxPrice,
      max_weight: maxWeight,
      journey_distance: distance,
    } = params;

    const allModules = await this.getAllModules();

    const { scanners, bodies, fuelTanks, trusters } = allModules;

    let configurations = this.generateAllPossibleSpaceshipConfigurations(
      bodies,
      scanners,
      fuelTanks,
      trusters,
    );

    if (maxPrice) {
      configurations = this.filerConfigurationsByPrice(
        maxPrice,
        configurations,
      );
    }

    if (maxWeight) {
      configurations = this.filterConfigurationByWeight(
        maxWeight,
        configurations,
      );
    }

    if (distance) {
      configurations = this.filterConfigurationByDistance(
        distance,
        configurations,
      );
    }

    return configurations.slice(0, 10);
  }

  private filerConfigurationsByPrice(price, configurations) {
    return configurations.filter((config) => config.price <= price);
  }

  private filterConfigurationByWeight(weight, configurations) {
    return configurations.filter((config) => config.weight <= weight);
  }

  private filterConfigurationByDistance(distance, configurations) {
    return configurations.filter(
      (config) => config.journey_distance >= distance,
    );
  }

  private generateAllPossibleSpaceshipConfigurations(
    bodies,
    scanners,
    fuelTanks,
    thrusters,
  ) {
    const configurations = [];
    for (const body of bodies) {
      for (const scanner of scanners) {
        if (scanner.type !== 'any' && scanner.type !== body.type) {
          continue;
        }
        for (const fuelTank of fuelTanks) {
          if (fuelTank.type !== 'any' && fuelTank.type !== body.type) {
            continue;
          }
          for (const truster of thrusters) {
            if (truster.type !== 'any' && truster.type !== body.type) {
              continue;
            }
            const weight =
              body.weight + scanner.weight + fuelTank.weight + truster.weight;
            configurations.push({
              price:
                body.price + scanner.price + fuelTank.price + truster.price,
              weight,
              journey_distance:
                (truster.efficiency * fuelTank.capacity * 43.29) / weight,
              body,
              truster,
              fuelTank,
              scanner,
            });
          }
        }
      }
    }
    return configurations.sort((a, b) => b.price - a.price);
  }

  async getAllModules() {
    // const scanners = this.scannerModel.find().exec;
    // const bodies = this.bodyModel.find().exec;
    // const fuelTanks = this.fuelTankModel.find().exec;
    // const trusters = this.trusterModel.find().exec;
    //
    // return await Promise.all([scanners(), bodies(), fuelTanks(), trusters()]);

    const scanners = await this.scannerModel.find().exec();
    const bodies = await this.bodyModel.find().exec();
    const fuelTanks = await this.fuelTankModel.find().exec();
    const trusters = await this.trusterModel.find().exec();

    return {
      scanners,
      bodies,
      fuelTanks,
      trusters,
    };
  }

  async onModuleInit() {
    const collections = await this.connection.db.listCollections().toArray();
    if (!collections.length) {
      await this.connection.db.collection('scanners').insertMany(scanners);
      await this.connection.db.collection('fueltanks').insertMany(fuelTanks);
      await this.connection.db.collection('bodies').insertMany(bodies);
      await this.connection.db.collection('trusters').insertMany(trusters);
    }
  }
}
