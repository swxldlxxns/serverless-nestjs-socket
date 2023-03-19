import { Inject, Injectable } from '@nestjs/common';
import { ApiGatewayManagementApi } from 'aws-sdk';

import { API_GATEWAY_MANAGEMENT_API } from '/opt/src/libs/shared/injectables';

const SERVICE_NAME = 'MessageService';

@Injectable()
export class MessageService {
  constructor(
    @Inject(API_GATEWAY_MANAGEMENT_API)
    private readonly _api: ApiGatewayManagementApi,
  ) {}

  async send(ConnectionId: string, Data: string): Promise<void> {
    console.log({
      SERVICE_NAME,
      params: {
        ConnectionId,
        Data,
      },
    });

    await this._api.postToConnection({ ConnectionId, Data }).promise();
  }
}
