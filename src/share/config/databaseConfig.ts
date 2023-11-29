import {registerAs} from "@nestjs/config";
import {join} from "path";
import * as appRoot from "app-root-path";

export default registerAs("database", () => ({
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
	logging: String(process.env.NODE_ENV).includes("development"),
	ssl: process.env.NODE_ENV === "production" ?
		{
			ca: process.env.SSL_CERT,
		} : null,
	synchronize: true,
}));
