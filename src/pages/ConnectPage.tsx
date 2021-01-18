import React from 'react';
import { useRecoilValue } from 'recoil';
import { Helmet } from 'react-helmet-async';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { ZoomMtg as ZoomMtgType } from '@zoomus/websdk';
import FormErrorMessage from '../components/common/FormErrorMessage';
import { userState } from '../store/user';
import Header from '../components/base/Header';

declare const ZoomMtg: typeof ZoomMtgType;

const config = {
  ZOOM_API_KEY: process.env.REACT_APP_ZOOM_API_KEY,
  ZOOM_SECRET_KEY: process.env.REACT_APP_ZOOM_SECRET_KET,
};

const schema = yup.object().shape({
  displayName: yup.string().required('유저명을 입력해주세요.'),
  meetingNumber: yup.string().required('미팅 번호를 입력해주세요.'),
  meetingPassword: yup.string().required('미팅 비밀번호를 입력해주세요.'),
  email: yup.string().email('이메일 형식에 맞지 않습니다.').optional(),
});

interface FormFieldValue {
  displayName: string;
  meetingNumber: string;
  meetingPassword: string;
  email?: string;
  role: string;
  i18n: string;
  lang: string;
}

interface ConnectPageProps {}
const ConnectPage: React.FC<ConnectPageProps> = () => {
  const history = useHistory();

  const state = useRecoilValue(userState);

  const {
    errors,
    register,
    reset,
    clearErrors,
    handleSubmit,
    getValues,
  } = useForm<FormFieldValue>({
    mode: 'onChange',
    resolver: yupResolver(schema) as any,
    defaultValues: state.user
      ? {
          displayName: `${state.user.first_name} ${state.user.last_name}`,
          meetingNumber: '',
          meetingPassword: '',
          email: state.user.email,
          role: '0',
          i18n: '0',
          lang: state.user.language,
        }
      : {
          displayName: 'React',
          meetingNumber: '',
          meetingPassword: '',
          email: '',
          role: '0',
          i18n: '0',
          lang: 'en-US',
        },
  });

  const onSubmit = () => {
    clearErrors(['email', 'displayName', 'meetingNumber', 'meetingPassword']);
    const data = getValues();

    const { ZOOM_API_KEY, ZOOM_SECRET_KEY } = config;
    ZoomMtg.generateSignature({
      meetingNumber: data.meetingNumber,
      apiKey: `${ZOOM_API_KEY}`,
      apiSecret: `${ZOOM_SECRET_KEY}`,
      role: data.role,
      success: (res: any) => {
        const payload: { key: any; value: any }[] = [
          { key: 'apiKey', value: config.ZOOM_API_KEY },
          { key: 'signature', value: res.result },
          { key: 'displayName', value: data.displayName },
          { key: 'password', value: data.meetingPassword },
          { key: 'meetingNumber', value: data.meetingNumber },
          { key: 'email', value: data.email },
          { key: 'role', value: data.role },
          { key: 'i18n', value: data.i18n },
          { key: 'lang', value: data.lang },
        ];

        const obj = {};
        payload.forEach((o) => {
          Object.assign(obj, { [o.key]: o.value });
        });

        localStorage.setItem('@@zoom', JSON.stringify(obj));
        history.push('/meeting');
      },
    });
  };

  React.useEffect(() => {
    localStorage.removeItem('@@zoom');
    return () => reset();
  }, []);

  return (
    <>
      <Header />
      <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
        <Helmet>
          <title>Connect Page | Zoom SDK</title>
        </Helmet>
        <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
          <h4 className="w-full font-medium text-left text-3xl mb-5">
            Connecting Zoom SDK
          </h4>
          <form
            className="grid gap-3 mt-5 w-full mb-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              ref={register}
              name="displayName"
              type="text"
              placeholder="유저명"
              className="focus:outline-none focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors;"
            />
            {Boolean(errors.displayName) && (
              <FormErrorMessage msg={errors.displayName?.message} />
            )}
            <input
              ref={register}
              name="meetingNumber"
              type="text"
              placeholder="미팅번호"
              className="focus:outline-none focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors"
            />
            {Boolean(errors.meetingNumber) && (
              <FormErrorMessage msg={errors.meetingNumber?.message} />
            )}
            <input
              ref={register}
              name="meetingPassword"
              type="password"
              placeholder="미팅 비밀번호"
              className="focus:outline-none focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors"
            />
            {Boolean(errors.meetingPassword) && (
              <FormErrorMessage msg={errors.meetingPassword?.message} />
            )}
            <input
              ref={register}
              name="email"
              type="email"
              placeholder="Email 옵션"
              className="focus:outline-none focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors"
            />
            <select
              ref={register}
              name="role"
              className="focus:outline-none focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors"
            >
              <option value={0}>Attendee</option>
              <option value={1}>Host</option>
              <option value={5}>Assistant</option>
            </select>

            <select
              ref={register}
              name="i18n"
              className="focus:outline-none focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors"
            >
              <option value={0}>Global</option>
            </select>

            <select
              ref={register}
              name="lang"
              className="focus:outline-none focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors"
            >
              <option value="en-US">영어</option>
              <option value="ko-KO">한국어</option>
            </select>

            <button
              type="submit"
              className="text-lg font-medium focus:outline-none text-white py-4  transition-colors bg-teal-400 hover:bg-teal-500"
            >
              접속하기
            </button>
          </form>
          <div className="text-left">
            <span>줌으로 {'\n '}</span>
            <Link to="/" className="text-teal-500 hover:underline">
              로그인하기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectPage;
