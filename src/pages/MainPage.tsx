import { ZoomMtg } from '@zoomus/websdk';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useZoomDispatch, ZoomOptions } from '../libs/context/ZoomContext';
import useForm from '../libs/hooks/useForm';

interface MainPageProps {}
const MainPage: React.FC<MainPageProps> = () => {
  const history = useHistory();
  const [state, onChange, onReset] = useForm<ZoomOptions>({
    displayName: '1.8.6#Local',
    password: '',
    meetingNumber: '',
    email: '',
    role: '0',
    i18n: '0',
    lang: 'en-US',
  });

  const dispatch = useZoomDispatch();

  const onSubmit = React.useCallback(() => {
    const { ZOOM_SDK_KEY, ZOOM_SDK_SECRET } = process.env;
    ZoomMtg.generateSignature({
      meetingNumber: state.meetingNumber,
      apiKey: `${ZOOM_SDK_KEY}`,
      apiSecret: `${ZOOM_SDK_SECRET}`,
      role: state.role,
      success: (res: any) => {
        console.log(res);
        dispatch({
          type: 'ALL_CHANGE',
          payload: [
            { key: 'apiKey', value: ZOOM_SDK_KEY },
            { key: 'signature', value: res.result },
            { key: 'displayName', value: state.displayName },
            { key: 'password', value: state.password },
            { key: 'meetingNumber', value: state.meetingNumber },
            { key: 'email', value: state.email },
            { key: 'role', value: state.role },
            { key: 'i18n', value: state.i18n },
            { key: 'lang', value: state.lang },
          ],
        });

        history.push('/metting');
      },
    });
  }, [state]);


  React.useEffect(() => {
    console.log(process.env.ZOOM_SDK_KEY, process.env.ZOOM_SDK_SECRET);
  },[])

  return (
    <div className="container">
      <nav
        id="nav-tool"
        className=" bg-white border-gray-800 right-0 left-0 fixed z-50"
        style={{ paddingBottom: '5%' }}
      >
        <div className="container">
          <div className="h-40">
            <h1 className="flex-auto text-6xl font-semibold">Zoom SDK</h1>
          </div>
          <div className="d-flex flex-row flex-wrap h-32">
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

            <div className="flex space-x-3 mb-4 text-sm font-medium">
              <div className="flex-auto flex space-x-3" />
              <input
                type="text"
                name="displayName"
                value={state.displayName}
                placeholder="Name"
                onChange={onChange}
                className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none text-lg text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
                required
              />
              <input
                type="text"
                name="meetingNumber"
                value={state.meetingNumber}
                className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none text-lg text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
                placeholder="Meeting Number"
                onChange={onChange}
                required
              />
              <input
                type="password"
                name="password"
                value={state.password}
                placeholder="Meeting Password"
                onChange={onChange}
                className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none text-lg text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
              />
              <input
                type="text"
                name="email"
                value={state.email}
                placeholder="Email option"
                onChange={onChange}
                className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none text-lg text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
              />
            </div>

            <div className="flex space-x-3 mb-4 text-sm font-medium">
              <div className="flex-auto flex space-x-3">
                <button
                  type="button"
                  className="w-1/2 flex h-10 items-center justify-center rounded-md border-gray-600 border border-solid"
                  onClick={onSubmit}
                >
                  Join
                </button>
                <button
                  type="button"
                  className="w-1/2 flex h-10 items-center justify-center rounded-md border-gray-600 border border-solid"
                  onClick={onReset}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MainPage;
