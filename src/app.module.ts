import { Module } from '@nestjs/common';

import { AppService } from '/opt/src/app.service';
import { MessageService } from '/opt/src/libs/services/message.service';

@Module({
  providers: [AppService, MessageService],
})
export class AppModule {}
