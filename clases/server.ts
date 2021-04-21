import express from 'express'
import { SERVER_PORT } from '../global/environment';

//se grega default para que sea el paquete por defecto
//que se importa cuando se mande llamar este archivo

export default class Server{
    public app: express.Application;
    public port: number;

    constructor(){
        this.app = express();
        this.port = SERVER_PORT;
    }

    start( callback: Function ){
        this.app.listen(this.port, callback);
    }
}