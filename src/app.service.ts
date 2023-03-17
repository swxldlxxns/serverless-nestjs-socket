import { Injectable } from '@nestjs/common';
import { APIGatewayProxyResult } from 'aws-lambda';

import { MessageRequestsDto } from '/opt/src/libs/request/message-requests.dto';
import { MessageService } from '/opt/src/libs/services/message.service';
import {
  checkBody,
  errorResponse,
  errorsDto,
  formatResponse,
  validateDto,
} from '/opt/src/libs/utils';

const SERVICE_NAME = 'AppService';

@Injectable()
export class AppService {
  constructor(private readonly _messageService: MessageService) {}

  async message(request: any, id?: string): Promise<APIGatewayProxyResult> {
    try {
      const param = await validateDto(MessageRequestsDto, checkBody(request));
      const errors = await errorsDto(param);

      if (errors.length) await this._messageService.send(id, 'message error');
      else await this._messageService.send(param.data.id, param.data.message);
      return formatResponse(SERVICE_NAME);
    } catch (e) {
      return errorResponse(e, SERVICE_NAME);
    }
  }
}
