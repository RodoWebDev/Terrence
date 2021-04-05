import React from 'react';
import { SuccessContainer, SuccessDesc } from './styles';
import { useHistory } from 'react-router-dom';
import Layout from 'layouts';
import { HomeTitleLabel } from 'UI/Label';
import { Manual } from 'components/Modals/styles';

const Publish = () => {
  const history = useHistory();
  
  return (
    <Layout>
      <HomeTitleLabel onClick={() => history.push('/')}><Manual>Analyst Workbench </Manual>{' > '}<Manual> Cycle Analysis</Manual></HomeTitleLabel>
      <SuccessContainer>
        <SuccessDesc>Your upates have been publishe to SmartSheet for this cycle. </SuccessDesc>
      </SuccessContainer>
    </Layout>
  )
}

export default Publish
