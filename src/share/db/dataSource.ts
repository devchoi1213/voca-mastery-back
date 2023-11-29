import {DataSource} from "typeorm";
import {join} from "path";
import * as dotenv from "dotenv";
import * as appRoot from "app-root-path";

dotenv.config({
	path: join(appRoot.path, `config/env/.${process.env.NODE_ENV}.env`),
});

export default new DataSource({
	type: "mysql",
	host: process.env.DATABASE_HOST,
	port: 3306,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_SCHEMA_NAME,
	entities: [
		join(appRoot.path, "dist/share/db/entity/*.entity{.ts,.js}"),
	],
	timezone: "+09:00",
	migrations: [
		join(appRoot.path, "dist/share/db/migration/*{.ts,.js}"),
	],
	synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
});
