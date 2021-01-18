import React from 'react';
import Header from '../components/base/Header';

interface MeetingInfoPageProps {}
const MeetingInfoPage: React.FC<MeetingInfoPageProps> = () => {
  const data = {
    uuid: '8gzsh5YbSRagCm9Pl3UkFg==',
    id: 87260400747,
    host_id: 'MDAwYRyzS-u3G3lghMbltQ',
    host_email: 'mins5190@naver.com',
    topic: '테스트 회의',
    type: 1,
    status: 'waiting',
    timezone: 'Asia/Seoul',
    agenda: '회의 설명',
    created_at: '2021-01-18T09:49:50Z',
    start_url:
      'https://us05web.zoom.us/s/87260400747?zak=eyJ6bV9za20iOiJ6bV9vMm0iLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjbGllbnQiLCJ1aWQiOiJNREF3WVJ5elMtdTNHM2xnaE1ibHRRIiwiaXNzIjoid2ViIiwic3R5IjoxMDAsIndjZCI6InVzMDUiLCJjbHQiOjAsInN0ayI6IlJjUGdob3I1c1ExRVV0VklsSlFxSnl4NXg1U21xMDljeHB5YlI1Zkg4QmsuQmdZZ1luZEJObGcxZDFrdldGQkNlblZUYUVzd1EwaGhiek00VEU1V1ZIbFlaMmxBWVRRd05EQmxOREJtWkRWa00yWTFPVGs1WTJKaU56RmtOV0V4TTJJMVpXRTBPV0pqWVRneE9HWTFZVGt3TkRCbU9ESTVaVE5rTjJKa1lXWXpabUl4TkFBZ1pVSnlWa2hPTlc5NFpqSjBURTVLYkd4WFFtOXlhR3hqUzBOeWR6ZDNla2tBQkhWek1EVUFBQUYzRk9hdjl3QVNkUUFBQUEiLCJleHAiOjE2MTA5NzA1OTgsImlhdCI6MTYxMDk2MzM5OCwiYWlkIjoicVFoSFFDUl9TZ3lNR0J3NmppRVI0USIsImNpZCI6IiJ9.Ge_yRY3QW8Vwx-JpDME66KOp5RCO4xC_8QOlyhxBdbY',
    join_url:
      'https://us05web.zoom.us/j/87260400747?pwd=UVBXSFFJdXJYSU4wbGZrQ0tOVm1PUT09',
    password: '1q2w3e4r',
    h323_password: '27059895',
    pstn_password: '27059895',
    encrypted_password: 'UVBXSFFJdXJYSU4wbGZrQ0tOVm1PUT09',
    settings: {
      host_video: false,
      participant_video: false,
      cn_meeting: false,
      in_meeting: false,
      join_before_host: false,
      jbh_time: 0,
      mute_upon_entry: false,
      watermark: false,
      use_pmi: false,
      approval_type: 2,
      audio: 'voip',
      auto_recording: 'none',
      enforce_login: false,
      enforce_login_domains: '',
      alternative_hosts: '',
      close_registration: false,
      show_share_button: false,
      allow_multiple_devices: false,
      registrants_confirmation_email: true,
      waiting_room: true,
      request_permission_to_unmute_participants: false,
      registrants_email_notification: true,
      meeting_authentication: false,
      encryption_type: 'enhanced_encryption',
      approved_or_denied_countries_or_regions: {
        enable: false,
      },
      breakout_room: {
        enable: false,
      },
    },
  };
  console.log(data);
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
                  <dt className="sr-only">Date and time</dt>
                  <dd className="text-sm sm:text-base">
                    <time dateTime="2020-11-15T10:00:00-05:00">
                      Thu Nov 15, 2020 10:00am
                    </time>{' '}
                    <time dateTime="2020-11-15T11:00:00-05:00">
                      11:00am
                      <span className="sr-only sm:not-sr-only"> EST</span>
                    </time>
                  </dd>
                </div>

                <div className="w-full flex-none flex items-baseline px-4 py-4">
                  <dt className="w-2/5 flex-none uppercase text-xs font-semibold tracking-wide">
                    Location
                  </dt>
                  <dd className="text-black text-sm">
                    Kitchener, <abbr title="Ontario">ON</abbr>
                  </dd>
                </div>

                <div className="w-full flex-none flex items-baseline px-4 py-4">
                  <dt className="w-2/5 flex-none uppercase text-xs font-semibold tracking-wide text-gray-800">
                    Location
                  </dt>
                  <dd className="text-black text-sm">
                    Kitchener, <abbr title="Ontario">ON</abbr>
                  </dd>
                </div>

                <div className="w-full flex-none flex items-baseline px-4 py-4">
                  <dt className="w-2/5 flex-none uppercase text-xs font-semibold tracking-wide">
                    Location
                  </dt>
                  <dd className="text-black text-sm">
                    Kitchener, <abbr title="Ontario">ON</abbr>
                  </dd>
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
