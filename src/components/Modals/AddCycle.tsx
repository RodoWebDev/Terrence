import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import * as api from 'api';
import { Button } from 'UI/Button';
import { Title, FlexRow, FlexColumn, Manual } from './styles';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

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

export const AddCycle = (props: any) => {
  const { open, close } = props;
  const classes = useStyles();
  const [nextCycle, setNextCycle] = useState();
  const [editable, setEditable] = useState(false);

  const getNextCycle = async () => {
		try {
      const response = await api.getNextCycle();
			if (response && response.data.success) {
        setNextCycle(response.data.result);
			}
		} catch (err) {
			console.log("err =>", err);
		}
  };
  
  const analyzeCycle = async () => {
    try {
      const response = await api.analyzeCycle(moment(nextCycle?.startDate).format('YYYY-MM-DD'), moment(nextCycle?.endDate).format('YYYY-MM-DD'));
			if (response && response.data.success) {
        console.log(response.data.result);
			}
		} catch (err) {
			console.log("err =>", err);
		}
  }

  useEffect(() => {
    if (open) {
      getNextCycle();
    }
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!nextCycle) return <></>;

  return (
    <Dialog open={open} maxWidth="md" onClose={close}>
      <DialogContent className="addCycle-modal__header">
        <Title>Create Cycle</Title>
        <FlexRow>
          <FlexColumn className="first">
            <form className={classes.container} noValidate>
              <TextField
                id="startdate"
                label="Start Date"
                type="date"
                disabled={!editable}
                defaultValue={moment(nextCycle?.startDate).format('YYYY-MM-DD')}
                className={classes.textField}
              />
            </form>
            {!editable && <Manual onClick={() => setEditable(true)}>manual adjustment</Manual>}
          </FlexColumn>
          <FlexColumn>
            <form className={classes.container} noValidate>
              <TextField
                id="closeDate"
                label="Close Date"
                type="date"
                disabled={!editable}
                defaultValue={moment(nextCycle?.endDate).format('YYYY-MM-DD')}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </FlexColumn>
        </FlexRow>
        
        <Button
          className="no_fixed_position"
          style={{marginTop: 70}}
          onClick={analyzeCycle}
        >
          Build
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddCycle;
