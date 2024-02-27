import "reflect-metadata"
import "dotenv/config"
import { DataSource } from "typeorm"
import { Roles1708989507982 } from "./migrations/1708989507982-roles"
import { Users1708989530865 } from "./migrations/1708989530865-users"
import { Services1708989550470 } from "./migrations/1708989550470-services"
import { Appointments1708989564625 } from "./migrations/1708989564625-appointments"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "test",
    entities: [],
    migrations: [Roles1708989507982, Users1708989530865, Services1708989550470, Appointments1708989564625],
    synchronize: false,
    logging: false,
})