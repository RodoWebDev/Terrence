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

  console.log('analysis =>', analysis);
  // const datas = [
  //   {
  //     cycleRpId: 33,
  //     cycleRpStatus: "NotSent",
  //     goals: null,
  //     rpId: 4,
  //     rpName: "Adam Vigiano",
  //     rpSlack: null,
  //     story: null,
  //     totalItemToFinish: 0,
  //     totalItemToStart: 0,
  //     updateRequestsSent: 0
  //   },
  //   {
  //     cycleRpId: 32,
  //     cycleRpStatus: "With RP",
  //     goals: null,
  //     rpId: 2,
  //     rpName: "Dirk Shaw",
  //     rpSlack: null,
  //     story: null,
  //     totalItemToFinish: 0,
  //     totalItemToStart: 0,
  //     updateRequestsSent: 0
  //   },
  //   {
  //     cycleRpId: 34,
  //     cycleRpStatus: "Complete",
  //     goals: null,
  //     rpId: 3,
  //     rpName: "Reuben Vandeventer",
  //     rpSlack: null,
  //     story: null,
  //     totalItemToFinish: 0,
  //     totalItemToStart: 0,
  //     updateRequestsSent: 0
  //   }
  // ];

  console.log('selected =>', selected);

  const sendRequest = async () => {

  }

  const postchanges = async () => {

  }

  const changeUserPersona = async () => {
    history.push('/notification');
  }

  const getPortOps = async () => {
		setLoading(true);
		try {
      const response = await api.getCycleAnalysis(newCycle?.id);
			if (response && response.data.success) {
        setAnalysis(response.data.result);
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

  if (!analysis) return <></>;

  var postPossibility = false;
  var posonaPossibility = false;
  var completeCount = 0;
  var withRPCount = 0;
  for (var i=0; i<analysis.length; i++) {
    if (analysis[i].cycleRpStatus === "Complete") {
      completeCount += 1;
    }
    if (analysis[i].cycleRpStatus === "With RP") {
      withRPCount += 1;
    }
  }
  if (completeCount === analysis.length) {
    postPossibility = true;
  }
  if (withRPCount === analysis.length) {
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
      <Button disabled={analysis.length !== selected.length} className="bottom_button" onClick={sendRequest}>Send Request(s)</Button>
      <Button disabled={!postPossibility} className="bottom_post_button" onClick={postchanges}>Post Changes</Button>
      <Button className="bottom_posona_button" onClick={changeUserPersona}>Change to RP User Persona</Button>
      {posonaPossibility && <Button disabled={!posonaPossibility} className="bottom_posona_button" onClick={changeUserPersona}>Change to RP User Persona</Button>}
    </Layout>
  )
}

export default CycleBuild
