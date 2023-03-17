import { Injectable } from '@nestjs/common';
import { APIGatewayProxyResult } from 'aws-lambda';

import { MessageInterface } from '/opt/src/libs/interfaces/request/message.interface';
import { LambdaService } from '/opt/src/libs/services/lambda.service';
import { MessageService } from '/opt/src/libs/services/message.service';
import { ENV_VARS } from '/opt/src/libs/shared/enviroments';
import { errorResponse, formatResponse } from '/opt/src/libs/utils';

const SERVICE_NAME = 'AppService';
const { lambda } = ENV_VARS;

@Injectable()
export class AppService {
  constructor(
    private readonly _messageService: MessageService,
    private readonly _lambdaService: LambdaService,
  ) {}

  async message(id: string, message: string): Promise<APIGatewayProxyResult> {
    try {
      await this._messageService.send(id, message);
      return formatResponse(SERVICE_NAME);
    } catch (e) {
      return errorResponse(e, SERVICE_NAME);
    }
  }

  async connect(id: string): Promise<APIGatewayProxyResult> {
    try {
      const message: MessageInterface = {
        action: 'message',
        data: { id, message: id },
      };
      await this._lambdaService.asyncInvoke({
        FunctionName: lambda.message,
        InvokeArgs: JSON.stringify({ body: JSON.stringify(message) }),
      });
      return formatResponse(SERVICE_NAME);
    } catch (e) {
      return errorResponse(e, SERVICE_NAME);
    }
  }
}
