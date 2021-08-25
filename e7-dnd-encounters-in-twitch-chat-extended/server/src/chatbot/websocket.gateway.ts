import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { IEvent } from '../domain/events';
import { BattleLogSubscriber, ChatbotService } from './chatbot.service';

interface ISubscribable {
  emitEvent: BattleLogSubscriber;
}

// don't provide port WebSocketGateWay() to run on same port as web app https://github.com/nestjs/nest/issues/126#issuecomment-341832752
@Injectable()
@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection, ISubscribable {
  // TODO add Socket io Socket type
  @WebSocketServer() private server!: {
    emit: (eventType: string, data?: any) => void;
  };

  constructor(private readonly chatbot: ChatbotService) {
    // TODO fix type
    chatbot.subscribeToLog(this.emitEvent.bind(this));
  }

  // TODO add Socket io Socket type
  handleConnection(client: any) {
    const log: IEvent[] = this.chatbot.battleLog || [];
    client.emit('init', log);
  }

  emitEvent(event: IEvent) {
    this.server.emit('append log', event);
  }
}
