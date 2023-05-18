import { FC, ReactNode, createContext, useState } from 'react';

interface CalculatorProviderProps {
  children: ReactNode,
  value: any[]
}

export const CalculatorContext = createContext<any[]>([]);

export const CalculatorProvider: FC<CalculatorProviderProps> = ({ children, value }) => {

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
};

export default CalculatorProvider;
