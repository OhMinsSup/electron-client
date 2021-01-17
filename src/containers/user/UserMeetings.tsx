import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import ListItem from '../../components/card/ListItem';
import { MeetingAPI } from '../../libs/api/client';
import palette from '../../libs/styles/palette';

interface UserMeetingsProps {
  id: string;
}
const UserMeetings: React.FC<UserMeetingsProps> = ({ id }) => {
  const { data, isLoading } = useQuery<any, any, any>('myMeetingsData', () =>
    MeetingAPI.meetingUser(id, {
      type: 'live,scheduled,upcoming',
    }),
  );

  if (isLoading) return <>Loading....</>;

  return (
    <>
      {data.meetings && data.meetings.length ? (
        data.meetings.map((meeting: any) => (
          <ListItem key={meeting.uuid} meeting={meeting} />
        ))
      ) : (
        <EmptyBlock>
          <div className="message">포스트가 없습니다.</div>
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
