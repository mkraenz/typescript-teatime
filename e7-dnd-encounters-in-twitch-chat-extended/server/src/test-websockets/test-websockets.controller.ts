import { Body, Controller, Post } from '@nestjs/common';
import { WebsocketGateway } from '../chatbot/websocket.gateway';

@Controller('test-websockets')
export class TestWebsocketsController {
  constructor(private ws: WebsocketGateway) {}

  /**
   * This controller/route is only included when enabling it via env vars.
   * intentionally used `any` for typing the event to allow freedom when
   * sending test events to the connected websocket client.
   */
  @Post()
  public emitTestEvent(@Body() event: any) {
    this.ws.emitEvent(event);
  }
}
