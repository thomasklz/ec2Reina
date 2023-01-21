import express from "express";
import cors from "cors";
import morgan from "morgan";

import fileUpload from "express-fileupload";
import { MAX_SIZE_UPLOAD } from "./config/config.js";

import routePersona from './routes/persona.js';
import routeCandidata from './routes/candidata.js';
import routeJurado from './routes/jurado.js';
import routeParametro from './routes/parametro.js';
import routeCalificacion from './routes/calificacion.js';
import routeFoto from './routes/foto.js';
import routeResultado from './routes/resultado.js';

import { Server as SocketServer} from "socket.io";
import http from 'http';


export const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
    limits: { fileSize: MAX_SIZE_UPLOAD * 1024 * 1024 },
    abortOnLimit: true,
    responseOnLimit: 'archivo demasiado grande',
    createParentPath: true
}));
app.use('/api', routePersona);
app.use('/api', routeCandidata);
app.use('/api', routeJurado);
app.use('/api', routeParametro);
app.use('/api', routeCalificacion);
app.use('/api', routeFoto);
app.use('/api', routeResultado);

export const server  = http.createServer(app);
export const io = new SocketServer(server,{
    cors: {
        origin: "http://localhost:4200",
        credentials: true
    }
});
