import React from 'react';
import { ZoomMtg as ZoomMtgType } from '@zoomus/websdk';
import { Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MeetingConnectPage from './pages/MeetingConnectPage';
import useZoomDisplayNone from './libs/hooks/useZoomDisplayNone';
import LoginPage from './pages/LoginPage';
import UserInfoPage from './pages/UserInfoPage';
import Core from './containers/base/Core';
import MeetingCreatePage from './pages/MeetingCreatePage';
import MeetingInfoPage from './pages/MeetingInfoPage';

declare const ZoomMtg: typeof ZoomMtgType;

console.log((ZoomMtg as any).checkSystemRequirements());
// WebSDK 종속성 링크 리소스를 변경하려는 경우 옵션입니다. setZoomJSLib는 처음에 실행되어야합니다.
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
        <Route path="/meeting-connect" component={MeetingConnectPage} />
        <Route path="/meeting/create" component={MeetingCreatePage} />
        <Route path="/meeting/@:id" component={MeetingInfoPage} />
      </Switch>
      <Core />
    </>
  );
}

export default App;
