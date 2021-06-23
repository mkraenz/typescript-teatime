import { Injectable } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@Injectable()
@WebSocketGateway(3001)
export class WebsocketGateway {
  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    console.log(data);
    return data;
  }

  @SubscribeMessage('initialSync')
  initialSyncClientToServer() {
    return { gameloghere: 'blabla' };
  }
}

// client connects to server
// client sends initialSync (request)
// server responds initial game log
// server sends new game log events
