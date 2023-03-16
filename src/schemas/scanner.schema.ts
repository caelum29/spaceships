import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ScannerDocument = HydratedDocument<Scanner>;

@Schema()
export class Scanner {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  vendor: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  price: number;
}

export const ScannerSchema = SchemaFactory.createForClass(Scanner);
