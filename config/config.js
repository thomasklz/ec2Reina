import * as dotenv from 'dotenv';
dotenv.config();

export const DB_CONNECTION = process.env.DB_CONNECTION;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const PORT = process.env.PORT;

export const CLOUD_NAME = process.env.CLOUD_NAME;
export const API_KEY = process.env.API_KEY;
export const API_SECRET = process.env.API_SECRET;
export const MAX_SIZE_UPLOAD = process.env.MAX_SIZE_UPLOAD;
