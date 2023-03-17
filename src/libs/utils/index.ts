import { HttpStatus } from '@nestjs/common';
import { APIGatewayProxyResult } from 'aws-lambda';

export function formatResponse(
  SERVICE_NAME: string,
  statusCode: HttpStatus = HttpStatus.OK,
): APIGatewayProxyResult {
  console.info({ SERVICE_NAME, statusCode });
  return {
    statusCode,
    body: undefined,
  };
}

export function errorResponse(
  catchErrors,
  SERVICE_NAME: string,
  statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
): APIGatewayProxyResult {
  console.error({ SERVICE_NAME, catchErrors });
  return formatResponse(SERVICE_NAME, statusCode);
}
