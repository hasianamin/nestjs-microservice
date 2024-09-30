import { IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  readonly identifier: string;

  @IsString()
  readonly deviceId: string;

  @IsString()
  readonly text: string;
}
