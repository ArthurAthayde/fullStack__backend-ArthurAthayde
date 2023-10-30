import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("adresses")
export class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 9, nullable: false })
  zip_code: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  state: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  city: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  street: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  number: string | null;

  @Column({ type: "text", nullable: true })
  complement?: string | undefined | null;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}
