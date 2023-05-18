import { NextApiRequest, NextApiResponse } from "next";
import { Application, MQApplicationMessage } from "@/lib/application";
import { RabbitMQService } from "@/lib/rabbit.service";
import { container } from "tsyringe";

interface ApplicationRequest extends NextApiRequest {
  body: Application
}



export default async function handler(req: ApplicationRequest, res: NextApiResponse) {
  const service = container.resolve<RabbitMQService>('RabbitMQService')
  // Form message
  const message: MQApplicationMessage = {
    from: 'info@bestbg.online',
    to: req.body.email,
    subject: `Заказ на гарантию по ФЗ-${req.body.law} от ${req.body.inn}`,
    body: `
    — Дата: ${new Date().toLocaleString('en-RU', { timeZone: 'UTC' })}
    — ФЗ ${req.body.law}
    — Тип гарантии ${req.body.type}
    — Cумма ${req.body.sum + ' руб'}
    — Кол-во дней ${req.body.period}
    — Аванс ${req.body.advance}
    — Банк ${req.body.bank}
    — Cтоимость ${req.body.bank_sum}
    `
  }

  // Send to MQ
  await service.sendToQueue(JSON.stringify(message)).then(() => {
  })

  // Return OK
  return res.status(200).send('Sended')
}
