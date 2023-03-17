import { Injectable } from '@nestjs/common';
import { Lambda } from 'aws-sdk';

const SERVICE_NAME = 'LambdaService';
const lambda = new Lambda({
  apiVersion: 'latest',
});

@Injectable()
export class LambdaService {
  async asyncInvoke(params: Lambda.Types.InvokeAsyncRequest): Promise<void> {
    console.log({
      SERVICE_NAME,
      params,
    });

    await lambda.invokeAsync(params).promise();
  }
}
