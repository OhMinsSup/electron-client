import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import ListItem from '../../components/card/ListItem';
import { MeetingAPI } from '../../libs/api/client';
import palette from '../../libs/styles/palette';

interface UserMeetingsProps {
  id: string;
  tab?: 'live' | 'scheduled' | 'upcoming';
}
const UserMeetings: React.FC<UserMeetingsProps> = ({ id, tab }) => {
  const { data, isLoading, error } = useQuery<any, any, any>(
    'myMeetingsData',
    () =>
      MeetingAPI.meetingUser(id, {
        type: tab,
        page_size: 30,
      }),
  );

  if (error) {
    return (
      <div className="bg-white font-sans h-screen absolute w-full">
        An error has occurred: {error.message}
      </div>
    );
  }

  if (isLoading) return <>Loading....</>;

  return (
    <>
      {data.meetings && data.meetings.length ? (
        data.meetings.map((meeting: any) => (
          <ListItem key={meeting.uuid} meeting={meeting} />
        ))
      ) : (
        <EmptyBlock>
          <div className="message">진행중인 미팅룸이 없습니다.</div>
        </EmptyBlock>
      )}
    </>
  );
};

export default UserMeetings;

const EmptyBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 6rem;
  margin-bottom: 3rem;
  img {
    width: 20rem;
  }
  .message {
    font-size: 2rem;
    color: ${palette.gray6};
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
`;
