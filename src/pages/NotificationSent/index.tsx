import React from 'react';
import { NotificationContainer, LeftSection, RightSection, AvatarImg, NotificationTitle, NotificationImg } from './styles';
import Avatar from 'assets/imgs/avatar.png';
import Slack from 'assets/imgs/slack.png';
import Email from 'assets/imgs/email.png';

const NotificationSent = () => {
  
  return (
    <NotificationContainer>
      <LeftSection>
        <AvatarImg src={Avatar} />
        <NotificationTitle className="AvatarName"><strong>Reuben V. </strong>Responsible Party</NotificationTitle>
      </LeftSection>
      <RightSection>
        <NotificationTitle>Direct Message Slack</NotificationTitle>
        <NotificationImg src={Slack} style={{marginBottom: 154}} />
        <NotificationTitle>Direct Message Slack</NotificationTitle>
        <NotificationImg src={Email} />
      </RightSection>
    </NotificationContainer>
  )
}

export default NotificationSent
