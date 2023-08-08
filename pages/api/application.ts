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
    to: 'info@bestbg.online',
    subject: `Заказ на гарантию по ФЗ-${req.body.law} от ${req.body.inn}`,
    body: `
    - Имя: ${req.body.name}\n
    ${req.body.phone ? '' : ' { - Номер телефона: ${ req.body.phone }'}\n
    — Дата: ${new Date().toLocaleString('en-RU', { timeZone: 'UTC' })}\n
    — ФЗ ${req.body.law}\n
    — Тип гарантии ${req.body.type}\n
    — Cумма ${req.body.sum + ' руб'}\n
    — Кол - во дней ${req.body.period}\n
    — Аванс ${req.body.advance}\n
    — Банк ${req.body.bank}\n
    — Cтоимость ${req.body.bank_sum}\n
    - Email ${req.body.email}\n
  `
  }

  // Send to MQ
  await service.sendToQueue(JSON.stringify(message)).then(() => {
  })

  // Return OK
  return res.status(200).send('Sended')
}
