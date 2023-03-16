import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BodyDocument = HydratedDocument<Body>;

@Schema()
export class Body {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  vendor: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  material: number;

  @Prop({ required: true })
  storages: number;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  price: number;
}

export const BodySchema = SchemaFactory.createForClass(Body);
