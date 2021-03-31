import React from 'react';
import Header from './header';
import { MainContainer } from 'UI/Container';

const Layout = (props: any) => {

  return (
    <main>
      <Header startDate="January 26, 2021" endDate="February 9, 2021"/>
      <MainContainer>
        {props.children}
      </MainContainer>
    </main>
  )
}

export default Layout
