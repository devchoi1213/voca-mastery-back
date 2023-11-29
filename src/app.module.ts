import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {join} from "path";
import mapConfig from "./share/config/mapConfig";
import {ConfigModule} from "@nestjs/config";
import smsConfig from "./share/config/smsConfig";
import databaseConfig from "./share/config/databaseConfig";
import authConfig from "./share/config/authConfig";
import * as appRoot from "app-root-path";
import {MysqlModule} from "./share/db/mysql.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [
				join(appRoot.path, `env/.env.${process.env.NODE_ENV}`),
			],
			load: [authConfig, databaseConfig, smsConfig, mapConfig],
			isGlobal: true,
		}),
		MysqlModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
