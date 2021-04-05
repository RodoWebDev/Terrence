import React, { useState, useContext, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import * as api from 'api';
import { Button } from 'UI/Button';
import { Title } from './styles';
import { CycleContext } from 'contexts/CycleContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import { InputBox } from 'UI/Input';

export const UpdateSlack = (props: any) => {
  const { open, close, row } = props;
  const [loading, setLoading] = useState(false);
  const [rpSlack, setRpSlack] = useState('');
  const { analysis, setAnalysis } = useContext(CycleContext);

  const onUpdateSlack = (event: any) => {
    setRpSlack(event.target.value);
  }

  const updateSlack = async () => {
    setLoading(true);
		try {
      const response = await api.updateRpSlack(row.rpId, rpSlack);
			if (response && response.data.success) {
        var temp = [...analysis];
        for (let i=0; i<analysis.length; i++) {
          if (analysis[i].rpId === row.rpId) {
            analysis[i].rpSlack = rpSlack;
          }
        }
        setAnalysis(temp);
        close();
      }
      setLoading(false);
		} catch (err) {
      console.log("err =>", err);
      setLoading(false);
		}
  };

  useEffect(() => {
    setRpSlack('');
    if (row && row.rpSlack !=="null")
      setRpSlack(row.rpSlack);
  }, [row])

  if (!row) return <></>;

  return (
    <Dialog open={open} maxWidth="md" onClose={close}>
      <DialogContent className="addCycle-modal__header">
        <Title>Slack Name</Title>
        <Title style={{marginTop: 50}}>{row.rpName}</Title>
        <InputBox 
          type="email"
          name="email"
          id="email"
          value={rpSlack}
          placeholder="Email"
          style={{ minWidth: '200px', margin: '10px 0' }}
          onChange={onUpdateSlack}/>        
        <Button
          className="no_fixed_position"
          style={{marginTop: 70}}
          onClick={updateSlack}
        >
          Submit {loading ? <CircularProgress style={{width: 20, height: 20, color: '#fff'}}/> : ''}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSlack;
