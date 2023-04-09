import { Test, TestingModule } from '@nestjs/testing';
import { ApiGatewayManagementApi } from 'aws-sdk';

import { MessageService } from '/opt/src/libs/services/message.service';
import { API_GATEWAY_MANAGEMENT_API } from '/opt/src/libs/shared/injectables';

describe('MessageService', () => {
  let api: ApiGatewayManagementApi;
  let service: MessageService;

  beforeEach(async () => {
    global.console = require('console');
    const MODULE: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        ApiGatewayManagementApi,
        {
          provide: API_GATEWAY_MANAGEMENT_API,
          useValue: ApiGatewayManagementApi,
        },
      ],
    }).compile();

    service = MODULE.get<MessageService>(MessageService);
    api = MODULE.get<ApiGatewayManagementApi>(API_GATEWAY_MANAGEMENT_API);
  });

  it('should invoke async', async () => {
    api.postToConnection = jest.fn().mockImplementation(() => ({
      promise: jest.fn().mockResolvedValue(null),
    }));
    expect(await service.send('1', 'test')).toBeUndefined();
  });
});
