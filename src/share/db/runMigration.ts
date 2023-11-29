/**
 * 1. create the database connection.
 * 2. run migrations
 * 2a. needs home-rolled migration locking mechanism, because TypeORM lacks one
 */
import { DataSource } from "typeorm";

export async function runMigration(dataSource: DataSource) {
  // create database lock for migrations
  do {
    try {
      await dataSource.query(
        "CREATE TABLE `_lock` (`id` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`))"
      );

      await dataSource.runMigrations({ transaction: "all" });
      break;
    } catch (err) {
      console.log(err);
      console.log(
        "Database lock table (_lock) already exists. Waiting for release..."
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      await dataSource.query("DROP TABLE IF EXISTS `_lock`");
    }
  } while (true);
}
