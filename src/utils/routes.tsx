import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from 'pages/Home';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={ Home }/>
      <Route render={ () => <Redirect to='/' /> }/>
    </Switch>
  )
}
