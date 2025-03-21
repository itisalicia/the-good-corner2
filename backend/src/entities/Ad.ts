import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Category from "./Category";

@Entity()
class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  owner: string;

  @Column()
  price: number;

  @Column()
  createdAt: Date;

  @Column()
  picture: string;

  @Column()
  location: string;

  @ManyToOne(() => Category, (category) => category.ads, {
    nullable: false,
    eager: true,
  })
  category: Category;
}

export default Ad;
