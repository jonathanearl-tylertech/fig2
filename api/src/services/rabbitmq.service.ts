import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import client, { Channel, Connection } from 'amqplib'

@Injectable()
export class RabbitMqService {
  connectionString: string;
  connection: Connection;
  channel: Channel;

  constructor(private configService: ConfigService) {
    const connectionString = this.configService.get<string>('RABBITMQ_URL');
    
    if(!connectionString)
      console.warn('RABBITMQ_URL not configured');
  }

  send = async (q: string, msg: string) => {
    if (!this.connection)
      this.connection = await client.connect(this.connectionString);

    if (!this.channel)
      this.channel = await this.connection.createChannel();

    this.channel.sendToQueue(q, Buffer.from(msg))
  }
}
