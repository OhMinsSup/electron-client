import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import ListItem from '../../components/card/ListItem';
import Select from '../../components/common/Select';
import { MeetingAPI } from '../../libs/api/client';
import palette from '../../libs/styles/palette';

interface UserMeetingsProps {
  id: string;
}
const UserMeetings: React.FC<UserMeetingsProps> = ({ id }) => {
  const [listType, setListType] = useState('live');

  const { data, isLoading, error } = useQuery<any, any, any>(
    ['myMeetingsData', { type: listType }],
    (query) => {
      const { type } = query.queryKey[1];
      return MeetingAPI.meetingUser(id, {
        type,
        page_size: 30,
      });
    },
    {
      refetchInterval: 60000,
    },
  );

  const onClick = React.useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      const { type } = e.currentTarget.dataset;
      if (type) {
        setListType(type);
      }
    },
    [],
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
      <Select listType={listType} onClick={onClick} />
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
  .message {
    font-size: 2rem;
    color: ${palette.gray6};
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
`;
