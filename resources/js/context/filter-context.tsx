import { createContext, useContext, useState } from 'react';

export const FilterContext = createContext({
    date: null,
    peopleAmount: 1,    
    setParams: (_: any) => {}
});

export function FilterProvider({ children }: { children: React.ReactNode }) {
     const [params, setParams] = useState({
            date: null,
            peopleAmount: 1
    });
    return (
        <FilterContext.Provider value={{ ...params, setParams }}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}