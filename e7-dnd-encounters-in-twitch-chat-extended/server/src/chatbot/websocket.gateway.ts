import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { IEvent } from '../domain/events';
import { ChatbotService } from './chatbot.service';

// don't provide port WebSocketGateWay() to run on same port as web app https://github.com/nestjs/nest/issues/126#issuecomment-341832752
@Injectable()
@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection {
  // TODO add Socket io Socket type
  @WebSocketServer() private server!: { emit: Function };

  constructor(private readonly chatbot: ChatbotService) {
    // TODO fix type
    chatbot.subscribeToLog(
      (this.appendLogs.bind(this) as unknown) as (logs: IEvent[]) => void,
    );
  }

  // TODO add Socket io Socket type
  handleConnection(client: any) {
    const log: IEvent[] = this.chatbot.battleLog || [];
    client.emit('init', log);
  }

  appendLogs(logs: IEvent[]) {
    console.log('loglength', logs.length);
    this.server.emit('append logs', [...logs]);
  }
}
