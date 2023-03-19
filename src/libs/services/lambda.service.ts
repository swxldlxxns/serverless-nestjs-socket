import { Inject, Injectable } from '@nestjs/common';
import { Lambda } from 'aws-sdk';

import { LAMBDA } from '/opt/src/libs/shared/injectables';
import { log } from '/opt/src/libs/utils';

const SERVICE_NAME = 'LambdaService';

@Injectable()
export class LambdaService {
  constructor(@Inject(LAMBDA) private readonly _lambda: Lambda) {}

  async asyncInvoke(params: Lambda.Types.InvokeAsyncRequest): Promise<void> {
    log('INFO', {
      SERVICE_NAME,
      params,
    });

    await this._lambda.invokeAsync(params).promise();
  }
}
