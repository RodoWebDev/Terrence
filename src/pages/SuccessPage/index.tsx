import React from 'react';
import { SuccessContainer, SuccessTitle, SuccessDesc, SuccessLink } from './styles';
import { useHistory } from 'react-router-dom';
import Layout from 'layouts';

const SuccessPage = () => {
  const history = useHistory();
  
  return (
    <Layout>
      <SuccessContainer>
        <SuccessTitle>Success!</SuccessTitle>
        <SuccessDesc onClick={() => history.push('/')}>You’ve submitted your updates for this cycle.  If you have additional changes or need to triangulate, click below to connect with the operational manager in charge.</SuccessDesc>
        <SuccessLink href='#'>schedule an ad hoc session</SuccessLink>
      </SuccessContainer>
    </Layout>
  )
}

export default SuccessPage
