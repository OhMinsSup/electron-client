import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import UserMeetings from '../../containers/user/UserMeetings';

interface MeetingsTabProps
  extends RouteComponentProps<{
    id: string;
    tab?: 'meetings' | 'meeting' | 'my';
  }> {}
const MeetingsTab: React.FC<MeetingsTabProps> = ({ match }) => {
  console.log('lost');
  return <UserMeetings id={match.params.id} />;
};

export default MeetingsTab;
