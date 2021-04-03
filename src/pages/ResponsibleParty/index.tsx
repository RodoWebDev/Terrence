import React, { useEffect, useState } from 'react';
import Layout from 'layouts';
import { HomeCyclesContainer } from 'UI/Container';
import { Button } from 'UI/Button';
import * as api from 'api';
import Loading from 'components/loading';
import { useHistory } from 'react-router-dom';
import EnhancedTable from './table';
import { NotificationTitle } from 'pages/SuccessPage/styles';
import { FlexRow, FlexColumn } from 'components/Modals/styles';
import { CycleDetailsRightLabel } from './styles';
import Switch from '@material-ui/core/Switch';
import ChangeAnalysis from 'components/Modals/ChangeAnalysis';
import EditIcon from '@material-ui/icons/Edit';
import cloneDeep from 'clone-deep';
import AddIcon from '@material-ui/icons/Add';
import NewScope from 'components/Modals/NewScope';
import { useParams } from 'react-router-dom';
import SubmitForm from 'components/Modals/SubmitForm';

const ResponsibleParty = () => {
  const [loading, setLoading] = useState(false);
  const [openAnalysis, setOpenAnalysis] = useState(false);
  const [openNewScope, setOpenNewScope] = useState(false);
  const [openSubmitForm, setOpenSubmitForm] = useState(false);
  const [clientMode, setClientMode] = useState(false);
  const [newScopeCycleRange, setNewScopeCycleRange] = useState();
  const [cycleDetails, setCycleDetails] = useState();
  const [selectedSwitch, setSelectedSwitch] = useState({
    cycleRange: '', 
    variableName: '', 
    index: -1
  });
  const history = useHistory();
  const {cycleRpId} = useParams();
  
  const updateCycleDetails = async (data: any) => {
    var tempCycleDetails = cloneDeep(data);
    var apiData = [];
    apiData.push(tempCycleDetails[selectedSwitch.cycleRange][selectedSwitch.index]);
    try {
      const response = await api.cycleReport(apiData);
			if (response && response.data.success) {
        getCycleDetails();
        setOpenAnalysis(false);
			}
		} catch (err) {
      console.log("err =>", err);
		}
    // tempCycleDetails[selectedSwitch.cycleRange][selectedSwitch.index].isUpdated = true;
    // setCycleDetails(tempCycleDetails);
    // setOpenAnalysis(false);
  }

  const submit = async () => {
    var apiData = [];
    for(let i = 0; i<cycleDetails.finishInCycle.length; i++) {
      if (cycleDetails.finishInCycle[i].isUpdated) {
        apiData.push(cycleDetails.finishInCycle[i]);
      }
    }
    for(let i = 0; i<cycleDetails.startInCycle.length; i++) {
      if (cycleDetails.startInCycle[i].isUpdated) {
        apiData.push(cycleDetails.startInCycle[i]);
      }
    }
    for(let i = 0; i<cycleDetails.rollForward.length; i++) {
      if (cycleDetails.rollForward[i].isUpdated) {
        apiData.push(cycleDetails.rollForward[i]);
      }
    }
		try {
      const response = await api.cycleReport(apiData);
			if (response && response.data.success) {
        getCycleDetails();
        setOpenSubmitForm(true);
			}
		} catch (err) {
      console.log("err =>", err);
		}
  }

  const createNewOne = () => {
    getCycleDetails();
    setOpenNewScope(false);
  }

  const createNewScope = (cycleRange: string) => {
    setNewScopeCycleRange(cycleRange);
    setOpenNewScope(true);
  }

  const getCycleDetails = async () => {
		setLoading(true);
		try {
      const response = await api.getCycleDetails(cycleRpId);
			if (response && response.data.success) {
        setCycleDetails(response.data.result);
			}
			setLoading(false);
		} catch (err) {
      console.log("err =>", err);
      history.push('/');
			setLoading(false);
		}
	};

  useEffect(() => {
		var lastChar = cycleRpId[cycleRpId.length -1];
    if (lastChar === '+') {
      setClientMode(true);
    }
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycleRpId]);

  useEffect(() => {
		getCycleDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSwitchChange = (event: React.ChangeEvent<HTMLInputElement>, cycleRange: string, variableName: string, index: number) => {
    if (variableName === 'isStartDateSame' || variableName === 'isFinishDateSame') {
      var tempSelectedSwitch = {...selectedSwitch};
      tempSelectedSwitch.cycleRange = cycleRange;
      tempSelectedSwitch.variableName = variableName;
      tempSelectedSwitch.index = index;
      setSelectedSwitch(tempSelectedSwitch);
      setOpenAnalysis(true);
      return;
    }
    var temp = cloneDeep(cycleDetails);
    temp[cycleRange][index][variableName] = event.target.checked;
    temp[cycleRange][index].isUpdated = true;
    setCycleDetails(temp);
  }
  
  if (!cycleDetails) return <></>;
  
  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
      <HomeCyclesContainer>
        <NotificationTitle style={{marginTop: 14}}>Cycle Review -- Finish within the Cycle</NotificationTitle>
        <FlexRow>
          <EnhancedTable rows={cycleDetails.finishInCycle} />
          {!clientMode && <FlexColumn style={{width: 400, padding: '0 10px'}}>
          {cycleDetails.finishInCycle.length>0 &&  
            <>
              <FlexRow>
                <FlexColumn style={{flex: 1, padding: 5}}>
                  <CycleDetailsRightLabel>Did it Start On Time?</CycleDetailsRightLabel>
                  {cycleDetails.finishInCycle.map((cycle: any, index: number) => (
                    <Switch
                      size="small"
                      checked={cycle.isStartDateSame}
                      onChange={(event) => onSwitchChange(event, 'finishInCycle', 'isStartDateSame', index)}
                      key={'isStartDateSame' + cycle.id}
                      color="primary"
                      name="checkedB"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  ))}
                </FlexColumn>
                <FlexColumn style={{flex: 1, padding: 5}}>
                  <CycleDetailsRightLabel>Is Finish Date Still the Same?</CycleDetailsRightLabel>
                  {cycleDetails.finishInCycle.map((cycle: any, index: number) => (
                    <Switch
                      size="small"
                      checked={cycle.isFinishDateSame}
                      onChange={(event) => onSwitchChange(event, 'finishInCycle', 'isFinishDateSame', index)}
                      key={'isFinishDateSame' + cycle.id}
                      color="primary"
                      name="checkedB"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  ))} 
                </FlexColumn>
                <FlexColumn style={{flex: 1, padding: 5}}>
                  <CycleDetailsRightLabel>Scope the same?</CycleDetailsRightLabel>
                  {cycleDetails.finishInCycle.map((cycle: any, index: number) => (
                    <Switch
                      size="small"
                      checked={cycle.isScopeSame}
                      onChange={(event) => onSwitchChange(event, 'finishInCycle', 'isScopeSame', index)}
                      key={'isScopeSame' + cycle.id}
                      color="primary"
                      name="checkedB"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  ))} 
                </FlexColumn>
                <FlexColumn style={{padding: 5}}>
                  <CycleDetailsRightLabel />
                  {cycleDetails.finishInCycle.map((cycle: any, index: number) => (
                    cycle.isUpdated ? <EditIcon key={index} style={{height: 24}}/> : <p key={index} style={{height: 24}}/>
                  ))} 
                </FlexColumn>
              </FlexRow>
            </>}
            <FlexRow style={{alignItems: 'center', marginTop: 10}}>
              <AddIcon style={{background: '#EFCA43', borderRadius: '50%', marginRight: 10}} onClick={() => createNewScope('finishInCycle')} />Create new scope
            </FlexRow>
          </FlexColumn>}
        </FlexRow>
        <NotificationTitle style={{marginTop: 14}}>Cycle Review -- Start within the Cycle</NotificationTitle>
        <FlexRow >
          <EnhancedTable rows={cycleDetails.startInCycle} />
          {!clientMode && <FlexColumn style={{width: 400, padding: '0 10px'}}>
          {cycleDetails.startInCycle.length>0 &&  
            <>
              <FlexRow>
                <FlexColumn style={{flex: 1, padding: 5}}>
                  <CycleDetailsRightLabel>Did it Start On Time?</CycleDetailsRightLabel>
                  {cycleDetails.startInCycle.map((cycle: any, index: number) => (
                    <Switch
                      size="small"
                      checked={cycle.isStartDateSame}
                      onChange={(event) => onSwitchChange(event, 'startInCycle', 'isStartDateSame', index)}
                      key={'isStartDateSame' + cycle.id}
                      color="primary"
                      name="checkedB"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  ))}
                </FlexColumn>
                <FlexColumn style={{flex: 1, padding: 5}}>
                  <CycleDetailsRightLabel>Did it Finish On Time?</CycleDetailsRightLabel>
                  {cycleDetails.startInCycle.map((cycle: any, index: number) => (
                    <Switch
                      size="small"
                      checked={cycle.isFinishDateSame}
                      onChange={(event) => onSwitchChange(event, 'startInCycle', 'isFinishDateSame', index)}
                      key={'isFinishDateSame' + cycle.id}
                      color="primary"
                      name="checkedB"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  ))} 
                </FlexColumn>
                <FlexColumn style={{flex: 1, padding: 5}}>
                  <CycleDetailsRightLabel>Scope the same?</CycleDetailsRightLabel>
                  {cycleDetails.startInCycle.map((cycle: any, index: number) => (
                    <Switch
                      size="small"
                      checked={cycle.isScopeSame}
                      onChange={(event) => onSwitchChange(event, 'startInCycle', 'isScopeSame', index)}
                      key={'isScopeSame' + cycle.id}
                      color="primary"
                      name="checkedB"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  ))} 
                </FlexColumn>
                <FlexColumn style={{padding: 5}}>
                  <CycleDetailsRightLabel />
                  {cycleDetails.startInCycle.map((cycle: any, index: number) => (
                    cycle.isUpdated ? <EditIcon key={index} style={{height: 24}}/> : <p key={index} style={{height: 24}}/>
                  ))} 
                </FlexColumn>
              </FlexRow>              
            </>}
            <FlexRow style={{alignItems: 'center', marginTop: 10}}>
              <AddIcon style={{background: '#EFCA43', borderRadius: '50%', marginRight: 10}} onClick={() => createNewScope('startInCycle')} />Create new scope
            </FlexRow>
          </FlexColumn>}
        </FlexRow>
        <NotificationTitle style={{marginTop: 14}}>Cycle Roll Forward</NotificationTitle>
        <FlexRow>
          <EnhancedTable rows={cycleDetails.rollForward} />
          {!clientMode && <FlexColumn style={{width: 400, padding: '0 10px'}}>
            {cycleDetails.rollForward.length>0 &&  
            <>
              <FlexRow>
                <FlexColumn style={{flex: 1, padding: 5}}>
                  <CycleDetailsRightLabel>Start Date the same?</CycleDetailsRightLabel>
                  {cycleDetails.rollForward.map((cycle: any, index: number) => (
                    <Switch
                      size="small"
                      checked={cycle.isStartDateSame}
                      onChange={(event) => onSwitchChange(event, 'rollForward', 'isStartDateSame', index)}
                      key={'Start' + cycle.id}
                      color="primary"
                      name="checkedB"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  ))}
                </FlexColumn>
                <FlexColumn style={{flex: 1, padding: 5}}>
                  <CycleDetailsRightLabel>Duration the same?</CycleDetailsRightLabel>
                  {cycleDetails.rollForward.map((cycle: any, index: number) => (
                    <Switch
                      size="small"
                      checked={cycle.isDurationSame}
                      onChange={(event) => onSwitchChange(event, 'rollForward', 'isDurationSame', index)}
                      key={'isDurationSame' + cycle.id}
                      color="primary"
                      name="checkedB"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  ))} 
                </FlexColumn>
                <FlexColumn style={{flex: 1, padding: 5}}>
                  <CycleDetailsRightLabel>Relationships the same?</CycleDetailsRightLabel>
                  {cycleDetails.rollForward.map((cycle: any, index: number) => (
                    <Switch
                      size="small"
                      checked={cycle.isRelationshipSame}
                      onChange={(event) => onSwitchChange(event, 'rollForward', 'isRelationshipSame', index)}
                      key={'isRelationshipSame' + cycle.id}
                      color="primary"
                      name="checkedB"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  ))} 
                </FlexColumn>
                <FlexColumn style={{flex: 1, padding: 5}}>
                  <CycleDetailsRightLabel>Scope the same?</CycleDetailsRightLabel>
                  {cycleDetails.rollForward.map((cycle: any, index: number) => (
                    <Switch
                      size="small"
                      checked={cycle.isScopeSame}
                      onChange={(event) => onSwitchChange(event, 'rollForward', 'isScopeSame', index)}
                      key={'isScopeSame' + cycle.id}
                      color="primary"
                      name="checkedB"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  ))} 
                </FlexColumn>
                <FlexColumn style={{padding: 5}}>
                  <CycleDetailsRightLabel />
                  {cycleDetails.rollForward.map((cycle: any, index: number) => (
                    cycle.isUpdated ? <EditIcon key={index} style={{height: 24}}/> : <p key={index} style={{height: 24}}/>
                  ))} 
                </FlexColumn>
              </FlexRow>
            </>}
            <FlexRow style={{alignItems: 'center', marginTop: 10}}>
              <AddIcon style={{background: '#EFCA43', borderRadius: '50%', marginRight: 10}} onClick={() => createNewScope('rollForward')} />Create new scope
            </FlexRow>
          </FlexColumn>}
        </FlexRow>
        {!clientMode && <ChangeAnalysis open={openAnalysis} close={() => setOpenAnalysis(false)} cycleDetails={cycleDetails} selectedSwitch={selectedSwitch} setCycleDetails={updateCycleDetails}/>}
        {!clientMode && <NewScope open={openNewScope} close={() => setOpenNewScope(false)} type={newScopeCycleRange} cycleDetails={cycleDetails} cycleRpId={cycleRpId} createNewOne={createNewOne}/>}
        {!clientMode && <SubmitForm open={openSubmitForm} close={() => setOpenSubmitForm(false)} cycleRpId={cycleRpId} />}
      </HomeCyclesContainer>
      )}
      <Button className="bottom_button" onClick={submit}>{clientMode ? 'Return' : 'Submit'}</Button>
    </Layout>
  )
}

export default ResponsibleParty
