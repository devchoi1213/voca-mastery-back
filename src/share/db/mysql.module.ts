import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { addTransactionalDataSource } from "typeorm-transactional";
import { DataSource } from "typeorm";
import {join} from "path";
import * as appRoot from "app-root-path";
import databaseConfig from "../config/databaseConfig";

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: [
    //     join(appRoot.path, `config/env/.${process.env.NODE_ENV}.env`),
    //   ],
    //   load: [databaseConfig],
    //   isGlobal: true,
    // }),
    TypeOrmModule.forRootAsync({
      // imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...(await configService.get("database")),
      }),
      async dataSourceFactory(options) {
		  console.log('MysqlModule!!!!!!!');
        if (!options) {
          throw new Error("Invalid options passed");
        }

        return addTransactionalDataSource(new DataSource(options));
      },
      inject: [ConfigService],
    }),
  ],
})
export class MysqlModule {}
