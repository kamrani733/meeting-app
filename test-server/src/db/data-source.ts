import "reflect-metadata";
import { DataSource } from "typeorm";
import { Meeting } from "./entities/Meeting";
import * as path from "path";
import * as fs from "fs";


const dbPath = path.resolve(process.cwd(), "data", "db.sqlite");
const migrationsPath = path.resolve(process.cwd(), "src", "db", "migrations", "*.ts");


const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}


export const AppDataSource = new DataSource({
    type: "sqlite",
    database: dbPath,
    entities: [Meeting],
    synchronize: false,
    logging: false,
    migrations: [migrationsPath],
    migrationsRun: false,
});


export default AppDataSource;