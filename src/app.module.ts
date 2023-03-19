import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { ApiGatewayManagementApi, Lambda } from 'aws-sdk';

import { AppService } from '/opt/src/app.service';
import config from '/opt/src/config';
import { LambdaService } from '/opt/src/libs/services/lambda.service';
import { MessageService } from '/opt/src/libs/services/message.service';
import {
  API_GATEWAY_MANAGEMENT_API,
  LAMBDA,
} from '/opt/src/libs/shared/injectables';

const apiVersion = 'latest';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
  ],
  providers: [
    AppService,
    LambdaService,
    MessageService,
    {
      provide: API_GATEWAY_MANAGEMENT_API,
      inject: [config.KEY],
      useFactory: ({ ws }: ConfigType<typeof config>) =>
        new ApiGatewayManagementApi({
          apiVersion,
          endpoint: `${ws}/socket`,
        }),
    },
    {
      provide: LAMBDA,
      useFactory: () =>
        new Lambda({
          apiVersion,
        }),
    },
  ],
})
export class AppModule {}
