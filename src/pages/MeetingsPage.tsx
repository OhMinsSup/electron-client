import React from 'react';
import { parse } from 'query-string';
import { useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import { useUserState } from '../libs/context/UserContext';
import { MeetingAPI } from '../libs/api/client';
import ListItem from '../components/card/ListItem';
import Header from '../components/base/Header';

interface MettingsPageProps {}
const MeetingsPage: React.FC<MettingsPageProps> = () => {
  const history = useHistory();
  const location = useLocation();
  const state = useUserState();

  const { userId } = parse(location.search);

  const { error, data, isLoading } = useQuery<any, any, any>(
    'myMeetingsData',
    () =>
      MeetingAPI.meetingUser(userId as string, {
        type: 'live,scheduled,upcoming',
        page_size: 30,
      }),
  );

  React.useEffect(() => {
    if (!state.user || !userId) {
      history.replace('/');
    }
  }, [state.user, userId]);

  if (isLoading) {
    return (
      <div className="bg-white font-sans h-screen absolute w-full">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white font-sans h-screen absolute w-full">
        An error has occurred: {error.message}
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="h-screen flex flex-row flex-wrap bg-gray-100">
        <div className="flex-1 p-6 md:mt-16">
          <div className="grid grid-cols-5 gap-5 mt-5 lg:grid-cols-5">
            {data.meetings?.map((meeting: any) => (
              <ListItem key={meeting.uuid} meeting={meeting} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingsPage;
