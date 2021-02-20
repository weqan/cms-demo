import React, { Component } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import { privateRoutes } from './routers';

import FrameOut from './components/FrameOut'



export default class App extends Component {
  render() {
    return (
      <FrameOut>
        <Switch>
          {
            privateRoutes.map((item, index) => {
              return (
                <Route key={index} exact={item.exact} path={item.pathname} render={(rootProps) => {
                  return <item.component {...rootProps} />
                }} />
              )
            })
          }
          <Redirect exact from="/admin" to={privateRoutes[0].pathname} />
          <Redirect to="/404" />
        </Switch>
      </FrameOut>
    )
  }
}
