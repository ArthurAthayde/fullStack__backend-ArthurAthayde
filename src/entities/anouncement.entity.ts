import {
  Column,
  CreateDateColumn,
  Decimal128,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { Image } from "./images.entity";
import { Comment } from "./comments.entity";

@Entity("anouncements")
export class Anouncement {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 50, nullable: false })
  brand: string;

  @Column({ length: 50, nullable: false })
  model: string;

  @Column({ nullable: false })
  year: number;

  @Column({ length: 50, nullable: false })
  fuel: string;

  @Column({ type: "float", nullable: false })
  mileage: number;

  @Column({ length: 50, nullable: false })
  color: string;

  @Column({ type: "float", nullable: false })
  price_fipe: number;

  @Column({ type: "float", nullable: false })
  price: number;

  @Column({ type: "text", nullable: true })
  description?: string | undefined | null;

  @Column({ length: 200 })
  cover_image: string;

  @ManyToOne(() => User, (user) => user.anouncements, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => Image, (images) => images.anouncement)
  images: Array<Image>;

  @OneToMany(() => Comment, (c) => c.anouncement)
  comments: Array<Comment>;
}
