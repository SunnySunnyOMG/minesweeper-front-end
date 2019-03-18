import React, { Component } from 'react';
import './config/global.scss';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { init } from '@rematch/core';
import * as models from './models';
import Game from './pages/Game';
import NewGame from './pages/NewGame';
import Login from './pages/Login';
import HeaderBar from './components/HeaderBar';
import { connect } from 'react-redux'
import Histroy from './pages/Histroy';

function Minesweeper({ token }) {
  return (
    <>
      <HeaderBar/>
      <Switch>
        {!token && <Route exact path={['/', '/login']} component={Login} />}
        <Route path="/game/new" component={NewGame} />
        <Route path="/game/:game_id" component={Game} />
        {token && <Route path="/history" component={Histroy} />}
        <Redirect to={"/game/new"} />
      </Switch>
    </>
  )
}

const AppContainer = connect(state => ({ token: state.user.token }))(Minesweeper)

class App extends Component {
  render() {
    return (
      <Provider store={init({ models })}>
        <BrowserRouter>
          <AppContainer />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
