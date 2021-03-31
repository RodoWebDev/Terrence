import React, { useState } from 'react';

interface CycleList {
  id: number;
  title: string;
  description: string;
  backgroundColor: string;
  icon: string;
}

interface ICycleContext {
  cycles: CycleList[];
  setCycles: (data: any) => void;
}

const CycleContext = React.createContext({
  cycles: [],
  setCycles: (data: any) => {},
} as ICycleContext);
export { CycleContext };

const CycleContextContainer = (props: any) => {
  /* eslint-disable-next-line */
  const [cycles, setCycles] = useState<CycleList[]>([]);

  return (
    <CycleContext.Provider
      value={{
        cycles: cycles,
        setCycles: setCycles
      }}
    >
      {props.children}
    </CycleContext.Provider>
  );
};

export default CycleContextContainer;
