import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'pages/Home';
import CycleBuild from 'pages/CycleBuild';
import SuccessPage from 'pages/SuccessPage';
import ResponsibleParty from 'pages/ResponsibleParty';
import Publish from 'pages/Publish';
import NotFound from 'pages/404';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={ Home }/>
      <Route exact path='/cycleBuild' component={ CycleBuild }/>
      <Route exact path='/success' component={ SuccessPage }/>
      <Route exact path='/publish' component={ Publish }/>
      <Route exact path='/rp/:cycleRpId' component={ ResponsibleParty }/>
      <Route component={NotFound} />
    </Switch>
  )
}
