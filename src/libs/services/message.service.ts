import { Injectable } from '@nestjs/common';
import { ApiGatewayManagementApi } from 'aws-sdk';

import { ENV_VARS } from '/opt/src/libs/shared/enviroments';

const SERVICE_NAME = 'MessageService';
const { ws } = ENV_VARS;
const api = new ApiGatewayManagementApi({
  endpoint: `${ws}/socket`,
  apiVersion: 'latest',
});

@Injectable()
export class MessageService {
  async send(ConnectionId: string, Data: string): Promise<void> {
    console.log({
      SERVICE_NAME,
      params: {
        ConnectionId,
        Data,
      },
    });

    await api.postToConnection({ ConnectionId, Data }).promise();
  }
}
