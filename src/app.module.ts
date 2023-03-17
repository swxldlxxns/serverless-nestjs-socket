import { Module } from '@nestjs/common';

import { AppService } from '/opt/src/app.service';

@Module({
  providers: [AppService],
})
export class AppModule {}
