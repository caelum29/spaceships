import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TrusterDocument = HydratedDocument<Truster>;

@Schema()
export class Truster {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  vendor: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  efficiency: number;

  @Prop({ required: true })
  storages: number;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  price: number;
}

export const TrusterSchema = SchemaFactory.createForClass(Truster);
