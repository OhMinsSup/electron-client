import { ZoomMtg } from '@zoomus/websdk';
import React from 'react';
import { useHistory } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { useZoomDispatch, ZoomOptions } from '../libs/context/ZoomContext';
import useForm from '../libs/hooks/useForm';

const config = {
  ZOOM_API_KEY: '',
  ZOOM_SECRET_KEY: '',
};

interface MainPageProps {}
const MainPage: React.FC<MainPageProps> = () => {
  const history = useHistory();
  const [state, onChange] = useForm<ZoomOptions>({
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
    const { ZOOM_API_KEY, ZOOM_SECRET_KEY } = config;
    ZoomMtg.generateSignature({
      meetingNumber: state.meetingNumber,
      apiKey: `${ZOOM_API_KEY}`,
      apiSecret: `${ZOOM_SECRET_KEY}`,
      role: state.role,
      success: (res: any) => {
        console.log(res);
        dispatch({
          type: 'ALL_CHANGE',
          payload: [
            { key: 'apiKey', value: config.ZOOM_API_KEY },
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

  return (
    <div
      className=" bg-white font-sans h-screen absolute w-full"
      style={{ zIndex: 9999 }}
    >
      <div className="w-full flex flex-wrap h-screen">
        {/* Left */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
            <h1 className="text-gray-700 font-bold text-5xl p-4">Zoom SDK</h1>
          </div>

          <div className=" mt-40 flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
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
            </div>
          </div>
        </div>

        <div className="w-1/2 shadow-2xl bg-gray-700">
          <img
            className="object-cover w-full h-screen hidden md:block"
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--6UEM9XZf--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/s3uitx6rdv7sod1g2acz.png"
            alt="Imag of baz fixing a bug."
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
