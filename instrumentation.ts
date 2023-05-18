import 'reflect-metadata'
import { Lifecycle, container } from "tsyringe";
import { RabbitMQService } from "@/lib/rabbit.service";

export async function register() {
  container.registerInstance('RabbitMQService', new RabbitMQService())


  console.log('register')
  console.log(process.env.MQ_URI)
}
