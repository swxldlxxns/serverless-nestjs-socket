import { Inject, Injectable } from '@nestjs/common';
import { ApiGatewayManagementApi } from 'aws-sdk';

import { API_GATEWAY_MANAGEMENT_API } from '/opt/src/libs/shared/injectables';
import { log } from '/opt/src/libs/utils';

const SERVICE_NAME = 'MessageService';

@Injectable()
export class MessageService {
  constructor(
    @Inject(API_GATEWAY_MANAGEMENT_API)
    private readonly _api: ApiGatewayManagementApi,
  ) {}

  async send(ConnectionId: string, Data: string): Promise<void> {
    log('INFO', {
      SERVICE_NAME,
      params: {
        ConnectionId,
        Data,
      },
    });

    await this._api.postToConnection({ ConnectionId, Data }).promise();
  }
}
