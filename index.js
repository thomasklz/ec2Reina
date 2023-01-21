import { PORT } from './config/config.js';
import { app, io, server } from './app.js';
import { sequelize } from './utils/db.js';


const _PORT = PORT || 3000;

const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Base de datos conectada.');
        await sequelize.sync({ force: false })

        /* io.on('connection', (socket) => {
            const idHandShake = socket.id;
            const { candidata_id } = socket.handshake.query;
            console.log(`hola dispositivo: ${idHandShake}-${candidata_id}`);
            
            socket.on("ping", (datos) => {
                console.log(`reciviendo: ${datos}`);
                socket.emit("event", datos);
            });

        }); */
        server.listen(3000, () => {
            console.log("socket corriendo en el puerto =>", 3000);
        })

        app.listen(_PORT, () => {
            console.log(`Servidor corriendo en el puerto => ${_PORT}`);
        });
    } catch (error) {
        console.log(`Error ${error}`);
    }
}

main();

