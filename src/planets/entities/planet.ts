import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Planet {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  climate: string;

  @Prop({ required: true, type: String })
  terrain: string;

  @Prop({ type: Number, required: false })
  appearances: number;
}

export const PlanetSchema = SchemaFactory.createForClass(Planet);
