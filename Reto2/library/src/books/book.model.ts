import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export enum BookStatus {
  Disponible = 'disponible',
  Reservado = 'reservado',
}

@Schema()
export class Book extends Document {
  @ApiProperty()
  @Prop({ required: true })
  title: string;
  @ApiProperty()
  @Prop()
  author: string;
  @ApiProperty()
  @Prop()
  publicationYear: number;
  @ApiProperty()
  @Prop({ default: BookStatus.Disponible, enum: BookStatus })
  status: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
