import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Category from "./Category";
import Tag from "./Tag";

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

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  picture: string;

  @Column()
  location: string;

  @ManyToOne(() => Category, (category) => category.ads)
  category: Category;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}

export default Ad;
