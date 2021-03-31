import React from 'react';
import Header from './header';
import { MainContainer } from 'UI/Container';

const Layout = (props: any) => {
  const {newCycle} = props;
  return (
    <main>
      <Header startDate={newCycle?.cycleStartDate} endDate={newCycle?.cycleEndDate} />
      <MainContainer>
        {props.children}
      </MainContainer>
    </main>
  )
}

export default Layout
