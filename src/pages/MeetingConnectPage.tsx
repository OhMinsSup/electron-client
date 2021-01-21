import React from 'react';
import { ZoomMtg as ZoomMtgType } from '@zoomus/websdk';
import { useHistory } from 'react-router-dom';
import { clientURL } from '../libs/api/client';

declare const ZoomMtg: typeof ZoomMtgType;

const b64EncodeUnicode = (str: string) =>
  btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(`0x${p1}` as any),
    ),
  );

interface MeetingConnectPageProps {}
const MeetingConnectPage: React.FC<MeetingConnectPageProps> = () => {
  const history = useHistory();

  React.useEffect(() => {
    const stringify = localStorage.getItem('@@zoom');
    if (stringify) {
      const json = JSON.parse(stringify);

      ZoomMtg.init({
        leaveUrl: clientURL,
        success: () => {
          ZoomMtg.i18n.load(json.lang);
          ZoomMtg.i18n.reload(json.lang);

          ZoomMtg.join({
            meetingNumber: json.meetingNumber,
            signature: json.signature,
            userName: b64EncodeUnicode(json.displayName),
            apiKey: json.apiKey,
            passWord: json.password,
            userEmail: json.email,
            success: (joinRes: any) => {
              console.log('success joinRes', joinRes);

              ZoomMtg.record({
                record: true,
              });

              ZoomMtg.showRecordFunction({
                show: false,
              });

              ZoomMtg.getAttendeeslist({
                success: (res: any) => {
                  console.log('success getAttendeeslist', res);
                },
                error: (error: any) => {
                  console.error('error getAttendeeslist', error);
                },
              });

              ZoomMtg.getCurrentUser({
                success: (res: any) => {
                  console.log('success getCurrentUser', res.result.currentUser);
                },
                error: (error: any) => {
                  console.error('error getCurrentUser', error);
                },
              });

              // ZoomMtg.record({
              //   record: true,
              //   success: (res: any) => {
              //     console.log('success record', res);
              //   },
              //   error: (error: any) => {
              //     console.error('error record', error);
              //   },
              // });
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
    } else {
      history.goBack();
    }
  }, []);

  return null;
};

export default MeetingConnectPage;
