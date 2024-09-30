import { Controller, Post, Body, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  sendNotification(@Body() data: CreateNotificationDto) {
    return this.notificationService.sendNotification(data);
  }

  @Get()
  getNotifications() {
    return this.notificationService.getNotifications();
  }
}
