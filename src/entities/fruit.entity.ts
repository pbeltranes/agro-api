// src/entities/fruit.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Variety } from './variety.entity';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@Entity()
export class Fruit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

//   @OneToMany(() => Variety, (variety) => variety.fruit)
  varieties: Variety[];
}
