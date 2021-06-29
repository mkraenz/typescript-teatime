import { Injectable } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

// don't provide port WebSocketGateWay() to run on same port as web app https://github.com/nestjs/nest/issues/126#issuecomment-341832752
@Injectable()
@WebSocketGateway()
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
