import React from 'react';
import { ZoomMtg as ZoomMtgType } from '@zoomus/websdk';
import { useZoomDispatch, useZoomState } from '../libs/context/ZoomContext';

declare const ZoomMtg: typeof ZoomMtgType;

const b64EncodeUnicode = (str: string) =>
  btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(`0x${p1}` as any),
    ),
  );

interface MeetingPageProps {}
const MeetingPage: React.FC<MeetingPageProps> = () => {
  const state = useZoomState();
  const dispatch = useZoomDispatch();

  React.useEffect(() => {
    if (!state.signature || !state.apiKey) {
      const stringify = localStorage.getItem('@@zoom');
      if (stringify) {
        const json = JSON.parse(stringify);
        const payload: { key: any; value: any }[] = [];
        Object.entries(json).forEach(([key, value]) =>
          payload.push({ key, value }),
        );
        dispatch({
          type: 'ALL_CHANGE',
          payload,
        });
      }
    }
  }, [dispatch]);

  React.useEffect(() => {
    ZoomMtg.init({
      leaveUrl: 'http://localhost:4000',
      success: () => {
        ZoomMtg.i18n.load(state.lang);
        ZoomMtg.i18n.reload(state.lang);

        ZoomMtg.join({
          meetingNumber: state.meetingNumber,
          signature: state.signature,
          userName: b64EncodeUnicode(state.displayName),
          apiKey: state.apiKey,
          passWord: state.password,
          userEmail: state.email,
          success: (joinRes: any) => {
            console.log("success joinRes", joinRes);
            ZoomMtg.getAttendeeslist({});
            ZoomMtg.getCurrentUser({
              success: (res: any) => {
                console.log('success getCurrentUser', res.result.currentUser);
              },
            });
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
  }, [state]);
  return <div>MeetingPage</div>;
};

export default MeetingPage;
