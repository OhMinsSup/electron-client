import React, { useRef } from 'react';
import { ZoomMtg } from '@zoomus/websdk';
import { Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MeetingPage from './pages/MeetingPage';
// import { useQuery } from 'react-query';

function App() {
  const initRef = useRef(false);

  React.useEffect(() => {
    if (initRef.current) return;
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    initRef.current = true;
  }, []);
  //  const { isLoading, error, data } = useQuery<any, any, any>('repoData', () =>
  //    fetch('https://api.zoom.us/v2/users?status=active&json=true', {
  //      headers: {
  //        'User-Agent': 'Zoom-Jwt-Request',
  //        'content-type': 'application/json',
  //        Authorization: `Bearer ${process.env.ZOOM_JWT_TOKEN}`,
  //      },
  //    }).then((res) => res.json()),
  //  );

  //  if (isLoading) return <div>Loading...</div>;

  //  if (error) return <div>An error has occurred {error.message}</div>

  return (
    <Switch>
      <Route path="/" component={MainPage} exact />
      <Route path="/metting" component={MeetingPage} />
    </Switch>
  );
}

export default App;
