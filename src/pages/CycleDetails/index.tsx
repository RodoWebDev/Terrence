import React, { useEffect, useState, useContext } from 'react';
import Layout from 'layouts';
import { HomeCyclesContainer } from 'UI/Container';
import { Button } from 'UI/Button';
import * as api from 'api';
import Loading from 'components/loading';
import { CycleContext } from 'contexts/CycleContext';
import { useHistory } from 'react-router-dom';
import EnhancedTable from './table';
import { Api } from 'utils/api';
import { NotificationTitle } from 'pages/NotificationSent/styles';

const CycleDetails = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [selected, setSelected] = React.useState<string[]>([]);
  const { newCycle, analysis, setAnalysis } = useContext(CycleContext);

  const submit = async () => {
    const promises = [];
    for (let i=0;i<analysis.length;i++) {
      promises.push(fetch(`${process.env.REACT_APP_API_SERVER}${Api.updateRpSlack}?rpId=${analysis[i].rpId}&slack=${analysis[i].rpSlack}`, {
        method: "POST"
      }));
    }
    try {
      const results = await Promise.all(promises);
      const jsonPromises: Promise<any>[] = [];
      results.forEach((result) => jsonPromises.push(result.json()));
      const jsonList = await Promise.all(jsonPromises);
      var tempAnalysis = [...analysis];
      for (let i=0; i<jsonList.length; i++) {
        if (jsonList[i].success) {
          tempAnalysis[i].cycleRpStatus = "With RP";
        }
      }
      setAnalysis(tempAnalysis);
      setSelected([]);
    } catch (err) {
      console.log(err.toString());
    }
  }

  const getCycleDetails = async () => {
		setLoading(true);
		try {
      const response = await api.getCycleDetails(newCycle?.id);
			if (response && response.data.success) {
        console.log('getCycleDetails =>', response.data.result);
			}
			setLoading(false);
		} catch (err) {
      console.log("err =>", err);
      history.push('/');
			setLoading(false);
		}
	};

  useEffect(() => {
		getCycleDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!analysis) return <></>;
 
  return (
    <Layout newCycle={newCycle}>
      {loading ? (
        <Loading />
      ) : (
      <HomeCyclesContainer>
        <NotificationTitle>Direct Message Slack</NotificationTitle>
        <EnhancedTable rows={analysis} selected={selected} setSelected={setSelected}/>
      </HomeCyclesContainer>
      )}
      <Button disabled={analysis.length !== selected.length || analysis.length === 0} className="bottom_button" onClick={submit}>Submit</Button>
    </Layout>
  )
}

export default CycleDetails
