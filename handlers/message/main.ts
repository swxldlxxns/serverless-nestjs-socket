import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

import { AppModule } from '/opt/src/app.module';
import { AppService } from '/opt/src/app.service';
import { MessageRequestsDto } from '/opt/src/libs/request/message-requests.dto';
import { checkBody, errorsDto, validateDto } from '/opt/src/libs/utils';

const SERVICE_NAME = 'AppModule';

async function bootstrap(): Promise<INestApplicationContext> {
  return await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });
}

exports.handler = async function (
  event: APIGatewayEvent,
  context: Context,
): Promise<APIGatewayProxyResult> {
  console.info({ SERVICE_NAME, event, context });
  const app = await bootstrap();
  const appService = app.get(AppService);
  const param = await validateDto(MessageRequestsDto, checkBody(event.body));
  const errors = await errorsDto(param);
  if (errors.length) {
    console.error({ SERVICE_NAME, errors });
    return await appService.message(
      event.requestContext?.connectionId,
      'message error',
    );
  }
  return await appService.message(param.data.id, param.data.message);
};
