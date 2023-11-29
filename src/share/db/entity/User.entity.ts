import {Column, Entity} from "typeorm";
import {BaseEntity} from "./Base.entity";

@Entity("user")
export class UserEntity extends BaseEntity {
	@Column({
		name: "email",
		type: "varchar",
		length: 500,
		nullable: false,
		unique: true,
		comment: "이메일",
	})
	email: string;
	
	@Column({
		name: "refresh_token",
		length: 500,
		nullable: true,
	})
	refreshToken?: string;
}
