import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import swal from 'sweetalert';
import Header from '../components/base/Header';
import FormErrorMessage from '../components/common/FormErrorMessage';
import { MeetingAPI } from '../libs/api/client';
import { userState } from '../store/user';

const schema = yup.object().shape({
  topic: yup.string().optional(),
  type: yup.number().oneOf([1, 2]).default(1),
  start_time: yup.date().required('회의 시작 시간은 필수값입니다.'),
  timezone: yup.string().optional(),
  duration: yup.number().optional(),
  agenda: yup.string().optional(),
  password: yup
    .string()
    .matches(
      /^[a-z0-9-_@*]+$/,
      `비밀번호는 "/ ^ [a-z0-9 -_ @ *] + $ /"와 일치해야합니다.`,
    )
    .max(10)
    .required(),
});

interface FormFieldValue {
  topic: string;
  type: number;
  start_time: Date;
  timezone: string;
  password: string;
  agenda: string;
  duration?: number;
}

interface WritePageProps {}
const WritePage: React.FC<WritePageProps> = () => {
  const state = useRecoilValue(userState);

  const mutation = useMutation<any, any, any>((data) =>
    MeetingAPI.createMeeting(state.user?.id!, data),
  );
  const {
    register,
    errors,
    watch,
    reset,
    clearErrors,
    getValues,
    handleSubmit,
  } = useForm<FormFieldValue>({
    mode: 'onChange',
    resolver: yupResolver(schema) as any,
    defaultValues: {
      topic: '',
      type: 1,
      timezone: 'Asia/Seoul',
      start_time: new Date().toISOString(),
      duration: 0,
      agenda: '',
      password: '',
    },
  });

  const onSubmit = async () => {
    clearErrors([
      'topic',
      'type',
      'start_time',
      'timezone',
      'password',
      'agenda',
      'duration',
    ]);
    const data = getValues();
    mutation.mutate({
      ...data,
      type: Number(data.type),
      ...(Number(data.type) === 2 && {
        duration: data.duration,
      }),
    });
  };

  React.useEffect(() => () => reset(), []);

  React.useEffect(() => {
    if (mutation.isSuccess) {
      swal({
        title: '미팅룸',
        text: '미팅룸 생성 완료!',
        icon: 'success',
      });
    }
  }, [mutation.isSuccess]);

  return (
    <>
      <Header />
      <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
        <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
          <h4 className="w-full font-medium text-left text-3xl mb-5">
            미팅룸 생성
          </h4>
          <form
            className="grid gap-3 mt-5 w-full mb-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              ref={register}
              name="topic"
              type="text"
              placeholder="토픽"
              className="focus:outline-none focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors"
            />
            {Boolean(errors.topic) && (
              <FormErrorMessage msg={errors.topic?.message} />
            )}
            <input
              ref={register}
              name="password"
              type="password"
              placeholder="비밀번호"
              className="focus:outline-none focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors"
            />
            {Boolean(errors.password) && (
              <FormErrorMessage msg={errors.password?.message} />
            )}
            <input
              ref={register}
              name="start_time"
              type="datetime-local"
              placeholder="회의 시작시간"
              className="focus:outline-none focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors"
            />
            {Boolean(errors.start_time) && (
              <FormErrorMessage msg={errors.start_time?.message} />
            )}
            <input
              ref={register}
              name="timezone"
              type="text"
              disabled
              placeholder="Timezone"
              className="focus:outline-none focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors"
            />
            {Boolean(errors.timezone) && (
              <FormErrorMessage msg={errors.timezone?.message} />
            )}
            <select
              ref={register}
              name="type"
              className="focus:outline-none focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors"
            >
              <option value={1}>즉석 회의</option>
              <option value={2}>예약 회의</option>
            </select>
            {Number(watch('type')) === 2 && (
              <>
                <input
                  ref={register}
                  name="duration"
                  type="email"
                  placeholder="회의시간"
                  className="focus:outline-none focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors"
                />
                {Boolean(errors.duration) && (
                  <FormErrorMessage msg={errors.duration?.message} />
                )}
              </>
            )}
            <input
              ref={register}
              name="agenda"
              type="text"
              placeholder="설명"
              className="focus:outline-none focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors;"
            />
            {Boolean(errors.agenda) && (
              <FormErrorMessage msg={errors.agenda?.message} />
            )}

            <button
              type="submit"
              className="text-lg font-medium focus:outline-none text-white py-4  transition-colors bg-teal-400 hover:bg-teal-500"
            >
              생성하기
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default WritePage;
