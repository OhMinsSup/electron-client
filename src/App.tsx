import React from 'react';
import { ZoomMtg as ZoomMtgType } from '@zoomus/websdk';
import { Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MeetingPage from './pages/MeetingPage';
import MeetingsPage from './pages/MeetingsPage';
import ConnectPage from './pages/ConnectPage';
import useZoomDisplayNone from './libs/hooks/useZoomDisplayNone';
import LoginPage from './pages/LoginPage';
import UserInfoPage from './pages/UserInfoPage';

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
        <Route path="/meetting" component={MeetingPage} />
        <Route path="/meetting-rooms" component={MeetingsPage} />
      </Switch>
    </>
  );
}

export default App;
