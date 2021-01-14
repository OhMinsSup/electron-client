import React from 'react';
import { ZoomMtg as ZoomMtgType } from '@zoomus/websdk'
import { Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MeetingPage from './pages/MeetingPage';
import Core from './containers/Core';

declare const ZoomMtg: typeof ZoomMtgType;

console.log((ZoomMtg as any).checkSystemRequirements());
ZoomMtg.setZoomJSLib('https://source.zoom.us/1.8.5/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/metting" component={MeetingPage} />
      </Switch>
      <Core />
    </>
  );
}

export default App;
