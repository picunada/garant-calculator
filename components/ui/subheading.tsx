import type { ReactNode } from 'react'

interface SubheadingProps {
  children: ReactNode
}

const Subheading: React.FC<SubheadingProps> = ({
  children,
}) => {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-neutral-400">
      {children}
    </h4>
  )
}

export default Subheading
