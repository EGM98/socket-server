import express from 'express'
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';

//se grega default para que sea el paquete por defecto
//que se importa cuando se mande llamar este archivo

export default class Server{

    private static _instance: Server;
    // Servidor
    public app: express.Application;
    public port: number;

    // Propiedad encargada de emitir y escuchar eventos
    public io: socketIO.Server;
    // este será el servidor que se levante
    private httpServer: http.Server;

    // EL patrón sibngleton sirve para evitar que se cree
    // más de una instancia del servidor

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        // Scoket y express no son compatibles entre si
        // así que se necesita de un intermediario (http)

        // Express levanta un servidro http, por eso es
        // compatible con http

        this.httpServer = new http.Server( this.app );
        // this.io = socketIO( this.httpServer );
        this.io=require("socket.io")(this.httpServer, {
            cors: {
                origin: true,
                credentials: true
              },            
          });

        this.escucharSockets();
    }

    // static quiere decir que puedo llamrlo haciendo 
    // referencia la clase (Clase.algoEStatico)

    public static get instance(){
        // si ya existe una instancia entonces llama a esa instancia
        // si no existe entonces la crea
        return this._instance || ( this._instance = new this() );
    }

    private escucharSockets(){
        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {
            console.log('Cliente conectado');

            //Mensajes
            socket.mensaje(cliente, this.io);
            
            // Desconetar
            socket.desconectar(cliente);
        });
    }

    start( callback: Function ) {
        this.httpServer.listen(this.port, callback);
    }
}