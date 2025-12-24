import AppDataSource from "./db/data-source";
import express from "express";
import "reflect-metadata";
import routes from "./routes";
import {Meeting} from "./db/entities/Meeting";
import morgan from "morgan";
import cors from 'cors';
import path from "node:path";
import {PORT} from "./utils/constants";


const publicPath = path.join(process.cwd(), 'images');

const app = express();
app.use(cors());
app.use('/images', express.static(publicPath));
app.use(express.json());
app.use(morgan("dev"));

declare global {
    namespace Express {
        export interface Request {
            meeting?: Meeting;
        }
    }
}


app.use("/api", routes);


AppDataSource.initialize()
    .then(async (ds) => {
        await ds.runMigrations();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Data Source initialization error", err);
        process.exit(1);
    });