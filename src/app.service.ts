import { Injectable } from '@nestjs/common';
import { APIGatewayProxyResult } from 'aws-lambda';
import { ApiGatewayManagementApi } from 'aws-sdk';

import { ENV_VARS } from '/opt/src/libs/shared/enviroments';
import { errorResponse, formatResponse } from '/opt/src/libs/utils';

const SERVICE_NAME = 'AppService';
const { ws } = ENV_VARS;
const api = new ApiGatewayManagementApi({
  endpoint: `wss://${ws}/socket`,
  apiVersion: 'latest',
});

@Injectable()
export class AppService {
  async handler(
    ConnectionId?: string,
    Data = 'hi',
  ): Promise<APIGatewayProxyResult> {
    try {
      console.info(`${ws}/socket`);
      await api.postToConnection({ ConnectionId, Data }).promise();
      return formatResponse(SERVICE_NAME);
    } catch (e) {
      return errorResponse(e, SERVICE_NAME);
    }
  }
}
