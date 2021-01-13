import { ZoomMtg } from '@zoomus/websdk';
import React from 'react';
import { useZoomState } from '../libs/context/ZoomContext';

const b64EncodeUnicode = (str: string) =>
  btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(`0x${p1}` as any),
    ),
  );

interface MeetingPageProps {}
const MeetingPage: React.FC<MeetingPageProps> = () => {
  const state = useZoomState();
  const zoomRef = React.useRef(false);

  React.useEffect(() => {
    if (zoomRef.current) return;
    ZoomMtg.init({
      leaveUrl: '/',
      success: () => {
        ZoomMtg.i18n.load(state.lang);
        ZoomMtg.i18n.reload(state.lang);

        ZoomMtg.join({
          meetingNumber: state.meetingNumber,
          signature: state.signature,
          userName: b64EncodeUnicode(state.displayName),
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
