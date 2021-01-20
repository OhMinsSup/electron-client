import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import format from 'date-fns/format';
import swal from 'sweetalert';
import { Helmet } from 'react-helmet-async';

import Header from '../components/common/Header';
import Button from '../components/common/Button';
import { MeetingAPI } from '../libs/api/client';
import { config, ZoomType } from '../libs/utils';
import { userState } from '../store/user';

declare const ZoomMtg: ZoomType;

interface Params {
  id: string;
}

interface MeetingInfoPageProps {}
const MeetingInfoPage: React.FC<MeetingInfoPageProps> = () => {
  const state = useRecoilValue(userState);
  const history = useHistory();
  const { id } = useParams<Params>();

  const [role, setRole] = useState(0);

  const { data, isLoading, error } = useQuery<any, any, any>(
    ['myMeetingsData', { id }],
    (query) => MeetingAPI.detailMeeting(query.queryKey[1].id),
    {
      refetchInterval: 60000,
    },
  );

  const onRoleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRole(+e.target.value);
    },
    [],
  );

  const onDelete = React.useCallback(async () => {
    const { status } = await MeetingAPI.deleteMeeting(id);
    if (status === 200) {
      swal({
        title: '미팅룸',
        text: '미팅룸 삭제!',
        icon: 'success',
      }).then(() => history.push(`/@${state.user?.id!}`));
    }
  }, [id]);

  const onModfiy = React.useCallback(() => {
    if (id) {
      history.push(`/meeting/create?id=${id}`);
    }
  }, [id]);

  const onJoin = React.useCallback(() => {
    const { ZOOM_API_KEY, ZOOM_SECRET_KEY } = config;
    ZoomMtg.generateSignature({
      meetingNumber: data?.meeting.id,
      apiKey: `${ZOOM_API_KEY}`,
      apiSecret: `${ZOOM_SECRET_KEY}`,
      role: `${role}`,
      success: (res: any) => {
        if (state.user) {
          const payload: { key: any; value: any }[] = [
            { key: 'apiKey', value: config.ZOOM_API_KEY },
            { key: 'signature', value: res.result },
            {
              key: 'displayName',
              value: `${state.user.last_name} ${state.user.first_name}`,
            },
            { key: 'password', value: data.meeting.encrypted_password },
            { key: 'meetingNumber', value: data.meeting.id },
            { key: 'email', value: state.user.email },
            { key: 'role', value: `${role}` },
            { key: 'i18n', value: `${0}` },
            { key: 'lang', value: state.user.language },
          ];

          const obj = {};
          payload.forEach((o) => {
            Object.assign(obj, { [o.key]: o.value });
          });

          localStorage.setItem('@@zoom', JSON.stringify(obj));
          history.push('/meeting-connect');
        }
      },
    });
  }, [state.user, data]);

  React.useEffect(() => {
    localStorage.removeItem('@@zoom');
  }, []);

  if (error) {
    return (
      <div className="bg-white font-sans h-screen absolute w-full">
        An error has occurred: {error.message}
      </div>
    );
  }

  if (isLoading) return <>Loading....</>;

  if (!data) return null;

  return (
    <>
      <Helmet>
        <title>{`${data?.meeting.topic} - Meeting Page`} | Zoom SDK</title>
      </Helmet>
      <Header />
      <div className="min-h-screen w-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="relative z-10 rounded-xl">
            <article className="text-gray-800 leading-6">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold text-black px-4 py-6 pb-1">
                  {data?.meeting.topic}
                </h2>
              </div>
              <dl className="flex flex-wrap divide-y divide-gray-200 border-b border-gray-200">
                <div className="px-4 pb-6">
                  <dd className="text-sm sm:text-base">
                    <time dateTime={data.meeting.created_at as any}>
                      {data && data.meeting && data.meeting.start_time
                        ? format(
                            new Date(data.meeting.start_time.substring(0, 16)),
                            `yyyy-MM-dd HH:mm a`,
                          )
                        : ''}
                      <span className="sr-only sm:not-sr-only">
                        {' '}
                        {data?.meeting.timezone}
                      </span>
                    </time>
                  </dd>
                </div>

                <div className="w-full flex-none flex items-baseline px-4 py-4">
                  <dt className="w-1/5 flex-none uppercase text-xs font-semibold tracking-wide">
                    호스트 이메일
                  </dt>
                  <dd className="text-black text-sm">
                    {data?.meeting.host_email}
                  </dd>
                </div>

                <div className="w-full flex-none flex items-baseline px-4 py-4">
                  <dt className="w-1/5 flex-none uppercase text-xs font-semibold tracking-wide">
                    설명
                  </dt>
                  <dd className="text-black text-sm">
                    {data?.meeting.agenda || ''}
                  </dd>
                </div>

                <div className="w-full flex-none flex items-baseline px-4 py-4">
                  <dt className="w-1/5 flex-none uppercase text-xs font-semibold tracking-wide">
                    아이디
                  </dt>
                  <dd className="text-black text-sm">{data?.meeting.id}</dd>
                </div>

                <div className="w-full flex-none flex items-baseline px-4 py-4">
                  <dt className="w-1/5 flex-none uppercase text-xs font-semibold tracking-wide text-gray-800">
                    패스워드
                  </dt>
                  <dd className="text-black text-sm">
                    {data?.meeting.encrypted_password}
                  </dd>
                </div>

                <div className="w-full flex-none flex items-baseline px-4 py-4">
                  <dt className="w-1/5 flex-none uppercase text-xs font-semibold tracking-wide">
                    URL
                  </dt>
                  <dd className="text-black text-sm">
                    <a href={data?.meeting.join_url}>
                      {data?.meeting.join_url}
                    </a>
                  </dd>
                </div>

                <div className="w-full flex-none flex items-baseline px-4 py-4">
                  <dt className="w-1/5 flex-none uppercase text-xs font-semibold tracking-wide">
                    참석자 타입
                  </dt>
                  <dd className="text-black text-sm">
                    <select
                      name="role"
                      className="input w-full"
                      onChange={onRoleChange}
                    >
                      <option value={0}>참석자</option>
                      <option value={1}>주최자</option>
                      <option value={5}>도우미</option>
                    </select>
                  </dd>
                </div>
              </dl>
              <div className="grid grid-cols-3 gap-x-4 px-4 py-4">
                <Button color="lightGray" size="large" onClick={onDelete}>
                  삭제
                </Button>
                <Button size="large" onClick={onJoin}>
                  참여
                </Button>
                <Button size="large" onClick={onModfiy}>
                  수정
                </Button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingInfoPage;
