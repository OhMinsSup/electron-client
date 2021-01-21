import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { useQuery } from 'react-query';
import ListItem from '../../components/card/ListItem';
import Select from '../../components/common/Select';
import { MeetingAPI } from '../../libs/api/client';
import EmptyBlock from '../../components/common/Empty';

interface MeetingsTabProps
  extends RouteComponentProps<{
    id: string;
  }> {}
const MeetingsTab: React.FC<MeetingsTabProps> = ({ match }) => {
  const [listType, setListType] = useState('live');

  const { data, isLoading, error } = useQuery<any, any, any>(
    ['myMeetingsData', { type: listType, id: match.params.id }],
    (query) => {
      const { type, id } = query.queryKey[1];
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
    <div className="px-2">
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
    </div>
  );
};

export default MeetingsTab;
