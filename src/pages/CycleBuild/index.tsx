import React, { useEffect, useState, useContext } from 'react';
import Layout from 'layouts';
import { HomeTitleLabel } from 'UI/Label';
import { HomeCyclesContainer } from 'UI/Container';
import { Button } from 'UI/Button';
import * as api from 'api';
import Loading from 'components/loading';
import { CycleContext } from 'contexts/CycleContext';
import { useHistory } from 'react-router-dom';
import { Manual } from 'components/Modals/styles';
import EnhancedTable from './table';

const CycleBuild = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [selected, setSelected] = React.useState<string[]>([]);
  const { newCycle, analysis, setAnalysis } = useContext(CycleContext);

  const sendRequest = async () => {
    var ids = [];
    for (var i=0; i<analysis.length; i++) {      
      ids.push(analysis[i].rpId);
    }
    try {
      const response = await api.sendNotifications(ids);
			if (!response.data.success) {
        alert(response.data.error);
			}
			setLoading(false);
		} catch (err) {
      console.log("err =>", err);
      history.push('/');
			setLoading(false);
		}
  }

  const postchanges = async () => {
    try {
      const response = await api.postChanges(newCycle?.id);
			if (response && response.data.success) {
        setAnalysis(response.data.result);
        history.push('/publish');
			}
			setLoading(false);
		} catch (err) {
      console.log("err =>", err);
      history.push('/');
			setLoading(false);
		}
  }

  const changeUserPersona = async () => {
    history.push('/notification');
  }

  const getCycleAnalysis = async () => {
		setLoading(true);
		try {
      const response = await api.getCycleAnalysis(newCycle?.id);
			if (response && response.data.success) {
        setAnalysis(response.data.result);
			}
			setLoading(false);
		} catch (err) {
      console.log("err =>", err);
      history.push('/');
			setLoading(false);
		}
	};

  useEffect(() => {
		getCycleAnalysis();
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!analysis) return <></>;

  var sendRequestPossibility = analysis.length !== selected.length || analysis.length === 0;
  var postPossibility = false;
  var posonaPossibility = false;
  var completeCount = 0;
  var withRPCount = 0;
  for (var i=0; i<analysis.length; i++) {
    if (analysis[i].cycleRpStatus === "Complete") {
      completeCount += 1;
    }
    if (analysis[i].cycleRpStatus === "WithRP") {
      withRPCount += 1;
    }
    if (!analysis[i].rpSlack || analysis[i].rpSlack === 'null') {
      sendRequestPossibility = true;
    }
  }
  if (completeCount === analysis.length && completeCount !== 0) {
    postPossibility = true;
  }
  if (withRPCount === analysis.length && withRPCount !== 0) {
    posonaPossibility = true;
  }
  
  return (
    <Layout newCycle={newCycle}>
      <HomeTitleLabel onClick={() => history.push('/')}><Manual>Analyst Workbench </Manual>{' > '}<Manual> Cycle Analysis</Manual></HomeTitleLabel>
      {loading ? (
        <Loading />
      ) : (
      <HomeCyclesContainer>
        <EnhancedTable rows={analysis} selected={selected} setSelected={setSelected}/>
      </HomeCyclesContainer>
      )}
      <Button disabled={sendRequestPossibility} className="bottom_button" onClick={sendRequest}>Send Request(s)</Button>
      <Button disabled={!postPossibility} className="bottom_post_button" onClick={postchanges}>Post Changes</Button>
      {posonaPossibility && <Button disabled={!posonaPossibility} className="bottom_posona_button" onClick={changeUserPersona}>Change to RP User Persona</Button>}
    </Layout>
  )
}

export default CycleBuild
