import Calculator from '@/components/calculator/calculator'
import Heading from '@/components/ui/heading'
import Subheading from '@/components/ui/subheading'

export default function Home() {

  return (
    <div className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col w-full'>
        <Heading>
          Банковские гарантии
        </Heading>
        <Heading>
          по выгодной цене
        </Heading>
        <Subheading>
          Расчёт стоимости и оформление с минималным количеством документов
        </Subheading>
      </div>
      <Calculator />

    </div>
  )
}
