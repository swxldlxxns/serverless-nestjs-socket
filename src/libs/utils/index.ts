import { HttpStatus, ValidationError } from '@nestjs/common';
import { APIGatewayProxyResult } from 'aws-lambda';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { isEmpty, isObject } from 'lodash';

export async function validateDto<T>(
  DTO: ClassConstructor<T>,
  param: object,
): Promise<T> {
  return plainToInstance(DTO, param, {
    excludeExtraneousValues: true,
  });
}

export async function errorsDto(data): Promise<ValidationError[]> {
  return await validate(<object>(<unknown>data));
}

export function isJsonString(str: any): boolean {
  try {
    return !isEmpty(str) && isObject(JSON.parse(str));
  } catch {
    return false;
  }
}

export function checkBody(body: any): object {
  return isJsonString(body) ? JSON.parse(body) : {};
}

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
