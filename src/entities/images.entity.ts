import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Anouncement } from "./anouncement.entity";

@Entity("images")
export class Image {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 200 })
  image_url: string;

  @ManyToOne(() => Anouncement, (anouncement) => anouncement.images, {
    onDelete: "CASCADE",
  })
  anouncement: Anouncement;
}
