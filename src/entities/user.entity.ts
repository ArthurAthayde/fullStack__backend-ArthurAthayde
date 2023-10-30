import { getRounds, hashSync } from "bcryptjs";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Anouncement } from "./anouncement.entity";
import { Comment } from "./comments.entity";

export enum ACCOUNT_TYPE {
  CUSTOMER = "Customer",
  ADVERTISER = "Advertiser",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column()
  cpf: string;

  @Column({ length: 100 })
  tel: string;

  @Column({ type: "date" })
  birth: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 200 })
  description: string;

  @Column({
    type: "enum",
    enum: ACCOUNT_TYPE,
    default: ACCOUNT_TYPE.ADVERTISER,
  })
  account: ACCOUNT_TYPE;

  @OneToMany(() => Anouncement, (anouncements) => anouncements.user)
  anouncements: Array<Anouncement>;

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comment: Comment[];

  @BeforeInsert()
  @BeforeUpdate()
  hashpassword() {
    const passwordHashed = getRounds(this.password);
    if (!passwordHashed) {
      this.password = hashSync(this.password, 10);
    }
  }
}
