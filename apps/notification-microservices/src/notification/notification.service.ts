import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { timeout } from 'rxjs';

@Injectable()
export class NotificationService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'notification_queue',
        queueOptions: { durable: false },
      },
    });
  }

  sendNotification(data: { identifier: string; text: string }) {
    this.client.emit('notification', data);
    return { message: 'notification send' };
  }

  getNotifications() {
    return this.client
      .send({ cmd: 'fetch-notifications' }, {})
      .pipe(timeout(15000));
  }
}
