import React, { useEffect, useState, useContext } from 'react';
import Layout from 'layouts';
import { HomeTitleLabel } from 'UI/Label';
import { HomeCyclesContainer } from 'UI/Container';
import Cycle from 'components/cycle';
import { Button } from 'UI/Button';
import * as api from 'api';
import Loading from 'components/loading';
import AddCycle from 'components/Modals/AddCycle';
import { CycleContext } from 'contexts/CycleContext';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [addCycleOpen, setAddCycleOpen] = useState(false);
  const { cycles, setCycles } = useContext(CycleContext);

  const getPortOps = async () => {
		setLoading(true);
		try {
      const response = await api.getPortOps();
			if (response && response.data.success) {
        setCycles(response.data.result);
			}
			setLoading(false);
		} catch (err) {
			console.log("err =>", err);
			setLoading(false);
		}
	};

  useEffect(() => {
		getPortOps();
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Layout>
      <HomeTitleLabel>Cycle Reporting</HomeTitleLabel>
      {loading ? (
        <Loading />
      ) : (
      <HomeCyclesContainer>
      {cycles.map((cycle => (
        <Cycle key={cycle.id} data={{...cycle}} />
      )))}
      </HomeCyclesContainer>
      )}
      <Button onClick={() => setAddCycleOpen(true)}>Analyze a new cycle</Button>
      <AddCycle open={addCycleOpen} close={() => setAddCycleOpen(false)}/>
    </Layout>
  )
}

export default Home
