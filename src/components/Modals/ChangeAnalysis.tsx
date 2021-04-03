import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Button } from 'UI/Button';
import { Title, FlexRow, SubTitle, SubDesc } from './styles';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import moment from 'moment';
import cloneDeep from 'clone-deep';
import { InputBox } from 'UI/Input';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: 200,
      '& .MuiInputLabel-root': {
        fontSize: 16,
	      lineHeight: '150%'
      }
    },
  }),
);

export const ChangeAnalysis = (props: any) => {
  const { open, close, cycleDetails, selectedSwitch, setCycleDetails } = props;
  const classes = useStyles();
  const [details, setDetails] = useState();
  
  const onDateChanged = (event: any) => {
    var tempCycleDetails = cloneDeep(details);
    tempCycleDetails[selectedSwitch.cycleRange][selectedSwitch.index][event.target.name] = event.target.value;
    setDetails(tempCycleDetails);
  }

  const handleRadioChange = (event: any) => {
    var tempCycleDetails = cloneDeep(details);
    if (event.target.name === 'isStartDateSame') {
      tempCycleDetails[selectedSwitch.cycleRange][selectedSwitch.index][event.target.name] = event.target.value === "Yes" ? false : true;
      if (event.target.value === "Yes") {
        tempCycleDetails[selectedSwitch.cycleRange][selectedSwitch.index].rpPlannedStart = null;
      }
      else {
        tempCycleDetails[selectedSwitch.cycleRange][selectedSwitch.index].rpPlannedStart = moment(new Date()).format('YYYY-MM-DD');
      }
    }
    if (event.target.name === 'isFinishDateSame') {
      tempCycleDetails[selectedSwitch.cycleRange][selectedSwitch.index][event.target.name] = event.target.value === "Yes" ? false : true;
      if (event.target.value === "Yes") {
        tempCycleDetails[selectedSwitch.cycleRange][selectedSwitch.index].rpPlannedFinish = null;
      }
      else {
        tempCycleDetails[selectedSwitch.cycleRange][selectedSwitch.index].rpPlannedFinish = moment(new Date()).format('YYYY-MM-DD');
      }
    }
    if (event.target.name === 'isDurationSame') {
      tempCycleDetails[selectedSwitch.cycleRange][selectedSwitch.index][event.target.name] = event.target.value === "No" ? false : true;
      tempCycleDetails[selectedSwitch.cycleRange][selectedSwitch.index].newDuration = null;
    }
    if (event.target.name === 'needExpanded') {
      tempCycleDetails[selectedSwitch.cycleRange][selectedSwitch.index][event.target.name] = event.target.value === "No" ? false : true;
    }
    setDetails(tempCycleDetails);
  }

  const submit = () => {
    setCycleDetails(details);
  }

  useEffect(() => {
    var tempCycleDetails = cloneDeep(cycleDetails);
    setDetails(tempCycleDetails);
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!details || selectedSwitch.index === -1) return <></>;

  return (
    <Dialog open={open} maxWidth="md" onClose={close}>
      <DialogContent className="changeAnalysis-modal__header">
        <FlexRow className="analysis_header">
          <Title style={{color: '#000'}}>Change Analysis</Title>
          <CloseRoundedIcon style={{background: '#9e9e9e40', borderRadius: '50%'}} onClick={close}/>
        </FlexRow>
        <SubTitle>Conduct joint webinar with Axis Capital</SubTitle>
        {selectedSwitch.variableName === 'isStartDateSame' && 
        <>
          <SubDesc>Does this task need to be cancelled?</SubDesc>
          <FlexRow>
            <RadioGroup 
              row 
              aria-label="isStartDateSame" 
              name="isStartDateSame" 
              value={details[selectedSwitch.cycleRange][selectedSwitch.index].isStartDateSame ? "No" : "Yes"} 
              onChange={handleRadioChange}
            >            
              <FormControlLabel value="No" control={<Radio color="primary" />} label="No" />
              <FormControlLabel value="Yes" control={<Radio color="primary" />} label="Yes" />
            </RadioGroup>
          </FlexRow>
          <form className={classes.container} noValidate>
            <TextField
              id="rpPlannedStart"
              name="rpPlannedStart"
              label="Planned Start Date"
              type="date"
              disabled={!details[selectedSwitch.cycleRange][selectedSwitch.index].isStartDateSame}
              value={details[selectedSwitch.cycleRange][selectedSwitch.index].rpPlannedStart ? 
                moment(details[selectedSwitch.cycleRange][selectedSwitch.index].rpPlannedStart).format('YYYY-MM-DD')
              :
                moment(new Date()).format('YYYY-MM-DD')
              }
              className={classes.textField}
              onChange={onDateChanged}
            />
          </form>
        </>}
        {selectedSwitch.variableName === 'isStartDateSame' && 
          <>
            <SubDesc>Has the duration changed?</SubDesc>
            <FlexRow>
              <RadioGroup 
                row 
                aria-label="isDurationSame" 
                name="isDurationSame" 
                value={details[selectedSwitch.cycleRange][selectedSwitch.index].isDurationSame ? "Yes" : "No"} 
                onChange={handleRadioChange}
              >            
                <FormControlLabel value="No" control={<Radio color="primary" />} label="No" />
                <FormControlLabel value="Yes" control={<Radio color="primary" />} label="Yes" />
              </RadioGroup>
            </FlexRow>
            <InputBox
              type="text"
              name="newDuration"
              id="newDuration"
              value={!details[selectedSwitch.cycleRange][selectedSwitch.index].isDurationSame ? '' : details[selectedSwitch.cycleRange][selectedSwitch.index].newDuration}
              disabled={!details[selectedSwitch.cycleRange][selectedSwitch.index].isDurationSame}
              placeholder="Duration"
              style={{ minWidth: '200px', margin: '10px 0', marginRight: 10 }}
              onChange={onDateChanged}/>
          </>
        }
        {selectedSwitch.variableName === 'isFinishDateSame' && 
        <>
          <SubDesc>Does this task need to be cancelled?</SubDesc>
          <FlexRow>
            <RadioGroup 
              row 
              aria-label="isFinishDateSame" 
              name="isFinishDateSame" 
              value={details[selectedSwitch.cycleRange][selectedSwitch.index].isFinishDateSame ? "No" : "Yes"} 
              onChange={handleRadioChange}
            >            
              <FormControlLabel value="No" control={<Radio color="primary" />} label="No" />
              <FormControlLabel value="Yes" control={<Radio color="primary" />} label="Yes" />
            </RadioGroup>
          </FlexRow>
          <form className={classes.container} noValidate>
            <TextField
              id="rpPlannedFinish"
              name="rpPlannedFinish"
              label="Planned Start Date"
              type="date"
              disabled={!details[selectedSwitch.cycleRange][selectedSwitch.index].isFinishDateSame}
              value={details[selectedSwitch.cycleRange][selectedSwitch.index].rpPlannedFinish ? 
                moment(details[selectedSwitch.cycleRange][selectedSwitch.index].rpPlannedFinish).format('YYYY-MM-DD')
              :
                moment(new Date()).format('YYYY-MM-DD')
              }
              className={classes.textField}
              onChange={onDateChanged}
            />
          </form>
        </>}
        <SubDesc>Does the scope of task need to be expanded?</SubDesc>
        <FlexRow>
          <RadioGroup 
            row 
            aria-label="needExpanded" 
            name="needExpanded" 
            value={details[selectedSwitch.cycleRange][selectedSwitch.index].needExpanded ? "Yes" : "No"} 
            onChange={handleRadioChange}
          >            
            <FormControlLabel value="No" control={<Radio color="primary" />} label="No" />
            <FormControlLabel value="Yes" control={<Radio color="primary" />} label="Yes" />
          </RadioGroup>
        </FlexRow>        
        <Button
          className="continue_btn"
          style={{marginTop: 70}}
          onClick={submit}
        >
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeAnalysis;
