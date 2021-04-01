import React from 'react';
import { NotificationContainer, LeftSection, RightSection, AvatarImg, NotificationTitle, NotificationImg } from './styles';
import Avatar from 'assets/imgs/avatar.png';
import Slack from 'assets/imgs/slack.png';
import Email from 'assets/imgs/email.png';
import { useHistory } from 'react-router-dom';

const NotificationSent = () => {
  const history = useHistory();

  const details = () => {
    history.push('/details');
  }
  
  return (
    <NotificationContainer>
      <LeftSection>
        <AvatarImg src={Avatar} />
        <NotificationTitle className="AvatarName"><strong>Reuben V. </strong>Responsible Party</NotificationTitle>
      </LeftSection>
      <RightSection>
        <NotificationTitle>Direct Message Slack</NotificationTitle>
        <NotificationImg src={Slack} style={{marginBottom: 154}} onClick={details} />
        <NotificationTitle>Email Notice</NotificationTitle>
        <NotificationImg src={Email} onClick={details} />
      </RightSection>
    </NotificationContainer>
  )
}

export default NotificationSent
