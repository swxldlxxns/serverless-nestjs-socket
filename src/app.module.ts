import { Module } from '@nestjs/common';

import { AppService } from '/opt/src/app.service';
import { LambdaService } from '/opt/src/libs/services/lambda.service';
import { MessageService } from '/opt/src/libs/services/message.service';

@Module({
  providers: [AppService, MessageService, LambdaService],
})
export class AppModule {}
