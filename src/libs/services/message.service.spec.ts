import { Test, TestingModule } from '@nestjs/testing';
import * as AWS from 'aws-sdk';

import { MessageService } from '/opt/src/libs/services/message.service';

describe('MessageService', () => {
  const api = Object.getPrototypeOf(new AWS.ApiGatewayManagementApi());
  let service: MessageService;

  beforeEach(async () => {
    global.console = require('console');
    const MODULE: TestingModule = await Test.createTestingModule({
      providers: [MessageService],
    }).compile();
    service = MODULE.get<MessageService>(MessageService);
  });

  it('should invoke async', async () => {
    jest.spyOn(api, 'postToConnection').mockReturnValue({
      promise: () => null,
    });
    expect(await service.send('1', 'test')).toBeUndefined();
  });
});
