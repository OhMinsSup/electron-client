import React from 'react';
import { ZoomMtg as ZoomMtgType } from '@zoomus/websdk';
import { Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MeetingConnectPage from './pages/MeetingConnectPage';
import ConnectPage from './pages/ConnectPage';
import useZoomDisplayNone from './libs/hooks/useZoomDisplayNone';
import LoginPage from './pages/LoginPage';
import UserInfoPage from './pages/UserInfoPage';
import Core from './containers/base/Core';
import MeetingCreatePage from './pages/MeetingCreatePage';
import MeetingInfoPage from './pages/MeetingInfoPage';
import useBody from './libs/hooks/useBody';

declare const ZoomMtg: typeof ZoomMtgType;

ZoomMtg.setZoomJSLib('https://source.zoom.us/1.8.5/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

function App() {
  useZoomDisplayNone();
  useBody();
  return (
    <>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/@:id" component={UserInfoPage} />
        <Route path="/connect" component={ConnectPage} />
        <Route path="/meeting-connect" component={MeetingConnectPage} />
        <Route path="/meeting/create" component={MeetingCreatePage} />
        <Route path="/meeting/@:id" component={MeetingInfoPage} />
      </Switch>
      <Core />
    </>
  );
}

export default App;
