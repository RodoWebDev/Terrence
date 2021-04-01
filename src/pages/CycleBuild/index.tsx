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
import { Api } from 'utils/api';
import Axios from 'axios';

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
    //   Axios({
    //     method: 'post',
    //     url: 'https://portops.s2shape.com/PortOps/sendNotifications',
    //     data: {ids: ids},
    //     headers: {
    //         'Content-Type': 'text/plain;charset=utf-8',
    //     },
    // }).then(function (response: any) {
    //     console.log(response);
    // }).catch(function (error: any) {
    //     console.log(error);
    // });

    var data = JSON.stringify([4,2,3]);

    Axios({
      method: 'post',
      url: 'https://portops.s2shape.com/PortOps/sendNotifications',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    })
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    
      /*
      const response = await api.sendNotifications(ids);
      
			if (response && response.data.success) {
        //go to success page
      }
      */
		} catch (err) {
      console.log("err =>", err);
      history.push('/');
    }
    // try {
    //   console.log('sendRequest =>', ids);
    //   const response: any = await fetch(`${process.env.REACT_APP_API_SERVER}${Api.sendNotifications()}`, {
    //     method: "POST",
    //     body: JSON.stringify(ids)
    //   })
    //     // api.sendNotifications([{data: ids}]);
		// 	if (response && response.data.success) {
    //     //go to success page
		// 	}
		// } catch (err) {
    //   console.log("err =>", err);
    //   // history.push('/');
		// }
    // const promises = [];
    // for (let i=0;i<analysis.length;i++) {
    //   promises.push(fetch(`${process.env.REACT_APP_API_SERVER}${Api.updateRpSlack()}?rpId=${analysis[i].rpId}&slack=${analysis[i].rpSlack}`, {
    //     method: "POST"
    //   }));
    // }
    // try {
    //   const results = await Promise.all(promises);
    //   const jsonPromises: Promise<any>[] = [];
    //   results.forEach((result) => jsonPromises.push(result.json()));
    //   const jsonList = await Promise.all(jsonPromises);
    //   var tempAnalysis = [...analysis];
    //   for (let i=0; i<jsonList.length; i++) {
    //     if (jsonList[i].success) {
    //       tempAnalysis[i].cycleRpStatus = "With RP";
    //     }
    //   }
    //   setAnalysis(tempAnalysis);
    //   setSelected([]);
    // } catch (err) {
    //   console.log(err.toString());
    // }
  }

  const postchanges = async () => {
    var ids = [];
    for (var i=0; i<analysis.length; i++) {      
      ids.push(analysis[i].rpId);
    }
    try {
      const response = await api.sendNotifications(ids);
			if (response && response.data.success) {
        //go to success page
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
      <Button disabled={analysis.length !== selected.length || analysis.length === 0} className="bottom_button" onClick={sendRequest}>Send Request(s)</Button>
      <Button disabled={!postPossibility} className="bottom_post_button" onClick={postchanges}>Post Changes</Button>
      {posonaPossibility && <Button disabled={!posonaPossibility} className="bottom_posona_button" onClick={changeUserPersona}>Change to RP User Persona</Button>}
    </Layout>
  )
}

export default CycleBuild
