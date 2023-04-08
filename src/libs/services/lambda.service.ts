import { Lambda } from '@aws-sdk/client-lambda';
import { InvokeCommandInput } from '@aws-sdk/client-lambda/dist-types/commands/InvokeCommand';
import { Inject, Injectable } from '@nestjs/common';

import { LAMBDA } from '/opt/src/libs/shared/injectables';
import { log } from '/opt/src/libs/utils';

const SERVICE_NAME = 'LambdaService';

@Injectable()
export class LambdaService {
  constructor(@Inject(LAMBDA) private readonly _lambda: Lambda) {}

  async asyncInvoke(params: InvokeCommandInput): Promise<void> {
    log('INFO', {
      SERVICE_NAME,
      params: {
        ...params,
        Payload: params.Payload.toString(),
      },
    });

    await this._lambda.invoke({ ...params, InvocationType: 'Event' });
  }
}
