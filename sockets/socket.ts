import socketIO from 'socket.io';
import { Socket } from 'socket.io';


export const desconectar = ( cliente: Socket ) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
}

// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {
        console.log('Mensaje recibido', payload);

        // Emite la misma propiedad que en el chat service
        io.emit('mensaje-nuevo', payload);
    });
}