import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import UserMeetings from '../../containers/user/UserMeetings';

interface MeetingsTabProps
  extends RouteComponentProps<{
    id: string;
  }> {}
const MeetingsTab: React.FC<MeetingsTabProps> = ({ match }) => (
  <UserMeetings id={match.params.id} />
);

export default MeetingsTab;
