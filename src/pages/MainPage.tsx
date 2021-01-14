import React from 'react';
import { ZoomMtg as ZoomMtgType } from '@zoomus/websdk';
import { useHistory } from 'react-router-dom';
import { useZoomDispatch, ZoomOptions } from '../libs/context/ZoomContext';
import useForm from '../libs/hooks/useForm';

declare const ZoomMtg: typeof ZoomMtgType;

const config = {
  ZOOM_API_KEY: '',
  ZOOM_SECRET_KEY: '',
};

interface MainPageProps {}
const MainPage: React.FC<MainPageProps> = () => {
  const history = useHistory();
  const [state, onChange] = useForm<ZoomOptions>({
    displayName: 'React',
    password: '',
    meetingNumber: '',
    email: '',
    role: '0',
    i18n: '0',
    lang: 'en-US',
  });

  const dispatch = useZoomDispatch();

  const onSubmit = React.useCallback(() => {
    const { ZOOM_API_KEY, ZOOM_SECRET_KEY } = config;
    ZoomMtg.generateSignature({
      meetingNumber: state.meetingNumber,
      apiKey: `${ZOOM_API_KEY}`,
      apiSecret: `${ZOOM_SECRET_KEY}`,
      role: state.role,
      success: (res: any) => {
        const payload: { key: any; value: any }[] = [ 
          { key: 'apiKey', value: config.ZOOM_API_KEY },
          { key: 'signature', value: res.result },
          { key: 'displayName', value: state.displayName },
          { key: 'password', value: state.password },
          { key: 'meetingNumber', value: state.meetingNumber },
          { key: 'email', value: state.email },
          { key: 'role', value: state.role },
          { key: 'i18n', value: state.i18n },
          { key: 'lang', value: state.lang },
        ];

        const obj = {};
        payload.forEach((data) => {
          Object.assign(obj, { [data.key]: data.value });
        });

        dispatch({
          type: 'ALL_CHANGE',
          payload,
        });

        localStorage.setItem('@@zoom', JSON.stringify(obj));
        history.push('/metting');
      },
    });
  }, [state]);

  const onZoomLogin = React.useCallback(() => {
    window.location.href = 'http://localhost:5000/api/auth/redirect/zoom';
  }, []);

  return (
    <div
      className=" bg-white font-sans h-screen absolute w-full"
      style={{ zIndex: 9999 }}
    >
      <div className="w-full flex flex-wrap h-screen">
        {/* Left */}
        <div className="w-full m-auto flex flex-col">
          <div className="flex flex-col justify-center m-auto md:justify-start pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <div className="flex flex-col pt-3 md:pt-8">
              <div className="flex flex-col pt-4">
                <label htmlFor="displayName" className="text-lg">
                  Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={state.displayName}
                  placeholder="displayName"
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="meetingNumber" className="text-lg">
                  Meeting Number
                </label>
                <input
                  type="text"
                  id="meetingNumber"
                  name="meetingNumber"
                  value={state.meetingNumber}
                  placeholder="Meeting Number"
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">
                  Meeting Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={state.password}
                  placeholder="Meeting Password"
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">
                  Meeting Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={state.email}
                  placeholder="Meeting Email Option"
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="d-flex flex-row flex-wrap pt-8">
                <div className="flex space-x-3 mb-4 text-sm font-medium">
                  <div className="flex-auto flex space-x-3">
                    <select
                      name="role"
                      value={state.role}
                      className="block w-1/3 pl-3 pr-10 py-2 text-black placeholder-gray-400 bg-white border border-gray-300 rounded shadow-sm"
                      onChange={onChange}
                    >
                      <option value={0}>Attendee</option>
                      <option value={1}>Host</option>
                      <option value={5}>Assistant</option>
                    </select>
                    <select
                      name="i18n"
                      value={state.i18n}
                      className="block w-1/3  pl-3 pr-10 py-2 text-black placeholder-gray-400 bg-white border border-gray-300 rounded shadow-sm"
                      onChange={onChange}
                    >
                      <option value={0}>Global</option>
                    </select>
                    <select
                      name="lang"
                      value={state.lang}
                      className="block w-1/3 pl-3 pr-10 py-2 text-black placeholder-gray-400 bg-white border border-gray-300 rounded shadow-sm"
                      onChange={onChange}
                    >
                      <option value="en-US">English</option>
                      <option value="ko-KO">Korean 한국어</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onSubmit}
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              >
                Join
              </button>

              <button
                type="button"
                onClick={onZoomLogin}
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8 no-underline"
              >
                Zoom 로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
