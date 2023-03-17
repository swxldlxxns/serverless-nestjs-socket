import { Test, TestingModule } from '@nestjs/testing';
import * as AWS from 'aws-sdk';

import { LambdaService } from '/opt/src/libs/services/lambda.service';

describe('LambdaService', () => {
  const lambda = Object.getPrototypeOf(new AWS.Lambda());
  let service: LambdaService;

  beforeEach(async () => {
    global.console = require('console');
    const MODULE: TestingModule = await Test.createTestingModule({
      providers: [LambdaService],
    }).compile();
    service = MODULE.get<LambdaService>(LambdaService);
  });

  it('should invoke async', async () => {
    jest.spyOn(lambda, 'invokeAsync').mockReturnValue({
      promise: () => null,
    });
    expect(
      await service.asyncInvoke({ FunctionName: 'test', InvokeArgs: 'test' }),
    ).toBeUndefined();
  });
});
