import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from '/opt/src/app.service';
import { LambdaService } from '/opt/src/libs/services/lambda.service';
import { MessageService } from '/opt/src/libs/services/message.service';
import { errorResponse, formatResponse } from '/opt/src/libs/utils';

const SERVICE_NAME = 'AppService';

describe('AppService', () => {
  let service: AppService;
  let messageService: MessageService;
  let lambdaService: LambdaService;

  beforeEach(async () => {
    global.console = require('console');
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService, MessageService, LambdaService],
    }).compile();
    service = module.get<AppService>(AppService);
    messageService = module.get<MessageService>(MessageService);
    lambdaService = module.get<LambdaService>(LambdaService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should send message', async () => {
    jest
      .spyOn(messageService, 'send')
      .mockImplementation(async (): Promise<void> => null);
    expect(await service.message('1', 'test')).toEqual(
      formatResponse(SERVICE_NAME),
    );
  });

  it('should return error', async () => {
    jest
      .spyOn(messageService, 'send')
      .mockRejectedValue(new Error('Test Error'));
    expect(await service.message('1', 'test')).toEqual(
      errorResponse(
        {
          message: 'Test Error',
        },
        SERVICE_NAME,
      ),
    );
  });

  it('should return connection', async () => {
    jest
      .spyOn(lambdaService, 'asyncInvoke')
      .mockImplementation(async (): Promise<void> => null);
    expect(await service.connect('1')).toEqual(formatResponse(SERVICE_NAME));
  });

  it('should return error connection', async () => {
    jest
      .spyOn(lambdaService, 'asyncInvoke')
      .mockRejectedValue(new Error('Test Error'));
    expect(await service.connect('1')).toEqual(
      errorResponse(
        {
          message: 'Test Error',
        },
        SERVICE_NAME,
      ),
    );
  });
});
