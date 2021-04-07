import React from 'react';
import { SwitchContainer, SwitchInsideContainer } from './styles';

const SwitchComponent = (props: any) => {
  const {checked, onChange} = props;  
  return (
    <SwitchContainer onClick={() => onChange(!checked)}>
      <SwitchInsideContainer className={checked?'yes':'no'}>{checked?'Yes':'No'}</SwitchInsideContainer>
    </SwitchContainer>
  )
}

export default SwitchComponent
