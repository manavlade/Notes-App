// import "dotenv/config";
// import {Pool} from "pg";

// const POSTGRES_HOST = process.env.POSTGRES_HOST;
// const POSTGRES_PORT = process.env.POSTGRES_PORT;
// const POSTGRES_USER = process.env.POSTGRES_USER;
// const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
// const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE;


// const reequiredEnvVars = [
//     'POSTGRES_HOST',
//     'POSTGRES_PORT',
//     'POSTGRES_USER',
//     'POSTGRES_PASSWORD',
//     'POSTGRES_DATABASE'
// ];
// const missingValues = reequiredEnvVars.filter((key) => !process.env[key]);

// if (missingValues.length > 0) {
//     console.error("Error: Missing required environment variables:", missingValues);
//     process.exit(1);
// }

// const pool = new Pool({
//     host: POSTGRES_HOST,
//     port: Number(POSTGRES_PORT),
//     user: POSTGRES_USER,
//     password: "[PASSWORD]",
//     database: POSTGRES_DATABASE
// })

// export default pool;

import postgres from "postgres";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing in .env");
}

const sql = postgres(process.env.DATABASE_URL, {
    ssl: {
        rejectUnauthorized: false,
    },
});

export default sql;