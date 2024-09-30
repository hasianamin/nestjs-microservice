import { NestFactory } from '@nestjs/core';
import { ConsumersModule } from './consumers.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ConsumersModule);

  const configService = app.get(ConfigService);

  const rabbitMqUrl = configService.get<string>('RABBITMQ_URL');
  const rabbitMqQueue = configService.get<string>('RABBITMQ_QUEUE');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitMqUrl],
      queue: rabbitMqQueue,
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3002);

  console.log(
    `Microservice is listening. Connected to RabbitMQ Queue: ${rabbitMqQueue}`,
  );
}

bootstrap();
