import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export class BaseEntity {

  @PrimaryGeneratedColumn()
  readonly id: number;

  @CreateDateColumn({
    type: "datetime",
    select: true,
    name: "created_at",
  })
  readonly createdAt?: Date;

  @UpdateDateColumn({
    type: "datetime",
    select: true,
    name: "modified_at",
  })
  modifiedAt?: Date;

  @DeleteDateColumn({
    type: "datetime",
    select: false,
    name: "deleted_at",
  })
  deletedAt?: Date;
}
