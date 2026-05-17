import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

export const connectionConfig = {
  host: process.env.DB_HOST ?? 'localhost',
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: 'StreamingDB_Payments',
  port: Number(process.env.DB_PORT) ?? 3306
}

export const pool = mysql.createPool(connectionConfig)
