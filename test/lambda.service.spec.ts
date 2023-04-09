import { Lambda } from '@aws-sdk/client-lambda';
import { Test, TestingModule } from '@nestjs/testing';

import { LambdaService } from '/opt/src/libs/services/lambda.service';
import { LAMBDA } from '/opt/src/libs/shared/injectables';

describe('LambdaService', () => {
  let lambda: Lambda;
  let service: LambdaService;

  beforeEach(async () => {
    global.console = require('console');
    const MODULE: TestingModule = await Test.createTestingModule({
      providers: [
        LambdaService,
        Lambda,
        {
          provide: LAMBDA,
          useValue: Lambda,
        },
      ],
    }).compile();

    service = MODULE.get<LambdaService>(LambdaService);
    lambda = MODULE.get<Lambda>(LAMBDA);
  });

  it('should invoke async', async () => {
    lambda.invoke = jest.fn().mockResolvedValue({});
    expect(
      await service.asyncInvoke({
        FunctionName: 'test',
        Payload: Buffer.from('test'),
      }),
    ).toEqual({});
  });
});
