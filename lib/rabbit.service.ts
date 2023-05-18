
import amqp, { Connection, Channel } from 'amqplib'
import { singleton } from 'tsyringe'

@singleton()
export class RabbitMQService {
  private connection: Connection
  private channel: Channel
  private queueName = 'sendmail'

  constructor() {
    this.setupSerivce()

  }

  private async setupSerivce() {
    this.connection = await amqp.connect(process.env.MQ_URI as string)
    console.log('connected')
    this.channel = await this.connection.createChannel()

    await this.channel.assertQueue(this.queueName, {
      durable: true
    })
  }

  public async sendToQueue(message: string) {
    this.channel.sendToQueue(this.queueName, Buffer.from(message), {
      persistent: true,
    });
  }
}

