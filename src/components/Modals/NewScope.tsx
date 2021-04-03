import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import * as api from 'api';
import { Button } from 'UI/Button';
import { Title, FlexRow } from './styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import cloneDeep from 'clone-deep';
import { InputBox } from 'UI/Input';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import moment from 'moment';
import { CycleReviewType } from 'utils/cycleReviewType';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
    },
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

export const NewScope = (props: any) => {
  const { open, close, type, cycleDetails, cycleRpId, createNewOne } = props;
  const [loading, setLoading] = useState(false);
  const [cycleData, setCycleData] = useState('');
  const [scopeOptions, setScopeOptions] = useState<any>([]);
  const [currentOptions, setCurrentOptions] = useState({
    initiative: -1,
    taskName: '',
    newDuration: '',
    cycleReviewType: 1,
    rpPlannedStart: moment(new Date()).format('YYYY-MM-DD'),
    assignedTo: ''
  });
  const classes = useStyles();

  const handleChange = (event: any) => {
    const tempCurrentOptions: any = {...currentOptions};
    tempCurrentOptions[event.target.name] = event.target.value;
    setCurrentOptions(tempCurrentOptions);
  }

  const getNewScopeData = async () => {
    setLoading(true);
		try {
      const response = await api.getNewScopeData();
			if (response && response.data.success) {
        setScopeOptions(response.data.result);
      }
      setLoading(false);
		} catch (err) {
      console.log("err =>", err);
      setLoading(false);
		}
  };

  const submit = async () => {
    var tempOption = {...currentOptions, initiative: scopeOptions[currentOptions.initiative].initiative, workpackage: scopeOptions[currentOptions.initiative].workpackage};
    console.log('currentOptions =>', tempOption);
    setLoading(true);
		try {
      const response = await api.createScope(cycleRpId, tempOption);
			if (response && response.data.success) {
        createNewOne();
      }
      setLoading(false);
		} catch (err) {
      console.log("err =>", err);
      setLoading(false);
		}
  }

  useEffect(() => {
    setCycleData(cloneDeep(cycleDetails[type]));
    const tempCurrentOptions: any = {...currentOptions};
    tempCurrentOptions.cycleReviewType = CycleReviewType[type];
    setCurrentOptions(tempCurrentOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycleDetails, type])

  useEffect(() => {
    getNewScopeData();
  }, [])

  if (!cycleData || !scopeOptions || !type) return <></>;

  return (
    <Dialog open={open} maxWidth="md" onClose={close}>
      <DialogContent className="newScope-modal__header">
        <Title style={{marginBottom: 25}}>New Scope</Title>
        <hr style={{borderBottom: '1px solid #80808008', margin: 0, marginBottom: 15}}/>
        <FormControl className={classes.formControl}>
          <InputLabel id="initiative-label">Initiative</InputLabel>
          <Select
            name="initiative"
            id="initiative"
            value={currentOptions.initiative}
            onChange={handleChange}
          >
            {scopeOptions.map((item: any, index: number) => (
              <MenuItem key={item.initiative + index} value={index}>{item.initiative}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <hr style={{borderBottom: '1px solid #80808008'}}/>
        <FormControl className={classes.formControl}>
          <InputLabel id="workpackage-label">Workpackage</InputLabel>
          <Select
            name="initiative"
            id="initiative"
            value={currentOptions.initiative}
            onChange={handleChange}
          >
            {scopeOptions.map((item: any, index: number) => (
              <MenuItem key={item.workpackage + index} value={index}>{item.workpackage}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <InputBox 
          type="text"
          name="taskName"
          id="taskName"
          value={currentOptions.taskName}
          placeholder="Task"
          style={{ minWidth: '200px', margin: '10px 0', marginTop: 20 }}
          onChange={handleChange}/>
        <FlexRow>
          <InputBox 
            type="text"
            name="newDuration"
            id="newDuration"
            value={currentOptions.newDuration}
            placeholder="Duration"
            style={{ minWidth: '200px', margin: '10px 0', marginRight: 10 }}
            onChange={handleChange}/>
          <form className={classes.container} noValidate>
            <TextField
              id="rpPlannedStart"
              name="rpPlannedStart"
              label="Start Date"
              type="date"
              value={currentOptions.rpPlannedStart ? 
                moment(currentOptions.rpPlannedStart).format('YYYY-MM-DD')
              :
                moment(new Date()).format('YYYY-MM-DD')
              }
              style={{ minWidth: '200px', margin: '10px 0', marginRight: 10 }}
              className={classes.textField}
              onChange={handleChange}
            />
          </form>
        </FlexRow>
        <InputBox 
          type="text"
          name="assignedTo"
          id="assignedTo"
          value={currentOptions.assignedTo}
          placeholder="Assigned To"
          style={{ minWidth: '200px', margin: '10px 0' }}
          onChange={handleChange}/> 
        <Button
          className="no_fixed_position"
          style={{marginTop: 40}}
          onClick={submit}
        >
          Submit {loading ? <CircularProgress style={{width: 20, height: 20, color: '#fff'}}/> : ''}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NewScope;
