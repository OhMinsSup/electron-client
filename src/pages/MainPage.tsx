import React from 'react';
import * as yup from 'yup';
import { useRecoilValue } from 'recoil';
import { Helmet } from 'react-helmet-async';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Header from '../components/base/Header';
import FormErrorMessage from '../components/common/FormErrorMessage';

import { userState } from '../store/user';
import Button from '../components/common/Button';
import { config, ZoomType } from '../libs/utils';

declare const ZoomMtg: ZoomType;

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
  role: string;
  lang: string;
  email?: string;
}

interface MainPageProps {}
const MainPage: React.FC<MainPageProps> = () => {
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
          lang: state.user.language,
        }
      : {
          displayName: 'React',
          meetingNumber: '',
          meetingPassword: '',
          email: '',
          role: '0',
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
          { key: 'i18n', value: 0 },
          { key: 'lang', value: data.lang },
        ];

        const obj = {};
        payload.forEach((o) => {
          Object.assign(obj, { [o.key]: o.value });
        });

        localStorage.setItem('@@zoom', JSON.stringify(obj));
        history.push('/meeting-connect');
      },
    });
  };

  React.useEffect(() => {
    localStorage.removeItem('@@zoom');
    return () => reset();
  }, []);

  return (
    <>
      <Helmet>
        <title>Main Page | Zoom SDK</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header />
      <div className="container lg:w-5/12 md:w-1/2 xl:w-1/4 mx-auto my-10 flex flex-col items-center">
        <div className="mt-5">
          <h4 className="font-medium text-3xl mb-5">Connecting Zoom SDK</h4>
          <form
            className="w-full my-5 space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              ref={register}
              name="displayName"
              type="text"
              placeholder="유저명"
              className="w-full focus:outline-none font-sans focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors"
            />
            {Boolean(errors.displayName) && (
              <FormErrorMessage msg={errors.displayName?.message} />
            )}
            <input
              ref={register}
              name="meetingNumber"
              type="text"
              placeholder="미팅번호"
              className="w-full focus:outline-none font-sans focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors"
            />
            {Boolean(errors.meetingNumber) && (
              <FormErrorMessage msg={errors.meetingNumber?.message} />
            )}
            <input
              ref={register}
              name="meetingPassword"
              type="password"
              placeholder="미팅 비밀번호"
              className="w-full focus:outline-none font-sans focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors"
            />
            {Boolean(errors.meetingPassword) && (
              <FormErrorMessage msg={errors.meetingPassword?.message} />
            )}
            <input
              ref={register}
              name="email"
              type="email"
              placeholder="이메일"
              className="w-full focus:outline-none font-sans focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors"
            />
            <select
              ref={register}
              name="role"
              className="w-full focus:outline-none font-sans focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors"
            >
              <option value={0}>참석자</option>
              <option value={1}>주최자</option>
              <option value={5}>도우미</option>
            </select>

            <select
              ref={register}
              name="lang"
              className="w-full focus:outline-none font-sans focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors"
            >
              <option value="en-US">영어</option>
              <option value="ko-KO">한국어</option>
            </select>

            <Button type="submit" size="large" className="w-full">
              접속하기
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MainPage;
