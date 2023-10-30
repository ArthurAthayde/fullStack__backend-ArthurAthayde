import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Anouncement } from "./anouncement.entity";
import { User } from "./user.entity";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  description: string;

  @CreateDateColumn({ type: "date" })
  created_at: Date | string;

  @ManyToOne(() => Anouncement, (anouncement) => anouncement.comments, {
    onDelete: "CASCADE",
  })
  anouncement: Anouncement;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user: User;
}
