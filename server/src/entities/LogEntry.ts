import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class LogEntry extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  comments: string;

  @Field()
  @Column()
  image: string;

  @Field()
  @Column({ type: 'float' })
  longitude!: number;

  @Field()
  @Column({ type: 'float' })
  latitude!: number;

  @Field(() => String)
  @Column()
  visitDate!: Date;

  @Field()
  @Column()
  creatorId!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
