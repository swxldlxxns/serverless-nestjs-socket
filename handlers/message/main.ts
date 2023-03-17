import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

import { AppModule } from '/opt/src/app.module';
import { AppService } from '/opt/src/app.service';

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
  return await appService.message(
    event.body,
    event.requestContext.connectionId,
  );
};
