import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FuelTankDocument = HydratedDocument<FuelTank>;

@Schema()
export class FuelTank {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  vendor: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  capacity: number;

  @Prop({ required: true })
  storages: number;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  price: number;
}

export const FuelTankSchema = SchemaFactory.createForClass(FuelTank);
