// src/entities/fruit.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@Entity()
export class Variety {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

  // @OneToMany(() => Variety, (variety) => variety.fruit)
  varieties: Variety[];
}
