import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APIGatewayProxyResult } from 'aws-lambda';

import { EnvironmentInterface } from '/opt/src/libs/interfaces/environment.interface';
import { MessageInterface } from '/opt/src/libs/interfaces/requests.interface';
import { LambdaService } from '/opt/src/libs/services/lambda.service';
import { MessageService } from '/opt/src/libs/services/message.service';
import { errorResponse, formatResponse } from '/opt/src/libs/utils';

const SERVICE_NAME = 'AppService';

@Injectable()
export class AppService {
  private readonly _lambdaMessage: string;

  constructor(
    private readonly _messageService: MessageService,
    private readonly _lambdaService: LambdaService,
    private readonly _configService: ConfigService,
  ) {
    const {
      lambda: { message },
    }: EnvironmentInterface =
      this._configService.get<EnvironmentInterface>('config');

    this._lambdaMessage = message;
  }

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
        FunctionName: this._lambdaMessage,
        Payload: Buffer.from(JSON.stringify({ body: JSON.stringify(message) })),
      });

      return formatResponse(SERVICE_NAME);
    } catch (e) {
      return errorResponse(e, SERVICE_NAME);
    }
  }
}
