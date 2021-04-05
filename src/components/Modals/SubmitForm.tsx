import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import * as api from 'api';
import { Button } from 'UI/Button';
import { Title } from './styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Textarea } from 'UI/Input';
import { useHistory } from 'react-router-dom';

export const SubmitForm = (props: any) => {
  const { open, close, cycleRpId } = props;
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [currentOptions, setCurrentOptions] = useState({
    story: '',
    goals: ''
  });

  const handleChange = (event: any) => {
    const tempCurrentOptions: any = {...currentOptions};
    tempCurrentOptions[event.target.name] = event.target.value;
    setCurrentOptions(tempCurrentOptions);
  }

  const submit = async () => {
    setLoading(true);
		try {
      const response = await api.completeReview({
        ...currentOptions,
        cycleRpId: cycleRpId,
      });
			if (response && response.data.success) {
        close();
        history.push('/success');
      }
      setLoading(false);
		} catch (err) {
      console.log("err =>", err);
      setLoading(false);
		}
  }

  return (
    <Dialog open={open} maxWidth="md" onClose={close}>
      <DialogContent className="newScope-modal__header">
        <Title style={{marginBottom: 25}}><strong>Final Step 1a: </strong>Synthesize the story of your area of resopnsibility for this previous cycle. </Title>
        <Textarea 
          name="story"
          id="story"
          value={currentOptions.story}
          style={{ height: 100, margin: '10px 0', marginTop: 20 }}
          onChange={handleChange}/>
        <Title style={{marginBottom: 25}}><strong>Final Step 1b: </strong>Describe your goals for the next cycle. </Title>
        <Textarea 
          name="goals"
          id="goals"
          value={currentOptions.goals}
          style={{ height: 100, margin: '10px 0' }}
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

export default SubmitForm;
