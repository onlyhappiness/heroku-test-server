import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'

import { Server, Socket } from 'socket.io'

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: /\/ws-.+/,
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string) {
    console.log('socket test:', data)
  }

  afterInit(server: any) {
    console.log('websocket server init')
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    console.log('connected: ', socket.id)
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('disconnected', socket.id)
  }
}
