import { Expose, Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

import { ActionEnum } from '/opt/src/libs/enums/action.enums';

export class MessageDataRequestsDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly message: string;
}

export class MessageRequestsDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(ActionEnum)
  @Expose()
  readonly action: ActionEnum;

  @IsObject()
  @ValidateNested()
  @Type(() => MessageDataRequestsDto)
  @Expose()
  readonly data: MessageDataRequestsDto;
}
