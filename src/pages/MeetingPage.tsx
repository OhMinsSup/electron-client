import { ZoomMtg } from '@zoomus/websdk';
import React from 'react';
import { useZoomState } from '../libs/context/ZoomContext';

interface MeetingPageProps {}
const MeetingPage: React.FC<MeetingPageProps> = () => {
  const state = useZoomState();
  const zoomRef = React.useRef(false);

  React.useEffect(() => {
    if (zoomRef.current) return;
    ZoomMtg.init({
      leaveUrl: '/index.html',
      success: () => {
        ZoomMtg.i18n.load(state.lang);
        ZoomMtg.i18n.reload(state.lang);

        ZoomMtg.join({
          meetingNumber: Number(state.meetingNumber),
          signature: state.signature,
          userName: 'test',
          apiKey: state.apiKey,
          passWord: state.password,
          success: (res: any) => {
            console.log('success User', res.result.currentUser);
          },
          error: (error: any) => {
            console.error(error);
          },
        });
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }, []);
  return <div>MeetingPage</div>;
};

export default MeetingPage;
