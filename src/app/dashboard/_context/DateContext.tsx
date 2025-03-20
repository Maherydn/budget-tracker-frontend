import React, { createContext, useState, useContext, ReactNode } from 'react';

interface DateContextType {
  year: number;
  month: number;
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
}

const DateContext = createContext<DateContextType | undefined>(undefined);

interface DateContextProviderProps {
  children: ReactNode;
}

export const DateContextProvider: React.FC<DateContextProviderProps> = ({ children }) => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth()); 

  return (
    <DateContext.Provider value={{ year, month, setYear, setMonth }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = (): DateContextType => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDateContext must be used within a DateContextProvider");
  }
  return context;
};
