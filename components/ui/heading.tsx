import type { ReactNode } from 'react'

interface HeadingProps {
  children: ReactNode
}

const Heading: React.FC<HeadingProps> = ({
  children,
}) => {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  )
}

export default Heading
