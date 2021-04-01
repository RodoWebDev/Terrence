import React, { useState } from 'react';

interface Cycle {
  id: number;
  cycleStartDate: string;
  cycleEndDate: string;
  onTimeStart: number;
  onTimeFinish: number;
  daysLost: number;
  throughput: number;
}

interface Analysis {
  cycleRpId: number;
  rpId: number;
  rpName: string;
  rpSlack: string;
  totalItemToStart: number;
  totalItemToFinish: number;
  updateRequestsSent: number;
  cycleRpStatus: string;
  story: string;
  goals: string;
}

interface ICycleContext {
  cycles: Cycle[];
  newCycle: Cycle | null;
  analysis: Analysis[];
  setCycles: (data: any) => void;
  setNewCycle: (data: Cycle) => void;
  setAnalysis: (data: Analysis[]) => void;
}

const CycleContext = React.createContext({
  cycles: [],
  newCycle: null,
  analysis: [],
  setCycles: (data: any) => {},
  setNewCycle: (data: Cycle) => {},
  setAnalysis: (data: Analysis[]) => {},
} as ICycleContext);
export { CycleContext };

const CycleContextContainer = (props: any) => {
  /* eslint-disable-next-line */
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [newCycle, setNewCycle] = useState();
  const [analysis, setAnalysis] = useState();

  return (
    <CycleContext.Provider
      value={{
        cycles: cycles,
        newCycle: newCycle,
        analysis: analysis,
        setCycles: setCycles,
        setNewCycle: setNewCycle,
        setAnalysis: setAnalysis
      }}
    >
      {props.children}
    </CycleContext.Provider>
  );
};

export default CycleContextContainer;
