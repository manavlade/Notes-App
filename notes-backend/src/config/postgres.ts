import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing in .env");
}

const sql = postgres(process.env.DATABASE_URL, {
    ssl: {
        rejectUnauthorized: false,
    },
});

export default sql;