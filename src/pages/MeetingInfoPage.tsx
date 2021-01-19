import React from 'react';
import Header from '../components/base/Header';

interface MeetingInfoPageProps {}
const MeetingInfoPage: React.FC<MeetingInfoPageProps> = () => {
  const data = {
    id: 123,
    topic: '123',
    encrypted_password: '12313',
    created_at: new Date().toISOString(),
    join_url: '123',
    timezone: 'Asia/Seoul',
  };
  return (
    <>
      <Header />
      <div className="h-screen flex items-center flex-col mt-10">
        <div className="relative col-start-2 col-end-3 row-start-2 row-end-3 self-center">
          <div className="relative z-10 bg-white rounded-xl border-gray-300 border-solid border-2">
            <article className="text-gray-800 leading-6">
              <h2 className="transition-opacity duration-1500 delay-500 text-xl font-semibold text-black px-4 py-6 pb-1 opacity-25">
                {data.topic}
              </h2>
              <dl className="transition-opacity duration-1500 delay-500 flex flex-wrap divide-y divide-gray-200 border-b border-gray-200 opacity-25">
                <div className="px-4 pb-6">
                  <dd className="text-sm sm:text-base">
                    <time dateTime={data.created_at}>
                      {data.created_at}
                      <span className="sr-only sm:not-sr-only">
                        {' '}
                        {data.timezone}
                      </span>
                    </time>
                  </dd>
                </div>

                <div className="w-full flex-none flex items-baseline px-4 py-4">
                  <dt className="w-1/5 flex-none uppercase text-xs font-semibold tracking-wide">
                    아이디
                  </dt>
                  <dd className="text-black text-sm">{data.id}</dd>
                </div>

                <div className="w-full flex-none flex items-baseline px-4 py-4">
                  <dt className="w-1/5 flex-none uppercase text-xs font-semibold tracking-wide text-gray-800">
                    패스워드
                  </dt>
                  <dd className="text-black text-sm">
                    {data.encrypted_password}
                  </dd>
                </div>

                <div className="w-full flex-none flex items-baseline px-4 py-4">
                  <dt className="w-1/5 flex-none uppercase text-xs font-semibold tracking-wide">
                    URL
                  </dt>
                  <dd className="text-black text-sm">{data.join_url}</dd>
                </div>
              </dl>
              <div className="grid grid-cols-2 gap-x-4 px-4 py-4">
                <div className="text-base font-medium rounded-lg bg-gray-100 text-black py-3 text-center cursor-pointer">
                  삭제
                </div>
                <div className="text-base font-medium rounded-lg bg-teal-500 text-white py-3 text-center cursor-pointer">
                  참여하기
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingInfoPage;
