import React from 'react';
import { ZoomMtg as ZoomMtgType } from '@zoomus/websdk';
import { Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MeetingPage from './pages/MeetingPage';
import ConnectPage from './pages/ConnectPage';
import useZoomDisplayNone from './libs/hooks/useZoomDisplayNone';
import LoginPage from './pages/LoginPage';
import UserInfoPage from './pages/UserInfoPage';
import Core from './containers/base/Core';
import WritePage from './pages/WritePage';

declare const ZoomMtg: typeof ZoomMtgType;

ZoomMtg.setZoomJSLib('https://source.zoom.us/1.8.5/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

function App() {
  useZoomDisplayNone();
  return (
    <>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/@:id" component={UserInfoPage} />
        <Route path="/connect" component={ConnectPage} />
        <Route path="/create" component={WritePage} />
        <Route path="/meeting" component={MeetingPage} />
      </Switch>
      <Core />
    </>
  );
}

export default App;
