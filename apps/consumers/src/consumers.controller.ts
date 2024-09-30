import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entitiy/notification';
import admin from './firebase';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller()
export class ConsumersController {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  @EventPattern('notification')
  async handleNotification(@Payload() message: CreateNotificationDto) {
    console.log('Notification received:', message);

    const firebaseMessage = {
      notification: {
        title: 'New Notification',
        body: message.text,
      },
      token: message.deviceId,
    };

    let isSuccess = false;

    try {
      const response = await admin.messaging().send(firebaseMessage);
      console.log('Successfully sent push notification:', response);
      isSuccess = true;
    } catch (error) {
      console.error('Error sending push notification:', error);
    }

    const notification = this.notificationRepository.create({
      identifier: message.identifier,
      text: message.text,
      isSuccess,
    });

    await this.notificationRepository.save(notification);
    console.log('Notification saved to the database:', notification);
  }
}
