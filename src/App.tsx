import React, { useRef } from 'react';
import { ZoomMtg } from '@zoomus/websdk';
import { Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MeetingPage from './pages/MeetingPage';

function App() {
  const initRef = useRef(false);

  React.useEffect(() => {
    if (initRef.current) return;
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    initRef.current = true;
  }, []);

  return (
    <Switch>
      <Route path="/" component={MainPage} exact />
      <Route path="/metting" component={MeetingPage} />
    </Switch>
  );
}

export default App;
